const inquirer = require('inquirer')
const express = require('express')
const mysql = require('mysql2')
require('console.table');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Redpopsicle2$',
        database: 'company_db'
    },
    console.log('Connected to database')
);

function mainMenu() {
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'starting_choice',
            choices: ['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
        },
    ])
    .then((response) => {
        if (response.starting_choice === 'View all departments') {
            viewDepartments();
            
    } else if(response.starting_choice === 'View all roles') {
            viewRoles();

    } else if(response.starting_choice === 'View all employees') {
            viewEmployees();

    } else if(response.starting_choice === 'Add a department') {
            addDepartment();

    } else if(response.starting_choice === 'Add a role') {
            addRole();

    } else if(response.starting_choice === 'Add an employee') {
            addEmployee();

    } else {
        updateRole();
    }})};

    mainMenu();

    function viewDepartments() {
        console.log('Viewing all departments');
        db.query(`SELECT * FROM department`, function (err, results) {
            console.table(results);
        });
        mainMenu();
    };

    function viewRoles() {
        console.log('Viewing all roles');
        db.query(`SELECT * FROM roles`, function (err, results) {
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
                name: 'addDepartment'
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO department (id, name) VALUES (,${response.addDepartment})`, function (err, results) {console.log(results, 'Added successfully!')})
            mainMenu();
        })
    }

    function addRole() {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name the role you wish to add',
                name: 'addRole'
            },
            {
                type: 'input',
                message: 'Enter the salary of the role',
                name: 'salary'
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO role (id, title, salary) VALUES (, ${response.addRole}, ${response.salary})`, function (err, results) {console.log(results, 'Added successfully!')})
            mainMenu()
        })
    }

    function addEmployee() {
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
        .then((response) =>
        {
            db.query(`INSERT INTO employee (id, first_name, last_name) VALUES (, ${response.firstName}, ${response.lastName})`, function (err, results) {
                console.log(results, 'Added successfully!')
            })
            
            mainMenu();
        })
    }

    function updateRole() {
        inquirer
        .prompt([
            {
                type: 'input',
                message: ''
            }
        ])
    }
