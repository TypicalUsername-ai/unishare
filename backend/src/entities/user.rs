use crate::schema::users;
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use diesel::Insertable;

#[derive(Debug, Insertable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct User {
    id: Uuid,
    username: String,
    user_email: String,
    password_hash: String,
}

impl User {
    fn new(username: String, email: String, password: String) -> Self {
        Self { 
            id: Uuid::new_v4(), 
            username, 
            user_email: email, 
            password_hash: password,
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
