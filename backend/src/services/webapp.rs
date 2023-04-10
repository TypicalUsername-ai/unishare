use actix_web::{get, web, Error};
use actix_files as fs;

pub fn webapp_config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(app)
        .service(web::redirect("/", "/app/"))
        .service(fs::Files::new("/assets", "../frontend/dist/assets"));

}


#[get("/app/{trail:.*}")]
async fn app() -> Result<fs::NamedFile, Error> {
    let file = fs::NamedFile::open_async("../frontend/dist/index.html").await?;
    Ok(file)
}
