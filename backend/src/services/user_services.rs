use actix_web::{web, Responder, HttpResponse, get, post, delete};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use diesel::{r2d2::ConnectionManager, PgConnection};
use r2d2::Pool;
use serde::{Serialize, Deserialize};
use serde_json::json;
use uuid::Uuid;
use crate::entities::{error::UnishareError, user_data::{User, self}, user_review::UserReview, file::File};
use super::token_middleware::validate_request;
use log::warn;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
             web::scope("/users")
             .service(profile)
             .service(get_reviews)
             .service(add_review)
             .service(search)
            );
}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

#[get("/{user_id}/profile")]
async fn profile(bearer: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let auth_result = validate_request(bearer, &mut db_conn).await;
    let prof_uid = path.into_inner();
    let profile = User::by_uuid(prof_uid, &mut db_conn).await?;
    // get user data here
    warn!("{:?} -> {:?}", prof_uid, profile);
    if let Ok(session) = auth_result {
        let current_id = profile.id;
        match session.user_id {
            // match if the profile requested is the user's profile
            current_id => Ok(HttpResponse::Ok().json(profile.as_owner())),
            _ => Ok(HttpResponse::Ok().json(profile.as_user()))
        }
    }
    else {
        // return basic user profile (for unregistered users)
        Ok(HttpResponse::Ok().json(profile.as_guest()))
    }
}

#[derive(Debug, serde::Deserialize)]
struct Uname {
    name: String,
}

#[get("/search")]
async fn search(pool: web::Data<ConnectionPool>, data: web::Query<Uname>) -> Result<impl Responder, UnishareError> {

    let mut db_conn = pool.get()?;
    let name = data.into_inner();

    let results = User::by_name(name.name, &mut db_conn).await?;

    Ok(HttpResponse::Ok().json(results))
}

#[post("/{user_id}/profile")]
async fn update_profile() -> Result<impl Responder, UnishareError> {
    todo!();
    Ok(HttpResponse::InternalServerError().finish())
}

#[delete("/{user_id}")]
async fn delete_account() -> Result<impl Responder, UnishareError> {
    todo!();
    Ok(HttpResponse::InternalServerError().finish())
}

#[derive(Serialize, Deserialize)]
struct Files {
    pub files : Vec<File>
}

#[get("/{user_id}/files")]
async fn get_files(bearer: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let auth_result = validate_request(bearer, &mut db_conn).await?;
    let user = User::by_uuid(path.to_owned(), &mut db_conn).await?;
    let files = user.get_owned_files(&mut db_conn).await?;
    Ok(HttpResponse::Ok().json(Files{files}))
}

#[get("/{user_id}/reviews")]
async fn get_reviews(auth: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {

    let id = path.into_inner();
    let mut db_conn = pool.get()?;

    let user = validate_request(auth, &mut db_conn).await?;
    let data = UserReview::by_uuid(id, &mut db_conn).await?;
    
    Ok(HttpResponse::Ok().json(data))
}

#[derive(Debug, serde::Deserialize)]
struct ReviewData {
    rating: i32,
    comment: Option<String>
}

#[post("/{user_id}/reviews")]
async fn add_review(auth: BearerAuth, pool: web::Data<ConnectionPool>, data: web::Json<ReviewData>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    
    let review_data = data.into_inner();
    let mut db_conn = pool.get()?;
    let target_id = path.into_inner();
    let user = validate_request(auth, &mut db_conn).await?;
    let review = UserReview { reviewer_id: user.user_id, reviewed_id: target_id, review: review_data.rating, comment: review_data.comment };
    let data = UserReview::add_review(review, &mut db_conn).await?;
    
    Ok(HttpResponse::Ok().json(data))
}
