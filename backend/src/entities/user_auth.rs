use crate::schema::{users, users_data};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use diesel::{Insertable, Queryable, prelude::*, insert_into};
use argon2::{Argon2, PasswordHasher, password_hash::SaltString};

use super::error::UnishareError;

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct UserAuth {
    pub id: Uuid,
    pub username: String,
    pub user_email: String,
    password_hash: String,
    pub confirmed: bool,
}

impl UserAuth {

    pub fn hash_password(plaintext: &String) -> String {
        let hash_salt = SaltString::from_b64(std::env!("HASH_SALT")).expect("Error extracting hash salt from env");
        // creates an Argon2id v19 hasher
        let hasher = Argon2::default();

        hasher.hash_password(plaintext.as_bytes(), &hash_salt).expect("Password Hashing Failure").to_string()
    }

    fn new(username: String, email: String, password: String) -> Self {


        Self { 
            id: Uuid::new_v4(), 
            username, 
            user_email: email, 
            password_hash: Self::hash_password(&password),
            confirmed: false
        }
    }

    /// Retrieves user data by username
    pub async fn by_name(name: String, db_conn: &mut PgConnection) -> Result <Vec<Self>, UnishareError> {
        let data: Option<Vec<Self>> = users::table.filter(users::username.like(name.clone())).load(db_conn).optional()?;
        if let Some(results) = data {
            Ok(results)
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("user {}", name) })
        }
    }

    pub async fn confirm_user(id: Uuid, db_conn: &mut PgConnection) -> Result<UserAuth, UnishareError> {
        let update_opt = diesel::update(users::table)
            .filter(users::id.eq(id.clone()))
            .set(users::confirmed.eq(true))
            .get_result(db_conn).optional()?;
        if let Some(data) = update_opt {
            let insert_op = insert_into(users_data::table).values(Some(users_data::user_id.eq(id))).execute(db_conn)?;
            Ok(data)
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("User {}", id) })
        }
    }


}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewUser {
    username: String,
    email: String,
    password: String,
}

impl NewUser {
    fn new(username: String, email: String, password: String) -> Self {
        Self { username, email, password }
    }
}
impl From<NewUser> for UserAuth {
    fn from(raw: NewUser) -> Self {
        UserAuth::new(raw.username, raw.email, raw.password)
    }
}
