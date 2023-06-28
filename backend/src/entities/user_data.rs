use bigdecimal::{BigDecimal, ToPrimitive};
use diesel::{PgConnection, Queryable, prelude::*, dsl::avg};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use super::{error::UnishareError, file::File, user_auth::UserAuth, transaction::{Transaction, TransactionType}, file_review::FileReview, user_review::UserReview};
use crate::schema::{users_data, users, files_data, file_reviews, user_reviews::{self, reviewed_id}};

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = users_data)]
pub struct UserData {
    pub id: Uuid,
    pub pub_files: i32,
    pub priv_files: i32,
    pub tokens: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub pub_files: i32,
    pub priv_files: i32,
    pub tokens: i32,
    pub rating: f32,

}

impl From<(UserData, UserAuth)> for User {
    fn from(value: (UserData, UserAuth)) -> Self {
        let data = value.0;
        let auth = value.1;

        Self { id: auth.id, username: auth.username, email: auth.user_email, pub_files: data.pub_files, priv_files: data.priv_files, tokens: data.tokens, rating: 5.0 }
    }
}

impl User {

    /// Retrieves `UserData` object from the database matching the provided user's `Uuid`
    pub async fn by_uuid(id: Uuid, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        let opt_data = users_data::table
            .inner_join(users::table.on(users::id.eq(users_data::user_id)))
            .filter(users::id.eq(id.clone()))
            .first::<(UserData, UserAuth)>(db_conn)
            .optional()?;
        if let Some(result) = opt_data {
            Ok(result.into())
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("UserData {}", id) })
        }
    }

    /// Retrieves user data by username
    /// useful for text search functionality
    pub async fn by_name(name: String, db_conn: &mut PgConnection) -> Result <Vec<GuestView>, UnishareError> {
        let opt_data = users_data::table
            .inner_join(users::table.on(users::id.eq(users_data::user_id)))
            .filter(users::username.ilike(format!("{}%", name)))
            .load::<(UserData, UserAuth)>(db_conn)
            .optional()?;
        if let Some(results) = opt_data {
            let data = results.into_iter().map(|a| User::from(a).into()).collect();
            Ok(data)
        } else {
            Ok(vec![])
        }
    }

    /// Removes user profile and data
    pub async fn remove_user(id: Uuid, db_conn: &mut PgConnection) -> Result <(), UnishareError> {
        let remove_data = diesel::update(users_data::table)
            .filter(users_data::user_id.eq(id.clone()))
            .set(users_data::tokens.eq(0)).execute(db_conn)?;
        let remove_user = diesel::update(users::table)
            .filter(users::id.eq(id.clone()))
            .set((
                users::username.eq("Deleted user"),
                users::user_email.eq(""),
                users::password_hash.eq(""),
                users::confirmed.eq(false)
            )).execute(db_conn)?;
        if remove_data > 0 && remove_user > 0 {
            Ok(())
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("User {}", id) })
        }
    }
    
    /// Retrieves user data by email
    /// useful for text search functionality
    pub async fn by_email(name: String, db_conn: &mut PgConnection) -> Result <Vec<GuestView>, UnishareError> {
        let opt_data = users_data::table
            .inner_join(users::table.on(users::id.eq(users_data::user_id)))
            .filter(users::user_email.ilike(format!("{}%", name)))
            .load::<(UserData, UserAuth)>(db_conn)
            .optional()?;
        if let Some(results) = opt_data {
            let data = results.into_iter().map(|a| User::from(a).into()).collect();
            Ok(data)
        } else {
            Ok(vec![])
        }
    }

    /// Retrieves `UserData` object from the database matching the provided `Uuid` of the file said
    /// user owns
    pub async fn by_file_id(file_id: Uuid, db_conn: &mut PgConnection) -> Result<UserData, UnishareError> {
        let user_id = files_data::table
            .filter(files_data::id.eq(file_id.clone()))
            .select(files_data::creator).first::<Uuid>(db_conn)?;
        let user = users_data::table
            .filter(users_data::user_id.eq(user_id.clone()))
            .select((
                users_data::user_id, 
                users_data::pub_files, 
                users_data::priv_files, 
                users_data::tokens
            )).first::<UserData>(db_conn)?;
        Ok(user)
    }

    /// Returns the vector of file objects which the user owns
    pub async fn get_owned_files(&self, db_conn: &mut PgConnection) -> Result<Vec<File>, UnishareError> {
        let files = files_data::table
        .filter(files_data::creator.eq(self.id))
        .load::<File>(db_conn)
        .optional()?;
        Ok(files.unwrap())
    }

    /// Check if user can review a file
    pub async fn can_review_file(&self, file_id: Uuid, db_conn: &mut PgConnection) -> Result<bool, UnishareError> {
        let is_owner = Transaction::user_owns_file(file_id.clone(), self.id.clone(), db_conn).await?;
        if is_owner {
            Ok(false)
        } else {
            let user_file_review_opt = FileReview::by_user_file(self.id.clone(), file_id.clone(), db_conn).await?;
            if let Some(review) = user_file_review_opt {
                Ok(false)
            } else {
                Ok(true)
            }
        }
    }

    /// Check if user can review another user
    pub async fn can_review_user(&self, user_id: Uuid, db_conn: &mut PgConnection) -> Result<bool, UnishareError> {
        let user_user_review_opt = UserReview::by_reviewer_reviewed(self.id.clone(), user_id.clone(), db_conn).await?;
        if let Some(review) = user_user_review_opt {
            Ok(false)
        } else {
            Ok(true)
        }
    }

    /// Changes token balance of both buyer and seller after a transaction to buy access to the file
    pub async fn update_tokens(&self, tokens_amount: i32, db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        let update_user = diesel::update(users_data::table)
            .filter(users_data::user_id.eq(self.id.clone()))
            .set(users_data::tokens.eq(users_data::tokens + tokens_amount))
            .execute(db_conn)?;
        Ok(())
    }

    pub async fn update_rating(&self, db_conn: &mut PgConnection) -> Result<f32, UnishareError> {
        let average: Option<BigDecimal> = user_reviews::table
            .filter(user_reviews::reviewed_id.eq(self.id.clone()))
            .select(avg(user_reviews::review))
            .first(db_conn)?;
        match average {
            Some(avg) => Ok(avg.to_f32().unwrap_or(0.0)),
            None => Err(UnishareError::ResourceNotFound { resource: format!("UserReview reviewed: {}", self.id) })
        }
    }

    /// Adds a new reting to the user and updates the cumulative rating
    pub async fn add_rating(&mut self, rating: f32, comment: Option<String>, reviewer_id: Uuid, db_conn: &mut PgConnection) 
        -> Result<Self, UnishareError> {
        todo!();
    }

    /// Returns the `UserData` in the form suitable for display to guests (`GuestView`)
    pub fn as_guest(self) -> GuestView {
        self.into()
    }

    /// Return the raw object
    pub fn as_owner(self) -> Self {
        self
    }

    /// Returns the `UserData` object in the form suitable for display to registered users
    /// (`UserView`)
    pub fn as_user(self) -> UserView {
        self.into()
    }
}

#[derive(Debug, Serialize)]
pub struct GuestView {
    username: String,
    pub id: Uuid,
    pub_files: i32,
    rating: f32,
}

impl From<User> for GuestView {
    fn from(value: User) -> Self {
        Self { username: value.username, id: value.id, pub_files: value.pub_files, rating: value.rating }
    }
}

#[derive(Debug, Serialize)]
pub struct UserView {
    username: String,
    id: Uuid,
    pub_files: i32,
    priv_files: i32,
    email: String,
    rating: f32,
}

impl From<User> for UserView {
    fn from(value: User) -> Self {
        Self { username: value.username, id: value.id, pub_files: value.pub_files, priv_files: value.priv_files, email: value.email, rating: value.rating }
    }
}
