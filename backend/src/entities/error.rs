use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Error {
    pub err_type: ErrorType,
    pub reason: String
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ErrorType {
    DuplicateCredentials,
    TokenExpired,
    TokenInvalid,
}
