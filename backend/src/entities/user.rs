use crate::schema::users;
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use diesel::{Insertable, Queryable};
use argon2::{Argon2, PasswordHasher, password_hash::SaltString};

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub user_email: String,
    password_hash: String,
}

impl User {

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
            password_hash: Self::hash_password(&password)
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
impl From<NewUser> for User {
    fn from(raw: NewUser) -> Self {
        User::new(raw.username, raw.email, raw.password)
    }
}
