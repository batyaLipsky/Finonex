CREATE DATABASE revenues;

\c revenues;

CREATE TABLE users_revenue (
    user_id VARCHAR(255) PRIMARY KEY,
    revenue INT
);
