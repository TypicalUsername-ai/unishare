use std::time::SystemTime;
use diesel::{PgConnection, prelude::*};
use uuid::Uuid;
use crate::schema::{users_data, transactions, files_data::name};
use serde::{Serialize, Deserialize};
use crate::schema::files_data;
use super::error::UnishareError;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = files_data)]
pub struct File {
    name: String,
    id: Uuid,
    creator: Uuid,
    #[diesel(column_name = created_time)]
    created: SystemTime,
    #[diesel(column_name = last_edit_time)]
    last_edit: SystemTime,
    price: i32,
    rating: f32,
    primary_tag: Option<String>,
    secondary_tag: Option<String>,
    available: bool,
}

/// WARNING! rating to be made as Option<f32>
pub struct FileOpt {
    name: Option<String>,
    last_edit: SystemTime,
    price: Option<u64>,
    rating: f32,
    primary_tag: Option<String>,
    secondary_tag: Option<String>,
    available: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileContent {
    id: Uuid,
    content: u8,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewFile {
    filename: String,
    creator: Uuid,
    price: i32,
    primary_tag: Option<String>,
    secondary_tag: Option<String>,
    content: u8,
}


impl File {

    fn new(filename: String, creator: Uuid, price: i32, primary_tag: Option<String>, secondary_tag: Option<String>, content: u8) -> Self {
        Self { 
            name: filename, 
            id: Uuid::new_v4(), 
            creator: creator, 
            created: SystemTime::now(), 
            last_edit: SystemTime::now(), 
            price: price, 
            rating: 0.0, 
            primary_tag: primary_tag, 
            secondary_tag: secondary_tag, 
            available: true 
        }
    }

    /// Attempts to purchase the provided file by the user with the provided id
    pub async fn purchase(&self, buyer_id: Uuid, db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        if self.available == true {
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

    /// Returns all available files
    pub async fn get_files(db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        let files = files_data::table
            // .select((
            //     files_data::name, 
            //     files_data::creator, 
            //     files_data::created_time,
            //     files_data::price,
            //     files_data::rating,
            //     files_data::primary_tag,
            //     files_data::secondary_tag
            // ))
            .filter(files_data::available.eq(true))
            .get_result::<File>(db_conn)?;
        Ok(())
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

    /// Changes token balance of both buyer and seller after a transaction to buy access to the file
    async fn update_tokens(&self, user_id: Uuid, tokens_amount: i32, db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        let update_user = diesel::update(users_data::table)
            .filter(users_data::user_id.eq(user_id.clone()))
            .set(users_data::tokens.eq(users_data::tokens + tokens_amount))
            .execute(db_conn)?;
        Ok(())
    }
}

impl FileContent {
    fn new(id: Uuid, content: u8) -> Self {
        Self { id, content }
    }
}

impl NewFile {
    fn new(filename: String, creator: Uuid, price: i32, primary_tag: Option<String>, secondary_tag: Option<String>, content: u8) -> Self {
        Self {filename, creator, price, primary_tag, secondary_tag, content }
    }
}
impl From<NewFile> for File {
    fn from(raw: NewFile) -> Self {
        File::new(raw.filename, raw.creator, raw.price, raw.primary_tag, raw.secondary_tag, raw.content)
    }
}