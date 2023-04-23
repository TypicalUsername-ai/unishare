use std::time::SystemTime;

// authorization services go here
use actix_web::{web, get, post, Responder, HttpResponse};
use diesel::{prelude::*, r2d2::{Pool, ConnectionManager}, pg::PgConnection, insert_into};
use log::warn;
use uuid::Uuid;
use crate::entities::{user::{NewUser, User}, session::{Session, AuthResponse}};
use crate::entities::error::UnishareError;
use crate::schema::users;
use crate::schema::sessions;
use actix_web_httpauth::extractors::{bearer::BearerAuth, basic::BasicAuth};
use super::token_middleware::validate_request;

/// Function for configuring the authorization and authentication based endpoints
/// services:
///     `test` - boilerplate testing function
///     `create_user` - creates a new user
///     `user_login` - authorizes and existing user
///     `user_logout` - invalidates an existing session
pub fn auth_config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(test)
        .service(create_user)
        .service(user_login)
        .service(user_logout);
}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

/// Test function for testing any boilerplate code with development
#[get("/hello")]
async fn test(auth: BearerAuth, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let session = validate_request(auth, &mut db_conn).await?;
    Ok(HttpResponse::Ok().json(session))
}

/// Function for creation of new user objects
/// The function requires a `JSON` encoded `NewUser` entity to be provided in the request body
/// This function errors if the provided username is a duplicate
#[post("/register")]
async fn create_user(data: web::Json<NewUser>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let to_register= User::from(data.into_inner());
    let mut conn = pool.get()?;
    let matches: Vec<User> = users::table
        .filter(users::user_email.eq(&to_register.user_email.clone()))
        .or_filter(users::username.eq(&to_register.username.clone()))
        .get_results(&mut conn)?;
    if matches.len() != 0 {
        warn!("{:?}", matches);
        Err(UnishareError::DuplicateCredentials)
    } else {

        let insert_op: Vec<User> = insert_into(users::table).values(to_register).get_results(&mut conn)?;
        Ok(HttpResponse::Created()
            .json(insert_op))
    }
}

/// Endpoint for providing the authorization token for the user
/// The endpoint is authorized with `Basic` authorization
/// The basic auth header should be of form `Basic {B64encoded(login:password)}`
#[post("/login")]
async fn user_login(basic_auth: BasicAuth, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    // extract data
    let uname = basic_auth.user_id();
    let plaintext = basic_auth.password().unwrap_or("").to_owned();
    let pass = User::hash_password(&plaintext);
    // find user in db
    let mut conn = pool.get()?;
    let user: Option<Vec<Uuid>> = users::table
        .select(users::id)
        .filter(users::username.eq(uname).and(users::password_hash.eq(pass)))
        .get_results(& mut conn).optional()?;

    match user {
        None => Err(UnishareError::BadCredentials),
        Some(data) => {
            let id = data[0];
            // create a cookie
            let jwt = Session::new(id);
            // store a cookie in db
            let cookie_result = insert_into(sessions::table)
                .values(jwt.data())
                .execute(& mut conn)?;
            // return cookie
            Ok(HttpResponse::Ok().json(AuthResponse::new(jwt.clone(), jwt.create_token())))
        }
    }
}

/// Endpoint for invalidating the token the user provides
/// Not implemented yet
#[post("/logout")]
pub async fn user_logout(bearer_auth: BearerAuth, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let session = validate_request(bearer_auth, &mut db_conn).await?;
    let invalidate_session = diesel::delete(sessions::table.filter(sessions::session_id.eq(session.session_id)))
        .execute(&mut db_conn)?;
    Ok(HttpResponse::Ok().json(session.session_id))
}
