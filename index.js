const inquirer = require("inquirer");

function mainMenu() {
    inquirer.createPromptModule({
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

        } else if (response.menu === "View All Departments") {
            // print out table showing all departments (7 sec in video)
            mainMenu();

        } else if (response.menu === "Add department") {
            
        } else if (response.menu === "Quit") {

        } else {
            console.log("error in mainMenu() if/else statements");
        }
    })
}