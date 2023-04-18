// @generated automatically by Diesel CLI.

diesel::table! {
    sessions (session_id) {
        session_id -> Uuid,
        user_id -> Uuid,
        expires_at -> Timestamp,
    }
}

diesel::table! {
    users (id) {
        id -> Uuid,
        username -> Text,
        user_email -> Text,
        password_hash -> Text,
    }
}

diesel::joinable!(sessions -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    sessions,
    users,
);
