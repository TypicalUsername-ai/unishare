// authorization services go here
use actix_web::{web, get, post, Responder, Error, HttpResponse};

use crate::entities::user::{NewUser, User};

pub fn auth_config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(auth)
        .service(create_user);

}

#[get("/auth")]
async fn auth() -> impl Responder {
    HttpResponse::Ok().body("{ message : hello from auth }")
}

#[post("/register")]
async fn create_user(data: web::Json<NewUser>) -> Result<impl Responder, Error>{
    let to_register= User::from(data.into_inner());
    Ok(web::Json(to_register))
}
