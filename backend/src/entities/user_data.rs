use diesel::{PgConnection, Queryable};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use super::{error::UnishareError, file::File};

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct UserData {
    pub username: String,
    pub id: Uuid,
    pub email: String,
    pub pub_files: u64,
    pub priv_files: u64,
    pub rating: f32,
    pub tokens: u64,
}

impl UserData {
    /// Retrieves `UserData` object from the database matching the provided `Uuid`
    pub async fn by_uuid(id: Uuid, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        todo!()
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
struct GuestView {
    username: String,
    id: Uuid,
    pub_files: u64,
}

impl From<UserData> for GuestView {
    fn from(value: UserData) -> Self {
        Self { username: value.username, id: value.id, pub_files: value.pub_files }
    }
}

#[derive(Debug, Serialize)]
struct UserView {
    username: String,
    id: Uuid,
    pub_files: u64,
    priv_files: u64,
    email: String,
}

impl From<UserData> for UserView {
    fn from(value: UserData) -> Self {
        Self { username: value.username, id: value.id, pub_files: value.pub_files, priv_files: value.priv_files, email: value.email }
    }
}
