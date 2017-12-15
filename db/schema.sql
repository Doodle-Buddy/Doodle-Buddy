CREATE DATABASE Doodle_db;
USE Doodle_db;

## Table to hold answers to be used as prompts for drawing

CREATE TABLE answers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(15) NOT NULL,
	description varchar(50) NULL,
	PRIMARY KEY (id)
);

## Table to hold all user information, auto-generated user information as well as customized with name and password

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(15) NULL,
	password varchar(15) NULL,
	PRIMARY KEY (id)
);


