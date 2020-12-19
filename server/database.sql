CREATE DATABASE jwt-registration;

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT 
  uuid_generate_v4(),
  user_name VARCHAR(225) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

-- create fake user
INSERT INTO users (user_name, user_email, user_password) VALUES ('amitay', 'amitay@gmail.com', 'ami12345');