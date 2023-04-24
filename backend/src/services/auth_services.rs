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

use lettre::{SmtpTransport, Transport, Message, Address, message::Mailbox};


/// Function for configuring the authorization and authentication based endpoints
/// services:
///     `test` - boilerplate testing function
///     `create_user` - creates a new user
///     `user_login` - authorizes and existing user
///     `user_logout` - invalidates an existing session
pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(test)
        .service(create_user)
        .service(user_login)
        .service(user_logout)
        .service(password_reset)
        .service(new_password)
        .service(confirm_account);
}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

/// Test function for testing any boilerplate code with development
#[get("/hello")]
async fn test(auth: BearerAuth, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let session = validate_request(auth, &mut db_conn).await?;
    Ok(HttpResponse::Ok().json(session))
}

#[derive(Debug, serde::Deserialize)]
struct Uid {
    uid: Uuid,
}

#[get("/confirm")]
async fn confirm_account(id_payload: web::Query<Uid>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let uid = id_payload.uid;
    let mut conn = pool.get()?;
    let update_op = diesel::update(users::table)
        .filter(users::id.eq(uid)).set(users::confirmed.eq(true))
        .execute(&mut conn)?;
    Ok(HttpResponse::Ok().json(()))
}

/// Function for creation of new user objects
/// The function requires a `JSON` encoded `NewUser` entity to be provided in the request body
/// This function errors if the provided username is a duplicate
#[post("/register")]
async fn create_user(data: web::Json<NewUser>, pool: web::Data<ConnectionPool>, mailer: web::Data<SmtpTransport>) -> Result<impl Responder, UnishareError> {
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
        let link = format!("{}/api/confirm?uid={}", std::env!("HOSTNAME"), insert_op[0].id);
        let email = Message::builder()
            .from(Mailbox::new(None, std::env!("APP_MAIL").parse::<Address>().expect("error parsing user email")))
            .to(Mailbox::new(None, (insert_op[0].user_email).parse::<Address>().expect("error parsing user email")))
            .subject("Email authentication")
            .body(String::from("Please click this link to confirm your account in Unishare: ".to_owned() + &link)).expect("error creating email");
        let result = mailer.send(&email);
        warn!("{}", std::env!("APP_MAIL"));
        warn!("mail send result {:?}", result);
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
#[post("/logout")]
async fn user_logout(bearer_auth: BearerAuth, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let session = validate_request(bearer_auth, &mut db_conn).await?;
    let invalidate_session = diesel::delete(sessions::table.filter(sessions::session_id.eq(session.session_id)))
        .execute(&mut db_conn)?;
    Ok(HttpResponse::Ok().json(session.session_id))
}

/// Helper struct for the password reset function
#[derive(Debug, serde::Deserialize)]
struct Email {
    email: String
}

/// Function for resetting password for a user
/// requires an `Email` structure of `{email : $email}` inthe json request body
/// replies with http 202 on success
#[post("/passwordreset")]
async fn password_reset(payload: web::Json<Email>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    // mailer functionality to send the reset password
    warn!("Mailer unimplemented");
    // invalidater all existing sessions
    let id_opt: Option<Uuid> = users::table.select(users::id).filter(users::user_email.eq(payload.email.clone())).first(&mut db_conn).optional()?;

    if let Some(id) = id_opt {
        let rem_sessions = diesel::delete(sessions::table.filter(sessions::user_id.eq(id))).execute(&mut db_conn)?;
        Ok(HttpResponse::Accepted().body("All previous sessions invalidated"))
    } else {
        Err(UnishareError::ResourceNotFound { resource: format!("account for mail {}", payload.email) })
    }

}

#[derive(Debug, serde::Deserialize)]
struct NewPass {
    user_id: Uuid,
    password: String,
}

/// Function for setting n existing user with a new password
#[post("/newpassword")]
async fn new_password(pass_data: web::Json<NewPass>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    // get user
    let user_opt: Option<User> = users::table.filter(users::id.eq(pass_data.user_id.clone())).first(&mut db_conn).optional()?;
    if let Some(user) = user_opt {
        // reset his password to the one in payload
        let update = diesel::update(users::table.filter(users::id.eq(user.id)))
                     .set(users::password_hash.eq(User::hash_password(&pass_data.password))).execute(&mut db_conn)?;
        // send no content
        Ok(HttpResponse::NoContent().finish())

    }
    else {
        Err(UnishareError::ResourceNotFound { resource: format!("Account (id: {})", pass_data.user_id) })
    }

}

