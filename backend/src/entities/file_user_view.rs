use diesel::{prelude::*, PgConnection};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use crate::schema::transactions;

use super::{file::File, transaction::{Transaction, TransactionType}, error::UnishareError};

#[derive(Serialize, Deserialize)]
pub struct FileUserView {
    file: File,
    snippet: String,
    transaction: Option<Transaction>,
}

impl FileUserView {
    pub async fn get(file_id: Uuid, user_id: Uuid, db_conn: &mut PgConnection) -> Result<Self, UnishareError> {
        let file = File::by_id(file_id, db_conn).await?;
        let snippet = file.get_snippet().await;
        if file.creator == user_id {
            let ownership = Transaction::new(TransactionType::OWNERSHIP, user_id, file.creator, file.id, file.price);
            Ok(Self {file, snippet, transaction: Some(ownership)})

        } else {
            let transaction = transactions::table
                .filter(transactions::file_id.eq(file_id).and(transactions::buyer_id.eq(user_id)))
                .first::<Transaction>(db_conn)
                .optional()?;
            Ok(Self {file, snippet, transaction})
        }
    }
}