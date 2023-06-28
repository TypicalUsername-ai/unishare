use std::{time::SystemTime, fmt::format};
use actix_web::cookie::time::Duration;
use diesel::{PgConnection, prelude::*};
use uuid::Uuid;
use crate::schema::{users_data, transactions};
use serde::{Serialize, Deserialize};
use crate::schema::files_data;
use super::{error::UnishareError, file_review::FileReview, transaction::{Transaction, TransactionType}, user_data::{UserData, User}};
use std::fs;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = files_data)]
pub struct File {
    pub name: String,
    pub id: Uuid,
    pub creator: Uuid,
    #[diesel(column_name = created_time)]
    created: SystemTime,
    #[diesel(column_name = last_edit_time)]
    last_edit: SystemTime,
    pub price: i32,
    rating: f32,
    primary_tag: Option<String>,
    secondary_tag: Option<String>,
    available: bool,
}

/// WARNING! rating to be made as Option<f32>
#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct FileOpt {
    name: Option<String>,
    last_edit: SystemTime,
    price: Option<i32>,
    rating: f32,
    primary_tag: Option<String>,
    secondary_tag: Option<String>,
    available: Option<bool>,
}

impl From<File> for FileOpt {
    fn from(value: File) -> Self {
        Self { 
            name: Some(value.name), 
            last_edit: value.last_edit, 
            price: Some(value.price), 
            rating: value.rating, 
            primary_tag: value.primary_tag, 
            secondary_tag: value.secondary_tag, 
            available: Some(value.available) 
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewFile {
    filename: String,
    price: i32,
    primary_tag: Option<String>,
    secondary_tag: Option<String>,
}


impl File {

    pub fn new(filename: String, creator: Uuid, price: i32, primary_tag: Option<String>, secondary_tag: Option<String>) -> Self {
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
            let buyer = User::by_uuid(buyer_id, db_conn).await?;
            let creator = User::by_uuid(self.creator, db_conn).await?;
            if buyer.tokens >= self.price {
                let transaction = Transaction::new(TransactionType::PURCHASE, buyer_id, self.creator, self.id, self.price);
                let update_owner = creator.update_tokens((self.price as f32 * 0.8) as i32, db_conn).await?;
                let update_buyer = buyer.update_tokens( -self.price, db_conn).await?;
                let create_transaction = diesel::insert_into(transactions::table)
                .values(transaction).execute(db_conn)?;
                Ok(())
            } else {
                Err(UnishareError::InvalidAction { action: format!("Insufficient tokens {} required: {}", buyer.tokens, self.price) })
            }
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

    /// Retrieves file data by username
    /// useful for text search functionality
    pub async fn by_name(name: String, db_conn: &mut PgConnection) -> Result <Vec<File>, UnishareError> {
        let opt_data = files_data::table
            .filter(files_data::name.ilike(format!("{}%", name)))
            .load::<File>(db_conn)
            .optional()?;
        if let Some(results) = opt_data {
            Ok(results)
        } else {
            Ok(vec![])
        }
    }

    pub async fn by_tag(tag: String, db_conn: &mut PgConnection) -> Result<Vec<File>, UnishareError> {
        let opt_data = files_data::table
            .filter(files_data::primary_tag.ilike(format!("{}%", tag))
                .or(files_data::secondary_tag.ilike(format!("{}%", tag))))
            .load::<File>(db_conn).optional()?;
        if let Some(results) = opt_data {
            Ok(results)
        } else {
            Ok(vec![])
        }
    }
    
    /// Retrieves file data by id
    pub async fn by_id(id: Uuid, db_conn: &mut PgConnection) -> Result <File, UnishareError> {
        let opt_data = files_data::table
            .filter(files_data::id.eq(id))
            .first::<File>(db_conn)
            .optional()?;
        if let Some(results) = opt_data {
            Ok(results)
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("File {}", id) })
        }
    }

    /// Edits the file data such as price or availability
    /// WARNING! does not allow for editing the file contents
    pub async fn edit(&mut self, edits: FileOpt, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        todo!();
    }

    pub async fn edit_price(self, new_price: i32, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        if SystemTime::now().duration_since(self.last_edit.clone()).unwrap().as_secs_f32() >= (24 * 60 * 60) as f32 {
            let edit_price = diesel::update(files_data::table)
            .filter(files_data::id.eq(self.id))
            .set((
                files_data::price.eq(new_price),
                files_data::last_edit_time.eq(SystemTime::now())
            )).get_result(db_conn).optional()?;
            if let Some(file) = edit_price {
                Ok(file)
            } else {
                Err(UnishareError::ResourceNotFound { resource: format!("File {}", self.id) })
            }
        } else {
            Err(UnishareError::InvalidAction { action: "Updating price more than one time a day".to_owned() })
        }
    }

    /// Adds a new rating to the file and retireves an updated object
    /// Updates rating of the file and retireves an updated object
    pub async fn update_rating(self, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        let av_rating = FileReview::get_average(self.id, db_conn).await?;
        let update_rating = diesel::update(files_data::table)
        .filter(files_data::id.eq(self.id.clone()))
        .set(files_data::rating.eq(av_rating))
        .get_result(db_conn)?;
        
        Ok(update_rating)
    }

    pub async fn delete_file(id: Uuid, db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        let remove_file = diesel::update(files_data::table)
            .filter(files_data::id.eq(id.clone()))
            .set((
                files_data::name.eq("Deleted file"),
                files_data::created_time.eq(SystemTime::UNIX_EPOCH),
                files_data::last_edit_time.eq(SystemTime::UNIX_EPOCH),
                files_data::price.eq(0),
                files_data::rating.eq(0f32),
                files_data::primary_tag.eq(""),
                files_data::secondary_tag.eq(""),
                files_data::available.eq(false)
            )).execute(db_conn)?;
        let user = User::by_file_id(id, db_conn).await?;
        let user_file_decrement = diesel::update(users_data::table)
            .filter(users_data::user_id.eq(user.id))
            .set(users_data::pub_files.eq(users_data::pub_files - 1))
            .execute(db_conn)?;
        Ok(())
    }

    pub fn create(data: NewFile, user_id: Uuid) -> Self {
        File::new(data.filename, user_id, data.price, data.primary_tag, data.secondary_tag)
    }

    pub async fn get_snippet(&self) -> String {

        let mut fcontent = fs::read_to_string(format!("/files/{}", self.id))
        .unwrap_or("No Content available".to_owned());

        fcontent.truncate(50);
        fcontent

    }

    pub async fn get_content(file_id: Uuid) -> Result<fs::File, UnishareError> {
        let file_opt = fs::File::open(format!("/files/{}", file_id));
        match file_opt {
            Ok(file) => Ok(file),
            Err(e) => Err(UnishareError::ResourceNotFound { resource: format!("FileContents {}", file_id) }),
        }
    }
}

impl NewFile {
    pub fn new(filename: String, creator: Uuid, price: i32, primary_tag: Option<String>, secondary_tag: Option<String>) -> Self {
        Self {filename, price, primary_tag, secondary_tag }
    }
}