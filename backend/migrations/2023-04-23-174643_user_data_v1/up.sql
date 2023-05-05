-- Your SQL goes here

CREATE TABLE users_data (
	user_id uuid NOT NULL PRIMARY KEY,
	pub_files integer NOT NULL DEFAULT 0,
	priv_files integer NOT NULL DEFAULT 0,
	tokens integer NOT NULL DEFAULT 0,
	CONSTRAINT fk_user_id
		FOREIGN KEY (user_id)
		REFERENCES users_auth(id)
);
