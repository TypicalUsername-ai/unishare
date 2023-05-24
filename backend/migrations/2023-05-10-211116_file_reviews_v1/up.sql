-- Your SQL goes here

CREATE TABLE file_reviews (
    file_id uuid NOT NULL,
	reviewer_id uuid NOT NULL,
	review integer NOT NULL,
	comment text DEFAULT NULL,
	CONSTRAINT fk_file
		FOREIGN KEY (file_id)
		REFERENCES files_data(id),
	CONSTRAINT fk_reviewer
		FOREIGN KEY (reviewer_id)
		REFERENCES users(id),
	PRIMARY KEY (file_id, reviewer_id)
);