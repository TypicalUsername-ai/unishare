use std::time::SystemTime;
use diesel::PgConnection;
use uuid::Uuid;
use super::error::UnishareError;

pub struct File {
    name: String,
    id: Uuid,
    owner: Uuid,
    created: SystemTime,
    last_edit: SystemTime,
    price: u64,
    rating: f32,
    available: Availability,
}

pub struct FileOpt {
    name: Option<String>,
    last_edit: SystemTime,
    price: Option<u64>,
    available: Option<Availability>,
}

impl File {
    /// Checks if file is available (for purchase or viewing)
    fn available(&self) -> bool {
        todo!();
    }

    /// Adds a new file authored by the provided user id
    pub async fn add_new(user: Uuid, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        todo!();
    }

    /// Attempts to purchase the provided file by the user with the provided id
    pub async fn purchase(&self, buyer_id: Uuid, db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        todo!();
    }

    /// Edits the file data such as price or availability
    /// WARNING! does not allow for editing the file contents
    pub async fn edit(&mut self, edits: FileOpt, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        todo!();
    }

    /// Adds a new rating to the file and retireves an updated object
    pub async fn add_rating(self, reviewer_id: Uuid, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        todo!();
    }
}

/// Describes availability of a given resource
enum Availability {
    /// Available to everyone logged in (for / if purchased)
    Public,
    /// Available only to the author
    Private,
    /// Removed from the service by administrators
    Blocked,
    /// Removed from the service by the owner
    Removed
}
