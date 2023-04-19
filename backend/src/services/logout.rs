/// Endpoint for invalidating the token the user provides
/// Not implemented yet
#[post("/logout")]
async fn user_logout(bearer_auth: BearerAuth, pool: web::Data<ConnectionPool>) -> impl Responder {
    HttpResponse::Ok().finish()
}
