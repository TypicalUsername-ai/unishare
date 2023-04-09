use actix_web::{HttpServer, web, App, get, Error};
use actix_files as fs;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(web::redirect("/", "/app/home"))
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
