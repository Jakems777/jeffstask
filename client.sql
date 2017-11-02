

DROP DATABASE IF EXISTS client;
CREATE DATABASE client;

\c client;

CREATE TABLE client (
  ID SERIAL PRIMARY KEY,
  phone VARCHAR,
  email VARCHAR,
  json json

);

INSERT INTO client (phone, email, json)
  VALUES ('4fda80c776272a24631fb655a6', 'random@gmail.com', '{"Jeff":"random"}') ;