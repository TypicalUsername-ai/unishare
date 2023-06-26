use actix_web::{web, Responder, HttpResponse, get, post};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use diesel::{r2d2::ConnectionManager, PgConnection};
use r2d2::Pool;
use uuid::Uuid;
use diesel::{prelude::*, insert_into};
use crate::schema::reports;
use crate::entities::{error::UnishareError, report::{Report, NewReport, AdminPanelData, ObjectType, State}};
use super::token_middleware::validate_request;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
            web::scope("/reports")
            .service(add_report)
            .service(get_reports)
            .service(accept_report)
            .service(reject_report)
        );
}

type ConnectionPool = Pool<ConnectionManager<PgConnection>>;

#[post("/create")]
async fn add_report(auth: BearerAuth, data: web::Json::<NewReport>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let user = validate_request(auth, &mut db_conn).await?;
    let data_inner = data.into_inner();
    let new_report = Report::create(data_inner, user.user_id);
    let insert_report_op: Report = insert_into(reports::table).values(new_report).get_result(&mut db_conn)?;
    Ok(HttpResponse::Created()
        .json(insert_report_op))
}

#[get("/panel")]
async fn get_reports(auth: BearerAuth, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let user = validate_request(auth, &mut db_conn).await?;
    let file_reports = Report::by_type_state(ObjectType::FILE, State::PENDING, &mut db_conn).await?;
    let user_reports = Report::by_type_state(ObjectType::USER, State::PENDING, &mut db_conn).await?;
    let reports_log = Report::get_report_log(&mut db_conn).await?;
    let panel_data = AdminPanelData::new(file_reports, user_reports, reports_log);
    Ok(HttpResponse::Ok().json(panel_data))
}

#[get("/{report_id}/accept")]
async fn accept_report(auth: BearerAuth, path: web::Path<Uuid>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let user = validate_request(auth, &mut db_conn).await?;
    let report_id = path.into_inner();
    let accepted = Report::accept(report_id, &mut db_conn).await?;
    Ok(HttpResponse::Ok().json(accepted))
}

#[get("/{report_id}/reject")]
async fn reject_report(auth: BearerAuth, path: web::Path<Uuid>, pool: web::Data<ConnectionPool>) -> Result<impl Responder, UnishareError> {
    let mut db_conn = pool.get()?;
    let user = validate_request(auth, &mut db_conn).await?;
    let report_id = path.into_inner();
    let rejected = Report::set_state(report_id, State::REJECTED, &mut db_conn).await?;
    Ok(HttpResponse::Ok().json(rejected))
}