use actix_web::web::Data;
// authorization services go here
use actix_web::{web, get, post, Responder, Error, HttpResponse};
use diesel::{prelude::*, r2d2::{Pool, ConnectionManager}, pg::PgConnection, insert_into};

use crate::entities::user::{NewUser, User};
use crate::schema::users::dsl::*;

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
async fn create_user(data: web::Json<NewUser>, pool: Data<Pool<ConnectionManager<PgConnection>>>) -> Result<impl Responder, Error>{
    let to_register= User::from(data.into_inner());
    let mut conn = pool.get().expect("Failed to get connection from the pool");
    let insert_op: Vec<User> = insert_into(users).values(to_register).get_results(&mut conn).expect("Error inserting user to database");
    Ok(web::Json(insert_op))
}
