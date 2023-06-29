use argon2::password_hash::rand_core::le;
use diesel::{Insertable, Queryable, PgConnection, QueryDsl, insert_into};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::schema::user_reviews::{self, reviewed_id};
use diesel::prelude::*;
use super::error::UnishareError;

#[derive(Debug, Serialize, Deserialize, Insertable, Queryable)]
#[diesel(table_name = user_reviews)]
pub struct UserReview {
    pub reviewed_id: Uuid,
    pub reviewer_id: Uuid,
    pub review: i32,
    pub comment: Option<String>
}

impl UserReview {

    /// Find review by id
    pub async fn by_uuid(id: Uuid, db_conn: &mut PgConnection) -> Result<Vec<UserReview>, UnishareError> {
        let reviews_opt = user_reviews::table.filter(reviewed_id.eq(id)).load::<UserReview>(db_conn).optional()?;
        if let Some(v) = reviews_opt {
            Ok(v)
        } else {
            Ok(vec![])
        }
    }

    pub async fn by_reviewer_reviewed(reviewer: Uuid, reviewed: Uuid, db_conn: &mut PgConnection) -> Result<Option<UserReview>, UnishareError> {
        let review_opt: Option<UserReview> = user_reviews::table
            .filter(user_reviews::reviewer_id.eq(reviewer.clone())
                .and(user_reviews::reviewed_id.eq(reviewed.clone())))
            .first(db_conn).optional()?;
        Ok(review_opt)
    }

    pub async fn add_review(review: UserReview, db_conn: &mut PgConnection) -> Result<UserReview, UnishareError> {
        let inserted_opt = insert_into(user_reviews::table).values(review).get_result::<UserReview>(db_conn)?;

        Ok(inserted_opt)
    }

    pub async fn delete_review(&self, db_conn: &mut PgConnection) -> Result<(), UnishareError> {
        let delete_review = diesel::delete(user_reviews::table)
            .filter(user_reviews::reviewer_id.eq(self.reviewer_id.clone())
                .and(user_reviews::reviewed_id.eq(self.reviewed_id.clone()))
                .and(user_reviews::review.eq(self.review.clone()))
                .and(user_reviews::comment.eq(self.comment.clone()))
            ).execute(db_conn)?;
        Ok(())
    }

    pub async fn by_author(user_id: Uuid, db_conn: &mut PgConnection) -> Result<Vec<UserReview>, UnishareError> {
        let data = user_reviews::table
            .filter(user_reviews::reviewer_id.eq(user_id))
            .get_results::<UserReview>(db_conn)?;

        Ok(data)
    }

}
