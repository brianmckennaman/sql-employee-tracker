// dependencies
const inquirer = require('inquirer')
const express = require('express')
const mysql = require('mysql2')
require('console.table');

// allow express to run
const app = express();

// middleware to parse inputs
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to MySql
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Redpopsicle2$',
        database: 'company_db'
    },
    console.log('Connected to database')
);

// prompt for all database choices
function mainMenu() {
    console.log(`\n\n\n========================`)
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'starting_choice',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
            },
        ])
        .then((response) => {
            console.log(`\n\n==========\n`)

            if (response.starting_choice === 'View all departments') {
                viewDepartments();

            } else if (response.starting_choice === 'View all roles') {
                viewRoles();

            } else if (response.starting_choice === 'View all employees') {
                viewEmployees();

            } else if (response.starting_choice === 'Add a department') {
                addDepartment();

            } else if (response.starting_choice === 'Add a role') {
                addRole();

            } else if (response.starting_choice === 'Add an employee') {
                addEmployee();

            } else {
                updateEmployee();
            }
        })
};

// run function
mainMenu();


function viewDepartments() {
    console.log('Viewing all departments');
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(`\n\n===============\n`)
        console.table(results);
    });
    mainMenu();
};

function viewRoles() {
    console.log('Viewing all roles');
    db.query(`SELECT roles.id, roles.title, roles.salary, department.name FROM roles JOIN department ON roles.department_id = department.id`, function (err, results) {
        console.table(results);
    });
    mainMenu();
}

function viewEmployees() {
    console.log('Viewing all employees');
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.table(results);
    });
    mainMenu();
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name the department you wish to add',
                name: 'name'
            }
        ])
        .then((response) => {
            db.execute(`INSERT INTO department (name) VALUES (?)`, [response.name], function (err, results) {
                if (err) { console.log(err) }
                else {
                    console.log("Inserted!")
                    console.log(results)
                }
            })
            mainMenu();
        })
}

async function addRole() {

    var departmentChoices = await db.promise().query(`SELECT * FROM department`);
    var departments = departmentChoices[0]

    var data = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'Name the role you wish to add',
                    name: 'name'
                },
                {
                    type: 'input',
                    message: 'Enter the salary of the role',
                    name: 'salary'
                },
                {
                    type: 'list',
                    message: 'To which department will he/she/they belong?',
                    name: 'dept',
                    choices: departments
                }
            ])

     console.log(data)

     console.log(data.dept)

     var correctDepartment = departments.filter(function(department) {
        if(department.name === data.dept){
            return department.id
        }
     })

     console.log(correctDepartment[0].id)

     db.execute(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [data.name, data.salary, correctDepartment[0].id], function (err, results) {
        if (err) { console.log(err) }
        else {
            console.log("Inserted!")
            console.log(results)
        }
    })
    mainMenu()   
}


async function addEmployee() {
    var managers = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee WHERE manager_id IS NULL ')
     console.log(managers[0])
    var data = await inquirer.prompt([{
        type: 'list',
        message: 'To  department wilwhichl he/she/they belong?',
        name: 'dept',
        choices: managers[0]
    }])
     return console.log(data)


    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the first name of the employee',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'Enter the last name of the employee',
                name: 'lastName'
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO employee (id, first_name, last_name) VALUES (, ${response.firstName}, ${response.lastName})`, function (err, results) {
                console.log(results, 'Added successfully!')
            })

            mainMenu();
        })
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Choose the employee to update',
                name: 'chooseEmployee',
                choices: `db.query(SELECT employee_name FROM employee)`

            }
        ])
}
