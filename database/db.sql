-- to create a new database
CREATE DATABASE crudappdb;

-- to use database
use crudappdb;

-- creating a new table
CREATE TABLE IF NOT EXISTS restaurant (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  restaurantName VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  review VARCHAR(255),
  rating VARCHAR(255)
);

-- to show all tables
show tables;

-- to describe table
describe restaurant;

