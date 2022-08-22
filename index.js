const inquirer = require("inquirer");
const mysql = require('mysql2');
// const Department = require("./lib/Department");


const db = mysql.createConnection(
  {
    host: 'localhost',      
    user: 'root',
    password: 'mysqlPass',  // put in .env
    database: 'cms_db'
  },
  console.log(`Connected to the cms_db database.`)
);

db.query(
    'SELECT * FROM role;',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    //   console.log(fields); // fields contains extra meta data about results, if available
    }
  );

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
        choices: [  // these depts need to come from db, not hardcoded.
        
        ],
    },
];
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
            "Quit"
            // Bonus:
            // Update Employee Managers
            // View employees by manager.
            // - View employees by department
            // - Delete departments, roles, and employees.
            // - View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
        ],
    }).then(response => {
        if (response.menu === "View All Departments") {
            // print out table showing all departments (7 sec in video)
            // db.query




            // let deletedRow;
// db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });
            mainMenu();

        } else if (response.menu === "View All Roles") {
            // print out table with all jobs, what dept it is and salary (14 sec)
            mainMenu();

        } else if (response.menu === "View All Employees") {
            // print out table w all employees 21 sec
            mainMenu();    

        } else if (response.menu === "Add department") {
            inquirer.prompt({
                type: 'input',
                name: 'addDept',
                message: "What is the name of the department?",
            }).then(response => {
                const deptName = response;
                console.log(`Added ${deptName} to database.`);

                // push to db
                mainMenu();
            });

        } else if (response.menu === "Add Role") {
            inquirer.prompt(addRoleQuestions).then(response => {
                const roleName = response.roleName;
                const roleSalary = response.roleSalary;
                const roleDept = response.roleDept;

                // push these to db
                console.log(`added ${roleName}, ${roleSalary}, ${roleDept} to db`);
                mainMenu();
            });

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