use std::time::SystemTime;

// authorization services go here
use actix_web::{web, get, post, Responder, HttpResponse, cookie::Cookie};
use diesel::{prelude::*, r2d2::{Pool, ConnectionManager}, pg::PgConnection, insert_into};
use log::warn;
use uuid::Uuid;
use crate::entities::{user::{NewUser, User}, session::{Session, SessionData}};
use crate::entities::error::{Error, ErrorType};
use crate::schema::users;
use crate::schema::sessions;
use actix_web_httpauth::extractors::{bearer::BearerAuth, basic::BasicAuth};

pub fn auth_config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(auth)
        .service(create_user)
        .service(user_login)
        .service(user_logout);

}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

#[get("/hello")]
async fn auth(auth: BearerAuth) -> impl Responder {
    warn!("Authorization attempt with token <{}>", auth.token());
    HttpResponse::Ok().body("{ message : hello from auth }")
}

#[post("/register")]
async fn create_user(data: web::Json<NewUser>, pool: web::Data<ConnectionPool>) -> impl Responder{
    let to_register= User::from(data.into_inner());
    let mut conn = pool.get().expect("Failed to get connection from the pool");
    let matches: Vec<User> = users::table
        .filter(users::user_email.eq(&to_register.user_email.clone()))
        .or_filter(users::username.eq(&to_register.username.clone()))
        .get_results(&mut conn)
        .expect("DB query failed");
    if matches.len() != 0 {
        warn!("{:?}", matches);
        HttpResponse::Forbidden()
            .json(Error{ err_type: ErrorType::DuplicateCredentials, reason: "account with credentials already exists".to_string()})
    } else {

        let insert_op: Vec<User> = insert_into(users::table).values(to_register).get_results(&mut conn).expect("Error inserting user to database");
        HttpResponse::Created()
            .json(insert_op)
    }
}

#[post("/login")]
async fn user_login(basic_auth: BasicAuth, pool: web::Data<ConnectionPool>) -> impl Responder {
    // extract data
    let uname = basic_auth.user_id();
    let plaintext = basic_auth.password().unwrap_or("").to_owned();
    let pass = User::hash_password(&plaintext);
    // find user in db
    let mut conn = pool.get().expect("Countdn't get connection from the pool");
    let user: Result<Uuid, diesel::result::Error> = users::table
        .select(users::id)
        .filter(users::username.eq(uname).and(users::password_hash.eq(pass)))
        .first(& mut conn);

    match user {
        Ok(id) => {
            // create a cookie
            let jwt = Session::new(id);
            // store a cookie in db
            insert_into(sessions::table)
                .values(jwt.data())
                .execute(& mut conn);
            // return cookie
            HttpResponse::Ok().insert_header(("X-AUTH", jwt.create_token())).json(jwt)
        }
        Err(err) => {
            HttpResponse::Unauthorized().finish()

        }
    }
}

#[post("/logout")]
async fn user_logout(bearer_auth: BearerAuth, pool: web::Data<ConnectionPool>) -> impl Responder {
    // extract cookie data
    let token = Session::try_from_token(bearer_auth.token().to_owned());

    match token {
        Ok(session) => {
            // validate authenticity
            match session.validate() {
                true => {
                    let data = session.data();
                    // find cookie / session in db (not needed?)
                    if data.expires_at >= SystemTime::now() {
                        HttpResponse::Ok().finish()
                    } else {
                        HttpResponse::Unauthorized().finish()
                    }
                    // delete session from db
                    // return invalidate cookie header
                }
                false => {
                    HttpResponse::Unauthorized().finish()
                }
            }
        }
        Err(e) => {
            HttpResponse::Unauthorized().finish()
        }
    }
}
