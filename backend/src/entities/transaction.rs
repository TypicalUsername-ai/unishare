use crate::schema::transactions;
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use diesel::{Insertable, Queryable};

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize)]
#[diesel(table_name = transactions)]
pub struct Transaction {
    pub id: Uuid,
    pub transaction_type: TransactionType,
    pub creator_id: Uuid,
    pub buyer_id: Uuid,
    pub file_id: Uuid,
    pub transaction_time: SystemTime,
    pub price: i32
}

// Enumeration of transaction types
// more types to be added later
pub enum TransactionType {
    purchase
}

impl Transaction {
    
    // Simple function checking whether a user with provided 'Uuid' owns the file identified by the provided `Uuid`
    pub async fn user_owns_file(file_id: Uuid, user_id: Uuid, db_conn: &mut PgConnection) -> Result<bool, UnishareError> {
        let user_is_owner = transactions::table
            .filter(transactions::buyer_id.eq(user_id.clone())
                .and(transactions::file_id.eq(file_id.clone())))
                .and(transactions::transaction_type.eq(TransactionType::purchase))
            .first::<bool>(db_conn)?;
        Ok(user_is_owner)
    }
}
