use actix_web::{HttpServer, App, middleware::Logger, web};
use env_logger::Env;

mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    env_logger::init_from_env(Env::default().default_filter_or("info"));

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .configure(services::webapp::webapp_config)
            .service(
                web::scope("/api")
                .configure(services::auth::auth_config)
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

