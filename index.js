const inquirer = require("inquirer");
// const Department = require("./lib/Department");

addRoleQuestions = [
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
        type: 'input',
        name: 'managerEmail',
        message: "What is the manager's email address?",
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: "What is the manager's office number?",
    }
]


function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add department",
            "Quit"            
        ],
    }).then(response => {
        if (response.menu === "View All Employees") {
            // print out table w all employees 21 sec
            mainMenu();

        } else if (response.menu === "Add Employee") {

        } else if (response.menu === "Update Employee Role") {

        } else if (response.menu === "View All Roles") {
            // print out table with all jobs, what dept it is and salary (14 sec)
            mainMenu();

        } else if (response.menu === "Add Role") {
            inquirer.prompt(addRoleQuestions).then(response => {
                const roleName = response;
                console.log(`Added ${roleName}`);
            })

        } else if (response.menu === "View All Departments") {
            // print out table showing all departments (7 sec in video)
            mainMenu();

        } else if (response.menu === "Add department") {
            inquirer.prompt({
                type: 'input',
                name: 'addDept',
                message: "What is the name of the department?",
            }).then(response => {
                const deptName = response;
                console.log(`Added ${deptName} to database.`);
                mainMenu();
            })

        } else if (response.menu === "Quit") {
            console.log('bye');
        } else {
            console.log("error in mainMenu() if/else statements");
        }
    });
};

mainMenu();