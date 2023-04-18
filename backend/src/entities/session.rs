use std::time::{SystemTime, Duration};
use diesel::{Insertable, Queryable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::schema::sessions;
use serde_json;
use sha256;
use base64::{Engine as _, engine::general_purpose};

#[derive(Debug, Serialize, Deserialize)]
pub struct Session {
    #[serde(flatten)]
    session_data: SessionData,
    pub signature: String
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
        self.signature = self.generate_signature();
        self
    }

    fn generate_signature(&self) -> String {
        let payload = serde_json::to_string(&self.session_data).expect("Error serializing into JSON");
        sha256::digest(payload+std::env!("HASH_SALT"))
    }

    pub fn validate(&self) -> bool {
        self.generate_signature() == self.signature
    }

    pub fn data(&self) -> SessionData {
        self.session_data.clone()
    }

    pub fn create_token(&self) -> String {
        general_purpose::STANDARD_NO_PAD.encode(serde_json::to_string(&self).expect("Failed json serailization"))
    }

    pub fn try_from_token(base64encoded: String) -> Result<Self, serde_json::Error> {
        let json_bytes = general_purpose::STANDARD_NO_PAD.decode(base64encoded).expect("Failed b64 decode");
        let json_string = String::from_utf8(json_bytes).expect("Failed [u8] string conversion");
        serde_json::from_str(&json_string)
    }

}

/// An object containing all the necessary session data, without the cryptographic signature
#[derive(Debug, Serialize, Deserialize, Insertable, Queryable, Clone)]
#[diesel(table_name = sessions)]
pub struct SessionData {
    pub session_id: Uuid,
    pub user_id: Uuid,
    pub expires_at: SystemTime,
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
