use std::time::SystemTime;

use diesel::{Insertable, Queryable};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::schema::transactions;

#[derive(Serialize, Deserialize, Insertable, Queryable)]
#[diesel(table_name = transactions)]
pub struct Transaction {
    id: Uuid,
    transaction_type: i32,
    creator_id: Uuid,
    buyer_id: Uuid,
    file_id: Uuid,
    transaction_time: SystemTime,
    price: i32,
}

impl Transaction {
    pub fn new (ttype: TransactionType, buyer_id: Uuid, creator_id: Uuid, file_id: Uuid, price: i32) -> Self {
        Self { id: Uuid::new_v4(), transaction_type: ttype.to_i32(), creator_id, buyer_id, file_id, transaction_time: SystemTime::now(), price }
    }
}

pub enum TransactionType {
    PURCHASE,
}

impl From<i32> for TransactionType {
    fn from(value: i32) -> Self {
        match value {
            1 => TransactionType::PURCHASE,
            _ => unimplemented!()
        }
    }
}

impl TransactionType {

    pub fn to_i32(self) -> i32 {
        match self {
            TransactionType::PURCHASE => 1,
        }
    }
}