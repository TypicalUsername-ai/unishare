use crate::schema::reports;
use uuid::Uuid;
use serde::{Serialize, Deserialize};
use diesel::{Insertable, Queryable, PgConnection};
use diesel::prelude::*;
use super::error::UnishareError;
use super::user_data::User;
use std::time::SystemTime;
use crate::entities::file::File;

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize)]
#[diesel(table_name = reports)]
pub struct Report {
    pub id: Uuid,
    pub reporter_id: Uuid,
    pub object_id: Uuid,
    pub object_type: i32,
    pub reason: String,
    pub state: i32,
    pub created_time: SystemTime,
    pub reviewed_time: Option<SystemTime>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewReport {
    pub object_id: Uuid,
    pub object_type: ObjectType,
    pub reason: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AdminPanelData {
    pub file_reports: Vec<Report>,
    pub user_reports: Vec<Report>,
    pub report_log: Vec<Report>,
}

impl Report {
    pub fn new (reporter_id: Uuid, object_id: Uuid, obj_type: ObjectType, reason: String) -> Self {
        Self { id: Uuid::new_v4(), reporter_id, object_id, object_type: obj_type.to_i32(), reason, state: State::PENDING.to_i32(), created_time: SystemTime::now(), reviewed_time: None }
    }
    
    pub fn create (data: NewReport, reporter_id: Uuid) -> Self {
        Report::new(reporter_id, data.object_id, data.object_type, data.reason)
    }

    pub async fn by_type_state(obj_type: ObjectType, state: State, db_conn: &mut PgConnection) -> Result<Vec<Report>, UnishareError> {
        let reports_opt: Option<Vec<Report>> = reports::table
            .filter(reports::object_type.eq(obj_type.clone().to_i32())
                .and(reports::state.eq(state.clone().to_i32())))
            .load(db_conn).optional()?;
        if let Some(reports) = reports_opt {
            Ok(reports)
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("Report {} {}", obj_type.to_string(), state.to_string()) })
        }
    }

    pub async fn get_report_log(db_conn: &mut PgConnection) -> Result<Vec<Report>, UnishareError> {
        let log_opt: Option<Vec<Report>> = reports::table
            .filter(reports::state.ne(State::PENDING.to_i32()))
            .limit(20)
            .load(db_conn).optional()?;
        if let Some(log) = log_opt {
            Ok(log)
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("Report not {}", State::PENDING.to_string()) })
        }
    }

    pub async fn accept(report_id: Uuid, db_conn: &mut PgConnection) -> Result<Report, UnishareError> {
        let report_opt: Option<Report> = reports::table
            .filter(reports::id.eq(report_id.clone()))
            .get_result(db_conn).optional()?;
        if let Some(report) = report_opt {
            match ObjectType::from(report.object_type) {
                ObjectType::FILE => {
                    File::delete_file(report.object_id.clone(), db_conn).await?;
                },
                ObjectType::USER => {
                    User::remove_user(report.object_id.clone(), db_conn).await?;
                }
            }
            let update_report = Report::set_state(report_id, State::ACCEPTED, db_conn).await?;
            Ok(update_report)
        } else {
            Err(UnishareError::ResourceNotFound { resource: format!("Report {}", report_id) })
        }
    }

    pub async fn set_state(report_id: Uuid, state: State, db_conn: &mut PgConnection) -> Result<Report, UnishareError> {
        let update_report: Report = diesel::update(reports::table)
            .filter(reports::id.eq(report_id.clone()))
            .set((
                reports::state.eq(state.to_i32()),
                reports::reviewed_time.eq(SystemTime::now())
            ))
            .get_result(db_conn)?;
        Ok(update_report)
    }
}

impl NewReport {
    pub fn new (object_id: Uuid, obj_type: ObjectType, reason: String) -> Self {
        Self {object_id, object_type: obj_type, reason}
    }
}

impl AdminPanelData {
    pub fn new (file_reports: Vec<Report>, user_reports: Vec<Report>, report_log: Vec<Report>) -> Self {
        Self {file_reports, user_reports, report_log}
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum ObjectType {
    USER,
    FILE
}

impl From<i32> for ObjectType {
    fn from(value: i32) -> Self {
        match value {
            1 => ObjectType::USER,
            2 => ObjectType::FILE,
            _ => unimplemented!()
        }
    }
}

impl ObjectType {

    pub fn to_i32(self) -> i32 {
        match self {
            ObjectType::USER => 1,
            ObjectType::FILE => 2,
        }
    }

    pub fn to_string(self) -> String {
        match self {
            ObjectType::USER => "User".to_owned(),
            ObjectType::FILE => "File".to_owned(),
        }
    }
}

#[derive(Clone)]
pub enum State {
    PENDING,
    ACCEPTED,
    REJECTED
}

impl From<i32> for State {
    fn from(value: i32) -> Self {
        match value {
            1 => State::PENDING,
            2 => State::ACCEPTED,
            3 => State::REJECTED,
            _ => unimplemented!()
        }
    }
}

impl State {

    pub fn to_i32(self) -> i32 {
        match self {
            State::PENDING => 1,
            State::ACCEPTED => 2,
            State::REJECTED => 3,
        }
    }

    pub fn to_string(self) -> String {
        match self {
            State::PENDING => "Pending".to_owned(),
            State::ACCEPTED => "Accepted".to_owned(),
            State::REJECTED => "Rejected".to_owned(),
        }
    }
}
