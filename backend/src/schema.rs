// @generated automatically by Diesel CLI.

diesel::table! {
    sessions (session_id) {
        session_id -> Uuid,
        user_id -> Uuid,
        expires_at -> Timestamp,
    }
}

diesel::table! {
    user_reviews (reviewed_id, reviewer_id) {
        reviewed_id -> Uuid,
        reviewer_id -> Uuid,
        review -> Int4,
        comment -> Nullable<Text>,
    }
}

diesel::table! {
    users (id) {
        id -> Uuid,
        username -> Text,
        user_email -> Text,
        password_hash -> Text,
        confirmed -> Bool,
    }
}

diesel::table! {
    users_data (user_id) {
        user_id -> Uuid,
        pub_files -> Int4,
        priv_files -> Int4,
        tokens -> Int4,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    sessions,
    user_reviews,
    users,
    users_data,
);
