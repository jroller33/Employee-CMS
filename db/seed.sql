INSERT INTO departments (names)
VALUES ("Sales"),
       ("Warehouse"),
       ("Accounting"),
       ("Human Resources"),
       ("Customer Service"),
       ("Management");

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", 50000, 1),
       ("Warehouse", 30000, 2),
       ("Accountant", 60000, 3),
       ("HR", 80000, 4),
       ("Receptionist", 40000, 5),
       ("Regional Manager", 100000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Dwight", "Schrute", 1),
       ("Darryl", "Philbin", 2),
       ("Angela", "Martin", 3),
       ("Michael", "Scott", 6),
       ("Jim", "Halpert", 1),
       ("Stanley", "Hudson", 1),
       ("Phyllis", "Vance", 1),
       ("Roy", "Anderson", 2),
       ("Oscar", "Nunez", 3),
       ("Kevin", "Malone", 3),
       ("Toby", "Flenderson", 4),
       ("Pam", "Beesly", 5);

UPDATE employee set manager_id = 1 where id = 5;
UPDATE employee set manager_id = 1 where id = 6;
UPDATE employee set manager_id = 1 where id = 7;
UPDATE employee set manager_id = 2 where id = 8;
UPDATE employee set manager_id = 3 where id = 9;
UPDATE employee set manager_id = 3 where id = 10;
UPDATE employee set manager_id = 4 where id = 11;
UPDATE employee set manager_id = 4 where id = 12;
UPDATE employee set manager_id = 4 where id = 1;
UPDATE employee set manager_id = 4 where id = 2;
UPDATE employee set manager_id = 4 where id = 3;
