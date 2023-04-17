use actix_web::web::Data;
// authorization services go here
use actix_web::{web, get, post, Responder, HttpResponse};
use diesel::{prelude::*, r2d2::{Pool, ConnectionManager}, pg::PgConnection, insert_into};
use log::warn;
use crate::entities::user::{NewUser, User};
use crate::entities::error::{Error, ErrorType};
use crate::schema::users::dsl::*;

pub fn auth_config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(auth)
        .service(create_user);

}

type connectionPool = Pool<ConnectionManager<PgConnection>>;

#[get("/hello")]
async fn auth() -> impl Responder {
    HttpResponse::Ok().body("{ message : hello from auth }")
}

#[post("/register")]
async fn create_user(data: web::Json<NewUser>, pool: Data<connectionPool>) -> impl Responder{
    let to_register= User::from(data.into_inner());
    let mut conn = pool.get().expect("Failed to get connection from the pool");
    let matches: Vec<User> = users
        .filter(user_email.eq(&to_register.user_email.clone()))
        .or_filter(username.eq(&to_register.username.clone()))
        .get_results(&mut conn)
        .expect("DB query failed");
    if matches.len() != 0 {
        warn!("{:?}", matches);
        HttpResponse::Forbidden()
            .json(Error{ err_type: ErrorType::DuplicateCredentials, reason: "account with credentials already exists".to_string()})
    } else {

        let insert_op: Vec<User> = insert_into(users).values(to_register).get_results(&mut conn).expect("Error inserting user to database");
        HttpResponse::Created()
            .json(insert_op)
    }
}

#[post("/login")]
async fn user_login(data: , pool: Data<connectionPool>) -> impl Responder {
    todo!()
}
