-- Your SQL goes here
-- basic table for user auth

CREATE TABLE users (
	id uuid PRIMARY KEY,
	username TEXT NOT NULL,
	user_email TEXT NOT NULL,
	password_hash TEXT NOT NULL,
	confirmed BOOLEAN NOT NULL DEFAULT false
);
