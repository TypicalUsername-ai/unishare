use std::time::{SystemTime, Duration};
use diesel::{Insertable, Queryable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::schema::sessions;
use serde_json;
use sha256;

#[derive(Debug, Serialize, Deserialize)]
pub struct Session {
    #[serde(flatten)]
    session_data: SessionData,
    signature: String
}

impl Session {
    pub fn new(user_id: Uuid) -> Self {
        Self { session_data: SessionData::new(user_id), signature: String::from("") }.sign()
    }

    pub fn extend(mut self, time_secs: u64) -> Self {
        self.session_data = self.session_data.extend(time_secs);
        self.sign()
    }

    fn sign(mut self) -> Self {
        let payload_bytes = serde_json::to_string(&self.session_data).expect("Error serializing into JSON");
        self.signature = sha256::digest(payload_bytes+std::env!("HASH_SALT"));
        self
    }

    pub fn data(&self) -> SessionData {
        self.session_data.clone()
    }

}

/// An object containing all the necessary session data, without the cryptographic signature
#[derive(Debug, Serialize, Deserialize, Insertable, Queryable, Clone)]
#[diesel(table_name = sessions)]
pub struct SessionData {
    session_id: Uuid,
    user_id: Uuid,
    expires_at: SystemTime,
}

impl SessionData {
    /// Creates a new Session object extends it by an hour and signs it with sha256
    fn new(user_id: Uuid) -> Self {
        Self { session_id: Uuid::new_v4(), user_id, expires_at: SystemTime::now() }.extend(3600)
    }

    fn extend(mut self, time_seconds: u64) -> Self {
        let time = Duration::from_secs(time_seconds);
        self.expires_at = self.expires_at.checked_add(time).expect("cannot exted the session for that duration");
        self
    }
}
