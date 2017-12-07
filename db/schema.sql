CREATE DATABASE Doodle_db;
USE Doodle_db;

CREATE TABLE answers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(15) NOT NULL,
	description varchar(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE cats
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	sleepy BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);