const inquirer = require("inquirer");
const mysql = require('mysql2');
const util = require('util');
require('console.table');
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'mysqlPass', database: 'cms_db' });
const query = util.promisify(db.query).bind(db);

async function viewDepts() {
    const departments = await query(`SELECT * FROM departments;`);
    console.log('\n');
    console.table(departments);
    mainMenu();
};

async function viewRoles() {
    const roles = await query(`SELECT * FROM roles;`);
    console.log('\n');
    console.table(roles);
    mainMenu();
};

async function viewEmployees() {
    const employees = await query(`SELECT * FROM employee;`);
    console.log('\n');
    console.table(employees);
    mainMenu();
};

async function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'addDept',
        message: "What is the name of the department?",
    }).then(async response => {
        const str = `INSERT INTO departments (names) VALUES (?)`
        const departments = await query(str, [response.addDept]);
        viewDepts();
    });
};

async function addRole() {
    const departments = await query(`SELECT names as name , id as value from departments`);     // 'name' is referring to 'name: roleName' and 'value' refs 'choices: departments'  
    const addRoleQuestions = [
        {
            type: 'input',
            name: 'roleName',
            message: "What is the name of the role?",
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: "What is the salary of the role?",
        },
        {
            type: 'list',
            name: 'roleDept',
            message: "Which department does the role belong to?",
            choices: departments
        }
    ];
    inquirer.prompt(addRoleQuestions).then(async response => {
        const roleName = response.roleName;
        const roleSalary = response.roleSalary;
        const roleDept = response.roleDept;

        const str = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
        const role = await query(str, [roleName, roleSalary, roleDept]);
        viewRoles();
    });
};

async function addEmployee() {
    const getManagers = await query(`SELECT * FROM employee WHERE manager_id IS NULL`);
    const managers = getManagers.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id }));
    managers.push({ name: "None" });
    const roles = await query(`SELECT title as name , id as value from roles`);
    const addEmployeeQuestions = [
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
        },
        {
            type: 'list',
            name: 'role_id',
            message: "What is the employee's role?",
            choices: roles
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: managers
        },
    ];
    inquirer.prompt(addEmployeeQuestions).then(async response => {
        const testManager = (response) => {
            if (response.manager_id === "None") {
                response.manager_id = null;
            } else {
                return response.manager_id;
            }
        }
        const employee = await query(`INSERT INTO employee SET ?`,
            {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: response.role_id,
                manager_id: testManager(response)
            }
        )
        // console.log(`employee added to db`);
        viewEmployees();
    });
};

async function updateEmployeeRole() {
    const employees = await query(`SELECT * FROM employee`);
    const roles = await query(`SELECT title as name , id as value from roles`);
    const updateEmployeeQuestions = [
        {
            type: 'list',
            name: 'employee_id',
            choices: employees.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id })),
            message: 'Which employee do you want to update?',
        },
        {
            type: 'list',
            name: 'role_id',
            choices: roles,
            message: "What is the employee's new role?"
        }
    ];
    inquirer.prompt(updateEmployeeQuestions).then(async response => {
        const updatedEmployee = await query(`UPDATE cms_db.employee SET ? WHERE ?`,
            [
                {
                    role_id: response.role_id,
                },
                {
                    id: response.employee_id,
                }
            ],
        );
        viewEmployees();
    });
};

function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee's Role",
            "Clear Console",
            "Quit"
        ],
    }).then(response => {
        if (response.menu === "View All Departments") {
            viewDepts();
        } else if (response.menu === "View All Roles") {
            viewRoles();
        } else if (response.menu === "View All Employees") {
            viewEmployees();
        } else if (response.menu === "Add a Department") {
            addDepartment();
        } else if (response.menu === "Add a Role") {
            addRole();
        } else if (response.menu === "Add an Employee") {
            addEmployee();
        } else if (response.menu === "Update an Employee's Role") {
            updateEmployeeRole();
        } else if (response.menu === "Clear Console") {
            console.clear();
            mainMenu();
        } else if (response.menu === "Quit") {
            console.log('Bye');
            process.exit(0);
        } else {
            console.log("error in mainMenu() if/else statements");
        }
    });
};

mainMenu();