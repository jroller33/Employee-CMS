INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "t1", 10000, 3),
       (2, "t2", 50000, 2),
       (3, "t3", 88000, 1);

INSERT INTO department (id, names)
VALUES (1, "Legal"),
       (2, "Accounting"),
       (3, "Sales"); 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Steve", "White", 1, 5),
       (2, "Laura", "Red", 3, 4),
       (3, "Alex", "Blue", 2, 3);
