use actix_web::{web, Responder, HttpResponse, get, post};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use diesel::{r2d2::ConnectionManager, PgConnection};
use diesel::{prelude::*, insert_into};
use r2d2::Pool;
use uuid::Uuid;
use crate::entities::transaction::Transaction;
use crate::entities::{error::UnishareError, file::{File, FileContent, NewFile}, file_review::FileReview};
use crate::schema::{files_data, files_content};
use super::token_middleware::validate_request;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
            web::scope("/files")
            .service(add_file)
            .service(buy_file)
            .service(get_reviews)
            .service(add_review)
            .service(get_content)
        );
}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

#[post("/create")]
async fn add_file(auth: BearerAuth, data: web::Json::<NewFile>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let user = validate_request(auth, &mut db_conn).await?;
    let data_inner = data.into_inner();
    let contents = data_inner.content.clone();
    let new_data = File::create(data_inner, user.user_id);
    // Creates file content object from content and the same id as corresponding file data record
    let new_content = FileContent::new(new_data.id, contents);
    let insert_data_op: File = insert_into(files_data::table).values(new_data).get_result(&mut db_conn)?;
    let insert_content_op = insert_into(files_content::table).values(new_content).execute(&mut db_conn)?;
    Ok(HttpResponse::Created()
        .json(insert_data_op))
}

#[post("/{file_id}/purchase")]
async fn buy_file(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let buyer_id = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await?;
    let file = files_data::table.filter(files_data::id.eq(buyer_id)).first::<File>(&mut db_conn)?;
    let purchase_result = file.purchase(buyer_id, &mut db_conn).await?;

    Ok(HttpResponse::Ok().json(purchase_result))
}

#[derive(Debug, serde::Deserialize)]
struct Fname {
    name: String,
}

#[get("/search")]
async fn search(pool: web::Data<ConnectionPool>, data: web::Query<Fname>) -> Result<impl Responder, UnishareError> {

    let mut db_conn = pool.get()?;
    let name = data.into_inner();

    let results = File::by_name(name.name, &mut db_conn).await?;

    Ok(HttpResponse::Ok().json(results))
}

#[get("/{file_id}/content")]
async fn get_content(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let file_id = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await?;
    let is_owner: bool = Transaction::user_owns_file(file_id, user.user_id, db_conn)?;
    if(is_owner) {
        let content = FileContent::get_content(file_id, db_conn).await?;
        Ok(HttpResponse::Ok().json(content))
    } else {
        Ok(HttpResponse::NoContent())
    }
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

