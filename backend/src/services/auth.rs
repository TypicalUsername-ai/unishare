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

/// Function for configuring the authorization and authentication based endpoints
/// services:
///     `test` - boilerplate testing function
///     `create_user` - creates a new user
///     `user_login` - authorizes and existing user
///     `user_logout` - invalidates an existing session
pub fn auth_open_config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(test)
        .service(create_user)
        .service(user_login);

}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

/// Test function for testing any boilerplate code with development
#[get("/hello")]
async fn test(auth: BearerAuth) -> impl Responder {
    warn!("Authorization attempt with token <{}>", auth.token());
    HttpResponse::Ok().body("{ message : hello from auth }")
}

/// Function for creation of new user objects
/// The function requires a `JSON` encoded `NewUser` entity to be provided in the request body
/// This function errors if the provided username is a duplicate
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
        HttpResponse::Forbidden().json(UnishareError::DuplicateCredentials)
    } else {

        let insert_op: Vec<User> = insert_into(users::table).values(to_register).get_results(&mut conn).expect("Error inserting user to database");
        HttpResponse::Created()
            .json(insert_op)
    }
}

/// Endpoint for providing the authorization token for the user
/// The endpoint is authorized with `Basic` authorization
/// The basic auth header should be of form `Basic {B64encoded(login:password)}`
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
            HttpResponse::Ok().json(AuthResponse::new(jwt.clone(), jwt.create_token()))
        }
        Err(err) => {
            HttpResponse::Unauthorized().finish()

        }
    }
}

