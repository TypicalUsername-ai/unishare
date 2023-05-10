-- Your SQL goes here

CREATE TABLE transactions (
    id uuid NOT NULL,
    transaction_type int NOT NULL,
    creator_id uuid NOT NULL,
    buyer_id uuid NOT NULL,
    file_id uuid NOT NULL,
    transaction_time timestamp NOT NULL,
    price integer NOT NULL,
    CONSTRAINT fk_creator
        FOREIGN KEY (creator_id)
        REFERENCES users(id),
    CONSTRAINT fk_buyer
        FOREIGN KEY (buyer_id)
        REFERENCES users(id),
    CONSTRAINT fk_file
        FOREIGN KEY (file_id)
        REFERENCES files_data(id),
    PRIMARY KEY (id)
);
