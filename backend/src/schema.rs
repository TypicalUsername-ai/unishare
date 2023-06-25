// @generated automatically by Diesel CLI.

diesel::table! {
    file_reviews (file_id, reviewer_id) {
        file_id -> Uuid,
        reviewer_id -> Uuid,
        review -> Int4,
        comment -> Nullable<Text>,
    }
}

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
        rating -> Float4,
        primary_tag -> Nullable<Text>,
        secondary_tag -> Nullable<Text>,
        available -> Bool,
    }
}

diesel::table! {
    reports (id) {
        id -> Uuid,
        reporter_id -> Uuid,
        object_id -> Uuid,
        object_type -> Int4,
        reason -> Text,
        state -> Int4,
        created_time -> Timestamp,
        reviewed_time -> Nullable<Timestamp>,
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
    transactions (id) {
        id -> Uuid,
        transaction_type -> Int4,
        creator_id -> Uuid,
        buyer_id -> Uuid,
        file_id -> Uuid,
        transaction_time -> Timestamp,
        price -> Int4,
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
diesel::joinable!(reports -> users (reporter_id));
diesel::joinable!(transactions -> users (buyer_id));

diesel::allow_tables_to_appear_in_same_query!(
    file_reviews,
    files_content,
    files_data,
    reports,
    sessions,
    transactions,
    user_reviews,
    users,
    users_data,
);
