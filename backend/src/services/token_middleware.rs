use std::time::SystemTime;
use actix_web::dev::ServiceRequest;
use actix_web_httpauth::extractors::bearer::BearerAuth;
use actix_web::Error;
use log::info;
use uuid::Uuid;
use crate::entities::{session::Session, error::UnishareError};

/// Validator function for the middleware
/// best not to use as it attaches to everything in the route and cannot be made selective
pub async fn validator(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    // extract cookie data
    let token = Session::try_from_token(credentials.token().to_owned());

    eprintln!("{}", req.path());

    info!("Bearer validation for path {} with token {}", req.path(), credentials.token());

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
                        Err((UnishareError::TokenExpired.into(),req))
                    }
                    // delete session from db
                    // return invalidate cookie header
                }
                false => {
                    Err((UnishareError::TokenInvalid.into(), req))
                }
            }
        }
        Err(e) => {
            Err((UnishareError::TokenInvalid.into(), req))
        }
    }

}

/// function for cryptographically validating the provided token from the `BearerAuth` struct
/// it returns a tuple of `Uuid` objects on succes in the form of (user_id, session_id)
/// WARNING! this function does not check if the session was invalidated by the user or the server
pub async fn validate_token(credentials: BearerAuth) -> Result<(Uuid, Uuid), UnishareError> {
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
                        Ok((data.user_id, data.session_id))
                    } else {
                        Err(UnishareError::TokenExpired)
                    }
                    // delete session from db
                    // return invalidate cookie header
                }
                false => {
                    Err(UnishareError::TokenInvalid)
                }
            }
        }
        Err(e) => {
            Err(UnishareError::TokenInvalid)
        }
    }

}
