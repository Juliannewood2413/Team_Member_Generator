DROP DATABASE IF EXISTS employee_tracker_DB;

CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
first_name VARCHAR(30),
last_name VARCHAR(30),
title VARCHAR(30),
department VARCHAR(30),
salary INT 
-- role_id INT, -- foreign key
-- manager_id INT
);

 INSERT INTO employee (first_name, last_name, title, department, salary)
VALUE 
("Kevin", "Sullivan", "Sales Lead", "Sales", 65000),
("Judy", "Jones", "Salesperson", "Sales", 55000),
("Maureen", "Porter", "Lead Engineer", "Engineering", 100000),
("Daniel", "Beezley", "Software Engineer", "Engineering", 90000),
("David", "Gillette", "Account Manager", "Finance", 120000),
("Chris", "Homer", "Accountant", "Finance", 80000),
("Barbara", "Archuleta", "Lawyer", "Legal", 150000);

SELECT * FROM employee;

CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30),
department VARCHAR(30),
salary INT
);

INSERT INTO roles (title, department, salary)
VALUES ("Sales Lead", "Sales", 65000),
("Salesperson", "Sales", 55000),
("Lead Engineer", "Engineering", 100000),
("Software Engineer", "Engineering", 90000),
("Account Manager", "Finance", 120000),
("Accountant", "Finance", 80000),
("Lawyer", "Legal", 150000);

SELECT * FROM roles;

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
department VARCHAR(30)
);

INSERT INTO department (department)
VALUE ("Sales"),
("Engineering"),
("Finance"),
("Legal");

SELECT * FROM department;




