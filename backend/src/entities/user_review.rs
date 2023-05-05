use diesel::{Insertable, Queryable, PgConnection, QueryDsl, insert_into};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::schema::user_reviews::{self, reviewed_id};
use diesel::prelude::*;
use super::error::UnishareError;

#[derive(Debug, Serialize, Deserialize, Insertable, Queryable)]
#[diesel(table_name = user_reviews)]
pub struct UserReview {
    pub reviewer_id: Uuid,
    pub reviewed_id: Uuid,
    pub review: i32,
    pub comment: Option<String>
}

impl UserReview {

    pub async fn by_uuid(id: Uuid, db_conn: &mut PgConnection) -> Result<Vec<UserReview>, UnishareError> {
        let reviews_opt = user_reviews::table.filter(reviewed_id.eq(id)).load::<UserReview>(db_conn).optional()?;
        if let Some(v) = reviews_opt {
            Ok(v)
        } else {
            Ok(vec![])
        }
    }

    pub async fn add_review(review: UserReview, db_conn: &mut PgConnection) -> Result<UserReview, UnishareError> {
        let inserted_opt = insert_into(user_reviews::table).values(review).get_result::<UserReview>(db_conn)?;

        Ok(inserted_opt)
    }

}
