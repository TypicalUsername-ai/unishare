use actix_web::{HttpServer, web, App, get, Error};
use actix_files as fs;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(fs::Files::new("/", "../frontend/dist").index_file("index.html"))
            .service(web::scope("/api"))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
