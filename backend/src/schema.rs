// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Uuid,
        username -> Text,
        user_email -> Text,
        password_hash -> Text,
    }
}
