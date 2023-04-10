use actix_web::{HttpServer, web, App, get, Error, middleware::Logger};
use actix_files as fs;
use env_logger::Env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    env_logger::init_from_env(Env::default().default_filter_or("info"));

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .service(web::redirect("/", "/app/"))
            .service(fs::Files::new("/assets", "../frontend/dist/assets"))
            .service(app)
            .service(web::scope("/api"))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

#[get("/app/{trail:.*}")]
async fn app() -> Result<fs::NamedFile, Error> {
    let file = fs::NamedFile::open_async("../frontend/dist/index.html").await?;
    Ok(file)
}
