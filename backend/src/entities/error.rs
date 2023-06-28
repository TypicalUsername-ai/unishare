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
    BadCredentials,
    #[display(fmt = "Internal Database Error ({})", reason)]
    DatabaseError{ reason: String },
    #[display(fmt = "Requested resource doesn't exist ({})", resource)]
    ResourceNotFound{ resource: String },
    #[display(fmt = "Invalid action ({})", action)]
    InvalidAction{ action: String }
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
            UnishareError::BadCredentials => StatusCode::UNAUTHORIZED,
            UnishareError::DatabaseError{reason} => StatusCode::INTERNAL_SERVER_ERROR,
            UnishareError::ResourceNotFound { resource } => StatusCode::NOT_FOUND,
            UnishareError::InvalidAction { action } => StatusCode::BAD_REQUEST,
        }
    }
}

impl From<diesel::result::Error> for UnishareError {
    fn from(value: diesel::result::Error) -> Self {
        Self::DatabaseError { reason: value.to_string() }
    }
}

impl From<r2d2::Error> for UnishareError {
    fn from(value: r2d2::Error) -> Self {
        Self::DatabaseError { reason: value.to_string() }
    }
}
