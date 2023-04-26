use diesel::{Insertable, Queryable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::schema::user_reviews;

#[derive(Debug, Serialize, Deserialize, Insertable, Queryable)]
#[diesel(table_name = user_reviews)]
pub struct UserReview {
    pub reviewer_id: Uuid,
    pub reviewed_id: Uuid,
    pub review: i32,
    pub comment: Option<String>
}
