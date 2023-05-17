use std::time::SystemTime;
use diesel::{PgConnection, prelude::*};
use uuid::Uuid;
use crate::schema::{users_data::{tokens, self}, transactions::{file_id, self}};
use serde::{Serialize, Deserialize};

use super::error::UnishareError;

#[derive(Debug, Serialize, Deserialize, Queryable)]
#[diesel(table_name = files_data)]
pub struct File {
    name: String,
    id: Uuid,
    creator: Uuid,
    created: SystemTime,
    last_edit: SystemTime,
    price: i32,
    rating: f64,
    primary_tag: Option<String>,
    secondary_tag: Option<String>,
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
    /// Adds a new file authored by the provided user id
    pub async fn add_new(user: Uuid, db_conn: &mut PgConnection)-> Result<Self, UnishareError> {
        todo!();
    }

    /// Attempts to purchase the provided file by the user with the provided id
    pub async fn purchase(&self, buyer_id: Uuid, db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        if(self.available == true) {
            let update_owner = self.update_tokens(self.creator, self.price, db_conn).await?;
            let update_buyer = self.update_tokens(buyer_id, -self.price, db_conn).await?;
            let create_transaction = diesel::insert_into(transactions::table)
            .values((
                transactions::creator_id.eq(self.creator.clone()), 
                transactions::buyer_id.eq(buyer_id.clone()), 
                transactions::file_id.eq(self.id.clone()), 
                transactions::transaction_time.eq(SystemTime::now()),
                transactions::price.eq(self.price.clone())
            )).execute(db_conn)?;
            Ok(())
        }
        else {
            Err(UnishareError::ResourceNotFound { resource: self.name.to_owned() })
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

    async fn update_tokens(&self, user_id: Uuid, tokens_amount: i32, db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        let update_user = diesel::update(users_data::table)
            .filter(users_data::user_id.eq(user_id.clone()))
            .set(users_data::tokens.eq(users_data::tokens + tokens_amount))
            .execute(db_conn)?;
        Ok(())
    }
}
