-- Your SQL goes here

CREATE TABLE reports (
    id uuid NOT NULL,
    reporter_id uuid NOT NULL,
    object_id uuid NOT NULL,
    object_type int NOT NULL,
    reason text NOT NULL,
    state int NOT NULL,
    created_time timestamp NOT NULL,
    reviewed_time timestamp DEFAULT NULL,
    CONSTRAINT fk_reporter
        FOREIGN KEY (reporter_id)
        REFERENCES users(id),
    PRIMARY KEY (id)
);