use actix_web::{web, Responder};
use diesel::{r2d2::ConnectionManager, PgConnection};
use r2d2::Pool;

use crate::entities::error::UnishareError;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
             web::scope("/users")
             .service(profile)
            );
}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;


async fn profile() -> Result<impl Responder, UnishareError> {
}
