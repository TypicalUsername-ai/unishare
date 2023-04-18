-- Your SQL goes here

CREATE TABLE sessions (
	session_id uuid NOT NULL PRIMARY KEY,
	user_id uuid NOT NULL,
	expires_at timestamp NOT NULL,
	signature text,
	CONSTRAINT fk_user_id 
		FOREIGN KEY (user_id) 
		REFERENCES users(id)
)
