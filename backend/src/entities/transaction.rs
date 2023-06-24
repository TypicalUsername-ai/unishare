use std::time::SystemTime;
use crate::schema::transactions;
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use diesel::{Insertable, Queryable, PgConnection, QueryDsl, expression::is_aggregate::No};
use super::{error::UnishareError, file::{self, File}};
use diesel::prelude::*;

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize)]
#[diesel(table_name = transactions)]
pub struct Transaction {
    pub id: Uuid,
    pub transaction_type: i32,
    pub creator_id: Uuid,
    pub buyer_id: Uuid,
    pub file_id: Uuid,
    pub transaction_time: SystemTime,
    pub price: i32
}

impl Transaction {
    pub fn new (ttype: TransactionType, buyer_id: Uuid, creator_id: Uuid, file_id: Uuid, price: i32) -> Self {
        Self { id: Uuid::new_v4(), transaction_type: ttype.to_i32(), creator_id, buyer_id, file_id, transaction_time: SystemTime::now(), price }
    }
    
    // Simple function checking whether a user with provided 'Uuid' owns the file identified by the provided `Uuid`
    pub async fn user_owns_file(file_id: Uuid, user_id: Uuid, db_conn: &mut PgConnection) -> Result<bool, UnishareError> {
        let user_file_transactions_opt: Option<Vec<Transaction>> = transactions::table
            .filter(transactions::buyer_id.eq(user_id.clone())
                .and(transactions::file_id.eq(file_id.clone())))
            .load(db_conn).optional()?;
        if let Some(user_file_transactions) = user_file_transactions_opt {
            match user_file_transactions.last() {
                Some(transaction) => {
                    if transaction.transaction_type == TransactionType::PURCHASE.to_i32() {
                        Ok(true)
                    } else {
                        Ok(false)
                    }
                }
                None => Ok(false)
            }
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("Transaction file: {} user: {}", file_id, user_id) })
        }
    }

    pub async fn get_user_transactions(user_id: Uuid, db_conn: &mut PgConnection) -> Result<Vec<Transaction>, UnishareError> {
        let user_transactions_opt: Option<Vec<Transaction>> = transactions::table
            .filter(transactions::buyer_id.eq(user_id.clone()))
            .load(db_conn).optional()?;
        if let Some(user_transactions) = user_transactions_opt {
            Ok(user_transactions)
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("Transaction user: {}", user_id) })
        }
    }

    pub async fn get_user_files(user_id: Uuid, db_conn: &mut PgConnection) -> Result<Vec<File>, UnishareError> {
        let user_files_opt: Option<Vec<Uuid>> = transactions::table
            .filter(transactions::buyer_id.eq(user_id.clone())
                .and(transactions::transaction_type.eq(TransactionType::PURCHASE.to_i32())))
            .select(transactions::file_id)
            .load(db_conn).optional()?;
        let mut files = Vec::<File>::new();
        if let Some(user_files) = user_files_opt {
            for file_id in user_files.into_iter() {
                if Transaction::user_owns_file(file_id, user_id, db_conn).await? {
                    files.push(File::by_id(file_id, db_conn).await?);
                } else {
                    continue;
                }
            }
            Ok(files)
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("Transaction user: {}", user_id) })
        }
    }
}

// Enumeration of transaction types
// more types to be added later
pub enum TransactionType {
    PURCHASE,
    REFUND
}

impl From<i32> for TransactionType {
    fn from(value: i32) -> Self {
        match value {
            1 => TransactionType::PURCHASE,
            2 => TransactionType::REFUND,
            _ => unimplemented!()
        }
    }
}

impl TransactionType {

    pub fn to_i32(self) -> i32 {
        match self {
            TransactionType::PURCHASE => 1,
            TransactionType::REFUND => 2,
        }
    }
}