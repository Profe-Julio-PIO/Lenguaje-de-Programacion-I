CREATE DATABASE firstapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    email TEXT NOT NULL
);

INSERT INTO users (name, email) VALUES 
    ('Julio Castaño', 'jcastanob@pio.edu.co'),
    ('Maria Salamanca', 'mjsalamanca@pio.edu.co');