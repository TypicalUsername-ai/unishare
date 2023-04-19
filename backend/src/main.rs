use actix_web::{HttpServer, App, middleware::Logger, web};
use env_logger::Env;
use diesel::{r2d2::{ConnectionManager, Pool}, pg::PgConnection};
use services::auth;

mod services;
mod entities;
mod schema;

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    env_logger::init_from_env(Env::default().default_filter_or("info"));
    
    let db_url = std::env!("DATABASE_URL");


    let conn_manager = ConnectionManager::<PgConnection>::new(db_url);

    let conn_pool = Pool::builder()
        .build(conn_manager)
        .expect("Error in connecting to PSQL database, failed to create pool");

    HttpServer::new( move || {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .app_data(web::Data::new(conn_pool.clone()))
            .configure(services::webapp::webapp_config)
            .service(
                web::scope("/api")
                .configure(auth::auth_config)
            )
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}

