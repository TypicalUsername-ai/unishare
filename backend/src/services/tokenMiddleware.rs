use std::time::SystemTime;

use actix_web::dev::ServiceRequest;
use actix_web_httpauth::extractors::{bearer::BearerAuth, AuthenticationError};
use actix_web::Error;
use crate::entities::session::Session;

pub async fn validator(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    // extract cookie data
    let token = Session::try_from_token(credentials.token().to_owned());

    match token {
        Ok(session) => {
            // validate authenticity
            match session.validate() {
                true => {
                    let data = session.data();
                    // find cookie / session in db (not needed?)
                    if data.expires_at >= SystemTime::now() {
                        Ok(req)
                    } else {
                        Err((AuthenticationError::new().with_error_description("Token expired") ,req))
                    }
                    // delete session from db
                    // return invalidate cookie header
                }
                false => {
                    Err((_ , req))
                }
            }
        }
        Err(e) => {
            Err((Error{err_type: ErrorType::TokenInvalid, reason: "Invalid token".to_owned()}, req))
        }
    }

}
