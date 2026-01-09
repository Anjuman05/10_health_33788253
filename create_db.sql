CREATE DATABASE IF NOT EXISTS health;
USE health;

-- drops tables if they already exist
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS users;

-- creates user table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- create activities table
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    activity VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    activity_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users(username)
);