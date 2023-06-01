use diesel::{Insertable, Queryable, PgConnection, QueryDsl, insert_into, expression::functions::sql_function, dsl::avg};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use diesel::pg::data_types::PgNumeric;
use crate::schema::file_reviews;
use diesel::prelude::*;
use super::error::UnishareError;
use bigdecimal::{BigDecimal, ToPrimitive};

#[derive(Debug, Serialize, Deserialize, Insertable, Queryable)]
#[diesel(table_name = file_reviews)]
pub struct FileReview {
    pub reviewer_id: Uuid,
    pub file_id: Uuid,
    pub review: i32,
    pub comment: Option<String>
}

impl FileReview {

    // Get all reviews of some file
    pub async fn by_uuid(id: Uuid, db_conn: &mut PgConnection) -> Result<Vec<FileReview>, UnishareError> {
        let reviews_opt = file_reviews::table.filter(file_reviews::file_id.eq(id)).load::<FileReview>(db_conn).optional()?;
        if let Some(v) = reviews_opt {
            Ok(v)
        } else {
            Ok(vec![])
        }
    }

    // Add a review for a file
    pub async fn add_review(review: FileReview, db_conn: &mut PgConnection) -> Result<FileReview, UnishareError> {
        let inserted_opt = insert_into(file_reviews::table).values(review).get_result::<FileReview>(db_conn)?;

        Ok(inserted_opt)
    }

    // Get average rating if the file
    pub async fn get_average(file_id: Uuid, db_conn: &mut PgConnection) -> Result<f32, UnishareError> {
        let average: Option<BigDecimal> = file_reviews::table
        .filter(file_reviews::file_id.eq(file_id))
        .select(avg(file_reviews::review))
        .first(db_conn)?;
        match average {
            Some(avg) => Ok(avg.to_f32().unwrap_or(0.0)),
            None => Err(UnishareError::ResourceNotFound { resource: format!("file: {}", file_id) })
        }
    }

}