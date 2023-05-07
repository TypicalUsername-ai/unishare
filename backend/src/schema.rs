// @generated automatically by Diesel CLI.

diesel::table! {
    files_content (id) {
        id -> Uuid,
        content -> Bytea,
    }
}

diesel::table! {
    files_data (id) {
        name -> Text,
        id -> Uuid,
        creator -> Uuid,
        created_time -> Timestamp,
        last_edit_time -> Timestamp,
        price -> Int4,
        rating -> Numeric,
        primary_tag -> Nullable<Text>,
        secondary_tag -> Nullable<Text>,
        available -> Bool,
    }
}

diesel::table! {
    purchases (id) {
        id -> Uuid,
        creator_id -> Uuid,
        buyer_id -> Uuid,
        file_id -> Uuid,
        purchase_time -> Timestamp,
        price -> Int4,
    }
}

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

diesel::joinable!(files_content -> files_data (id));
diesel::joinable!(purchases -> files_data (file_id));
diesel::joinable!(purchases -> users (buyer_id));

diesel::allow_tables_to_appear_in_same_query!(
    files_content,
    files_data,
    purchases,
    sessions,
    user_reviews,
    users,
    users_data,
);
