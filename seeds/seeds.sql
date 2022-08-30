INSERT INTO departments (names)
VALUES ("Dept1"),
       ("Dept2"),
       ("Dept3"); 

INSERT INTO roles (title, salary, department_id)
VALUES ("title1", 10000, 1),
       ("title2", 10000, 1),
       ("title3", 10000, 1);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("fname1", "lname1", 1),
       ("fname2", "lname2", 2),
       ("fname3", "lname3", 3);

UPDATE employee set manager_id = 1 where id = 2;
UPDATE employee set manager_id = 3 where id = 1;


