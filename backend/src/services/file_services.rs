use actix_multipart::form::MultipartForm;
use actix_multipart::form::tempfile::TempFile;
use actix_multipart::form::text::Text;
use actix_web::{web, Responder, HttpResponse, get, post, delete};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use diesel::{r2d2::ConnectionManager, PgConnection};
use diesel::{prelude::*, insert_into};
use serde::{Serialize, Deserialize};
use std::fs;
use r2d2::Pool;
use uuid::Uuid;
use crate::entities::{file_user_view::FileUserView, transaction::Transaction};
use crate::entities::{error::UnishareError, file::{File, NewFile}, file_review::FileReview, user_data::User};
use crate::schema::files_data;
use super::token_middleware::validate_request;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
            web::scope("/files")
            .service(add_file)
            .service(buy_file)
            .service(get_reviews)
            .service(add_review)
            .service(search)
            .service(get_file_with_transaction)
            .service(get_content)
            .service(delete_file)
        );
}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

#[derive(Debug, MultipartForm)]
struct FileUploadForm {
    filename: Text<String>,
    description: Text<String>,
    price: Text<i32>,
    primary_tag: Option<Text<String>>,
    secondary_tag: Option<Text<String>>,
    content: TempFile
}

#[post("/create")]
async fn add_file(auth: BearerAuth, data: MultipartForm<FileUploadForm>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let user = validate_request(auth, &mut db_conn).await?;
    let file = data.into_inner();
    let content_file = file.content.file.as_file();

    let filedata = NewFile::new(
        file.filename.into_inner(), 
        user.user_id, 
        file.price.into_inner(), 
        match file.primary_tag {Some(e) => Some(e.into_inner()), None => None} , 
        match file.secondary_tag {Some(e) => Some(e.into_inner()), None => None}
    );

    let newfile = File::create(filedata, user.user_id);
    let fileid = newfile.id.clone();
    insert_into(files_data::table).values(newfile).execute(&mut db_conn).unwrap();
    fs::rename(file.content.file, format!("/files/{}", fileid));

    Ok(HttpResponse::Created().json(fileid))

}

#[post("/{file_id}/purchase")]
async fn buy_file(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let file_id = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await?;
    let file = files_data::table.filter(files_data::id.eq(file_id)).first::<File>(&mut db_conn)?;
    let purchase_result = file.purchase(user.user_id, &mut db_conn).await?;

    Ok(HttpResponse::Ok().json(purchase_result))
}

#[derive(Debug, Deserialize)]
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

#[get("/{file_id}")]
async fn get_file_with_transaction(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let fileid = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await;
    let mut uid = Uuid::new_v4();
    match user {
        Ok(session) => {
            uid = session.user_id;
        }
        Err(_) => {}
    }
    Ok(HttpResponse::Ok().json(FileUserView::get(fileid, uid, &mut db_conn).await?))
}

#[derive(Debug, Deserialize)]
struct FilePrice {
    pub price: i32
}

#[post("/{file_id}/pricechange")]
async fn change_file_price(auth: BearerAuth, pool: web::Data<ConnectionPool>, data: web::Json<FilePrice>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let file_id = path.into_inner();
    let new_price = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await?;
    let file = File::by_id(file_id, &mut db_conn).await?;
    let updated_file = file.edit_price(new_price, &mut db_conn).await?;

    Ok(HttpResponse::Ok().json(updated_file))
}

#[delete("/{file_id}")]
async fn delete_file(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let fileid = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await;
    let delete_file = File::delete_file(fileid, &mut db_conn).await?;
    Ok(HttpResponse::Ok())
}

#[derive(Serialize, Deserialize)]
struct FileContent {
    pub content: String,
}

#[get("/{file_id}/content")]
async fn get_content(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let file_id = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await?;
    let is_owner: bool = Transaction::user_owns_file(file_id, user.user_id, &mut db_conn).await?;
    if is_owner {
        let content = fs::read_to_string(format!("/files/{}", file_id))
        .unwrap_or("No Content Available".to_owned());
        Ok(HttpResponse::Ok().json(FileContent{ content })) // need to send content
    } else {
        Ok(HttpResponse::NoContent().finish())
    }
}

#[get("/{file_id}/reviews")]
async fn get_reviews(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let id = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await;
    let mut data = FileReview::by_uuid(id, &mut db_conn).await?;

    if let Err(_) = user {
        data.truncate(5);
    }

    Ok(HttpResponse::Ok().json(data))
}



#[derive(Debug, Deserialize)]
struct ReviewData {
    pub review: i32,
    pub comment: Option<String>
}

#[post("/{file_id}/reviews")]
async fn add_review(auth: BearerAuth, pool: web::Data<ConnectionPool>, data: web::Json<ReviewData>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {

    let review_data = data.into_inner();
    let mut db_conn = pool.get()?;
    let target_id = path.into_inner();
    let file = File::by_id(target_id, &mut db_conn).await?;
    let reviewer_session = validate_request(auth, &mut db_conn).await?;
    let review = FileReview { reviewer_id: reviewer_session.user_id, file_id: target_id, review: review_data.review, comment: review_data.comment };
    let data = FileReview::add_review(review, &mut db_conn).await?;
    let reviewer = User::by_uuid(reviewer_session.user_id, &mut db_conn).await?;
    let updated_file = file.update_rating(&mut db_conn).await?;
    reviewer.update_tokens(5, &mut db_conn).await?;
    Ok(HttpResponse::Ok().json(data))
}

