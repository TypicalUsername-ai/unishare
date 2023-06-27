use actix_web::{HttpServer, App, middleware::Logger, web};
use env_logger::Env;
use diesel::{r2d2::{ConnectionManager, Pool}, pg::PgConnection};
use lettre::transport::smtp::{authentication::{Credentials, Mechanism}, PoolConfig};
use lettre::SmtpTransport;
use services::{user_services, auth_services, file_services, report_services};
use std::fs;

mod services;
mod entities;
mod schema;

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    fs::create_dir("/files");
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    
    let db_url = std::env!("DATABASE_URL");


    let conn_manager = ConnectionManager::<PgConnection>::new(db_url);

    let conn_pool = Pool::builder()
        .build(conn_manager)
        .expect("Error in connecting to PSQL database, failed to create pool");

    let sender = SmtpTransport::starttls_relay("smtp.office365.com").expect("Failed to establish tls mailer")
    .credentials(Credentials::new(
        std::env!("APP_MAIL").to_owned(),
        std::env!("MAIL_PASSWORD").to_owned()
    ))
    .authentication(vec![Mechanism::Login])
    .pool_config(PoolConfig::new().max_size(20))
    .build();

    HttpServer::new( move || {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .app_data(web::Data::new(conn_pool.clone()))
            .app_data(web::Data::new(sender.clone()))
            .configure(services::webapp::webapp_config)
            .service(
                web::scope("/api")
                .configure(auth_services::config)
                .configure(user_services::config)
                .configure(file_services::config)
                .configure(report_services::config)
                .configure(report_services::config)
            )
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}

