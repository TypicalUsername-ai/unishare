use diesel::{PgConnection, Queryable, prelude::*};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use super::{error::UnishareError, file::File, user_auth::UserAuth};
use crate::schema::{users_data, users};

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
        let opt_data = users_data::table.inner_join(users::table.on(users::id.eq(users_data::user_id))).first::<(UserData, UserAuth)>(db_conn).optional()?;
        if let Some(result) = opt_data {
            Ok(result.into())
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("UserData {}", id) })
        }
    }

    /// Retrieves `UserData` object from the database matching the provided `Uuid` of the file said
    /// user owns
    pub async fn by_file_id(file_id: Uuid, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        todo!()
    }

    /// Simple function checking whether a provided user owns the file identified by the provided `Uuid`
    pub async fn owns_file(&self, file_id: Uuid, db_conn: &mut PgConnection) -> Result<bool, UnishareError> {
        todo!();
    }

    /// Returns the vector of file objects which the user owns
    pub async fn get_owned_files(&self, db_conn: &mut PgConnection) -> Result<Vec<File>, UnishareError> {
        todo!();
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
    id: Uuid,
    pub_files: i32,
}

impl From<User> for GuestView {
    fn from(value: User) -> Self {
        Self { username: value.username, id: value.id, pub_files: value.pub_files }
    }
}

#[derive(Debug, Serialize)]
pub struct UserView {
    username: String,
    id: Uuid,
    pub_files: i32,
    priv_files: i32,
    email: String,
}

impl From<User> for UserView {
    fn from(value: User) -> Self {
        Self { username: value.username, id: value.id, pub_files: value.pub_files, priv_files: value.priv_files, email: value.email }
    }
}
