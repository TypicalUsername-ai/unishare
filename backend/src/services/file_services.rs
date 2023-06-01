use actix_web::{web, Responder, HttpResponse, get, post, delete};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use diesel::{r2d2::ConnectionManager, PgConnection};
use diesel::prelude::*;
use r2d2::Pool;
use uuid::Uuid;
use crate::entities::{error::UnishareError, files_data::File, files_content::FileContent, file_reviews::FileReview};
use super::token_middleware::validate_request;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
            web::scope("/files")
            .service(add_file)
            .service(buy_file)
            .service(get_reviews)
            .service(add_review)
        );
}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

#[post("/create")]
async fn add_file(data: web::Json::<NewFile>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let new_data = File::from(data.into_inner());

    // Creates file content object from content and the same id as corresponding file data record
    let new_content = FileContent::new(new_data.id, data.into_inner().content);
    let mut db_conn = pool.get()?;
    let insert_data_op = insert_into(files_data::table).values(new_data).get_results(&mut db_conn)?;
    let insert_content_op = insert_into(files_content::table).values(new_content).get_results(&mut db_conn)?;
    Ok(HttpResponse::Created()
        .json(insert_data_op))
}

#[post("/{file_id}/purchase")]
async fn buy_file(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<(), UnishareError> {
    let buyer_id = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await?;
    let file = files_data::table.filter(files_data::id).first::<File>(db_conn)?;
    let purchase_result = File::purchase(file, buyer_id, db_conn)?;

    Ok(purchase_result)
}

#[get("/{file_id}/reviews")]
async fn get_reviews(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {

    let id = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await?;
    let data = FileReview::by_uuid(id, &mut db_conn).await?;

    Ok(HttpResponse::Ok().json(data))
}

#[derive(Debug, serde::Deserialize)]
struct ReviewData {
    pub review: i32,
    pub comment: Option<String>
}

#[post("/{file_id}/reviews")]
async fn add_review(auth: BearerAuth, pool: web::Data<ConnectionPool>, data: web::Json<ReviewData>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {

    let review_data = data.into_inner();
    let mut db_conn = pool.get()?;
    let target_id = path.into_inner();
    let reviewer = validate_request(auth, &mut db_conn).await?;
    let review = FileReview { reviewer_id: reviewer.user_id, file_id: target_id, review: review_data.review, comment: review_data.comment };
    let data = FileReview::add_review(review, &mut db_conn).await?;

    Ok(HttpResponse::Ok().json(data))
}

