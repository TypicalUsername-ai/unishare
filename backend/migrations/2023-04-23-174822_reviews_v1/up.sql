-- Your SQL goes here

CREATE TABLE user_reviews (
	reviewed_id uuid NOT NULL,
	reviewer_id uuid NOT NULL,
	review integer NOT NULL,
	comment text DEFAULT NULL,
	CONSTRAINT fk_reviewed
		FOREIGN KEY (reviewed_id)
		REFERENCES users_auth(id),
	CONSTRAINT fk_reviewer
		FOREIGN KEY (reviewer_id)
		REFERENCES users_auth(id),
	PRIMARY KEY (reviewed_id, reviewer_id)
);
