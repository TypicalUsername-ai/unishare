use actix_web::{web, Responder, HttpResponse, get, post, delete};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use diesel::{r2d2::ConnectionManager, PgConnection};
use r2d2::Pool;
use uuid::Uuid;
use crate::entities::{error::UnishareError, user_data::User};
use super::token_middleware::validate_request;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
             web::scope("/users")
             .service(profile)
            );
}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

#[get("/{user_id}/profile")]
async fn profile(bearer: BearerAuth, pool: web::Data<ConnectionPool>, path: web::Path<Uuid>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let auth_result = validate_request(bearer, &mut db_conn).await;
    let prof_uid = path.into_inner();
    let profile = User::by_uuid(prof_uid, &mut db_conn).await?;// get user data here
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

#[get("/{user_id}/files")]
async fn get_files() -> Result<impl Responder, UnishareError> {
    todo!();
    Ok(HttpResponse::InternalServerError().finish())
}

#[get("/{user_id}/reviews")]
async fn get_reviews() -> Result<impl Responder, UnishareError> {
    todo!();
    Ok(HttpResponse::InternalServerError().finish())
}

#[post("/{user_id}/reviews")]
async fn add_review() -> Result<impl Responder, UnishareError> {
    todo!();
    Ok(HttpResponse::InternalServerError().finish())
}
