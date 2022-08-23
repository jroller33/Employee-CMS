const inquirer = require("inquirer");
const mysql = require('mysql2');
const util = require('util');
require('console.table');
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'mysqlPass', database: 'cms_db' });
const query = util.promisify(db.query).bind(db);


const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: "What is the employee's first name?",
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: "What is the employee's last name?",
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: "What is the employee's role?",
        choices: [
            //  these roles need to come from db, not hardcoded.
        ],
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: "Who is the employee's manager?",
        choices: [
            // these managers need to come from db, not hardcoded.
        ],
    },
];
const updateEmployeeQuestions = [
    {
        type: 'list',
        name: 'employeeToUpdate',
        message: "Which employee's role do you want to update?",
        choices: [
            // these employees need to come from db, not hardcoded.
        ],
    },
    {
        type: 'list',
        name: 'updateRole',
        message: "Which role do you want to assign the selected employee?",
        choices: [
            // these roles need to come from db, not hardcoded.
        ],
    },
];
async function viewDepts() {
    const str = `SELECT * FROM departments;`;
    const departments = await query(str);
    console.table(departments);
    mainMenu();
}
async function viewRoles() {
    const str = `SELECT * FROM roles;`;
    const roles = await query(str);
    console.table(roles);
    mainMenu();
}
async function viewEmployees() {
    const str = `SELECT * FROM employee`;
    const employees = await query(str);
    console.table(employees);
    mainMenu();
}
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
}
async function addRole() {
    const departments = await query (`SELECT names as name , id as value from departments`)     // 'name' is referring to 'name: roleName' and 'value' refs 'choices: departments'  
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

    function mainMenu() {
        inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a department",
                "Add a role",
                "Add Employee",
                "Update Employee Role",
                "Quit",
                // Bonus:
                // Update Employee Managers
                // View employees by manager.
                // - View employees by department
                // - Delete departments, roles, and employees.
                // - View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
            ],
        }).then(response => {
            if (response.menu === "View All Departments") {
                viewDepts();
            } else if (response.menu === "View All Roles") {
                viewRoles();
            } else if (response.menu === "View All Employees") {
                viewEmployees();
            } else if (response.menu === "Add a department") {
                addDepartment();
            } else if (response.menu === "Add a role") {



            } else if (response.menu === "Add Employee") {
                inquirer.prompt(addEmployeeQuestions).then(response => {
                    const employeeFirstName = response.employeeFirstName;
                    const employeeLastName = response.employeeLastName;
                    const employeeRole = response.employeeRole;
                    const employeeManager = response.employeeManager;

                    // push these to db
                    console.log(`added ${employeeFirstName}, ${employeeLastName}, ${employeeRole} ${employeeManager}to db`);
                    mainMenu();
                });

            } else if (response.menu === "Update Employee Role") {
                inquirer.prompt(updateEmployeeQuestions).then(response => {
                    const employeeToUpdate = response.employeeToUpdate;
                    const updateRole = response.updateRole;

                    // push these to db
                    console.log(`added ${employeeToUpdate}, ${updateRole} to db`);
                    mainMenu();
                });

            } else if (response.menu === "Quit") {
                console.log('bye');
            } else {
                console.log("error in mainMenu() if/else statements");
            }
        });
    };

mainMenu();