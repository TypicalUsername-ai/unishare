use std::time::SystemTime;
use crate::schema::transactions;
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use diesel::{Insertable, Queryable, PgConnection, QueryDsl, expression::is_aggregate::No};
use super::error::UnishareError;
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
        let user_file_transactions = transactions::table
            .filter(transactions::buyer_id.eq(user_id.clone())
                .and(transactions::file_id.eq(file_id.clone())))
            .get_result::<Vec<Transaction>>(db_conn)?;
        match user_file_transactions.last() {
            Some(transaction) => {
                if transaction.transaction_type.into() == TransactionType::PURCHASE {
                    Ok(true)
                } else {
                    Ok(false)
                }
            }
            None => Ok(false)
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