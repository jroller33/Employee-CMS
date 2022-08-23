-- to run: >>> SOURCE ./db/schema.sql

DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;
USE cms_db;

CREATE TABLE department (
    id INT,        -- primary key, foreign key: roles(department_id)
    names VARCHAR(30)
);

CREATE TABLE roles (
    id INT,                 -- Primary key, foreign key: employee(role_id)
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,          -- foreign key, primary department(id)
    FOREIGN KEY (department_id) REFERENCES department(id),
    -- ON DELETE SET NULL        -- IS THIS NEEDED???
);

CREATE TABLE employee (
    id INT,             -- primary key, foreign key: employee(manager_id)
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
);
                 
            -- manager_id: foreign key. primary: employee(id)
            -- I think this is only if they don't have a manager_id, then 
            -- it will reference the employee(id). if they do have a manager, then
            -- this should be the manager's id.

            

