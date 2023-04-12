// authorization services go here
use actix_web::{web, get, Responder, HttpResponse};

pub fn auth_config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(auth);

}

#[get("/auth")]
async fn auth() -> impl Responder {
    HttpResponse::Ok().body("hello from auth")
}
