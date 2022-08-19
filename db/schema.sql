-- to run: >>> SOURCE ./db/schema.sql

DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;
USE cms_db;
CREATE TABLE department {
    id INT,         -- department_id in role table
    name VARCHAR(30),   
};
CREATE TABLE role{
    id INT,         -- role_id in employee table
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
};

CREATE TABLE employee{
    id INT, -- ??? in employee table manager_id is linked to id
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,  -- ??? in employee table manager_id is linked to id
};
