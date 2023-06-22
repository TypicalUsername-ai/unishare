-- Your SQL goes here

CREATE TABLE files_data (
    name text NOT NULL,
    id uuid NOT NULL,
    creator uuid NOT NULL,
    created_time timestamp NOT NULL,
    last_edit_time timestamp NOT NULL,
    price integer NOT NULL,
    rating real NOT NULL DEFAULT 0,
    primary_tag text DEFAULT NULL,
    secondary_tag text DEFAULT NULL,
    available boolean NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_creator
        FOREIGN KEY (creator)
        REFERENCES users(id),
    PRIMARY KEY (id)
);
