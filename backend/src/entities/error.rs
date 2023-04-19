use base64::display;
use serde::{Serialize, Deserialize};
use derive_more::{Display, Error};
use actix_web::{error, HttpResponse, http::StatusCode};

#[derive(Debug, Serialize, Deserialize, Display, Error)]
pub enum UnishareError {
    #[display(fmt = "Duplicate Credentials")]
    DuplicateCredentials,
    #[display(fmt = "Token Expired")]
    TokenExpired,
    #[display(fmt = "Invalid Token")]
    TokenInvalid,
    #[display(fmt = "Bad Credentials")]
    BadCredentials
}

impl error::ResponseError for UnishareError {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code())
            .body(self.to_string())
    }
    fn status_code(&self) -> StatusCode {
        match self {
            UnishareError::DuplicateCredentials => StatusCode::UNAUTHORIZED,
            UnishareError::TokenExpired => StatusCode::UNAUTHORIZED,
            UnishareError::TokenInvalid => StatusCode::UNAUTHORIZED,
            UnishareError::BadCredentials => StatusCode::UNAUTHORIZED
        }
    }
}
