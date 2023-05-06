-- Your SQL goes here

CREATE VIEW users AS
    SELECT user_id, username, user_email, confirmed, tokens, pub_files, priv_files, AVG(review) as avg_rating 
    FROM users_auth INNER JOIN users_data ON users_data.user_id = users_auth.id 
    LEFT OUTER JOIN user_reviews ON user_reviews.reviewed_id = users_auth.id 
    GROUP BY user_id, username, user_email, confirmed, tokens, pub_files, priv_files;
