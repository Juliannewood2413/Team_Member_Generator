DROP DATABASE IF EXISTS employee_tracker_DB;

CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(30)
);

INSERT INTO department (name)
VALUE ("Sales"),
("Engineering"),
("Finance"),
("Legal");

SELECT * FROM department;


CREATE TABLE role (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 65000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 50000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Engineer", 900000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Account Manager", 120000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 80000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 150000, 4);

SELECT * FROM role;

CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id)
);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE 
("Kevin", "Sullivan", 1, null),
("Judy", "Jones", 1, 1),
("Maureen", "Porter", 2, null),
("Daniel", "Beezley", 2, 2),
("David", "Gillette", 3, null),
("Chris", "Homer", 3, 3),
("Barbara", "Archuleta", 4,  null);


SELECT * FROM employee;



