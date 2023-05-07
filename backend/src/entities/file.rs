use std::time::SystemTime;
use diesel::{PgConnection, RunQueryDsl, OptionalExtension};
use uuid::Uuid;
use crate::schema::{users_data::tokens, purchases::{file_id, self}};

use super::error::UnishareError;

pub struct File {
    name: String,
    id: Uuid,
    creator: Uuid,
    created: SystemTime,
    last_edit: SystemTime,
    price: u64,
    rating: f32,
    primary_tag: String,
    secondary_tag: String,
    available: bool,
}

pub struct FileOpt {
    name: Option<String>,
    last_edit: SystemTime,
    price: Option<u64>,
    primary_tag: Option<String>,
    secondary_tag: Option<String>,
    available: Option<bool>,
}

impl File {
    /// Checks if file is available (for purchase or viewing)
    async fn available(db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        todo!();
    }

    /// Adds a new file authored by the provided user id
    pub async fn add_new(user: Uuid, db_conn: &mut PgConnection)-> Result<Self, UnishareError> {
        todo!();
    }

    /// Attempts to purchase the provided file by the user with the provided id
    pub async fn purchase(&self, buyer_id: Uuid, db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        if(self.available == true) {
            let update_owner = self.update_tokens(self.creator, -self.price, db_conn);
            let update_buyer = self.update_tokens(buyer_id, self.price, db_conn);
            let create_transaction = diesel::insert_into(purchases::table)
            .values((
                purchases::creator_id.eq(self.creator.clone()), 
                purchases::buyer_id.eq(buyer_id.clone()), 
                purchases::file_id.eq(self.id.clone()), 
                purchases::purchase_time.eq(SystemTime::now()),
                purchases::price.eq(self.price.clone())
            )).execute(db_conn)?;
        }
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

    async fn update_tokens(&self, user_id: Uuid, tokens_amount: u64, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        let update_user = diesel::update(users::table)
            .filter(users::id.eq(user_id.clone()))
            .set(users::tokens.eq(users::tokens + tokens_amount))
            .get_result(db_conn).optional()?;
    }
}
