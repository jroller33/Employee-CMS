INSERT INTO departments (names)
VALUES ("Legal"),
       ("Accounting"),
       ("Sales"); 

INSERT INTO roles (title, salary, department_id)
VALUES ("t1", 10000, 3),
       ("t2", 50000, 2),
       ("t3", 88000, 1);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Steve", "White", 1),
       ("Laura", "Red", 3),
       ("Alex", "Blue", 2);

UPDATE employee set manager_id = 1 where id = 2;
UPDATE employee set manager_id = 3 where id = 1;


