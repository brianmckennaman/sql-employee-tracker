const inquirer = require('inquirer')
const express = require('express')
const mysql = require('mysql2')
const consoleTable = require('console.table')

const PORT = process.env.PORT || 3001;
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
            db.query(`SELECT * FROM departments`)
            mainMenu();
            
    } else if(response.starting_choice === 'View all roles') {
            db.query(`SELECT * FROM roles`)
            mainMenu();

    } else if(response.starting_choice === 'View all employees') {
            db.query(`SELECT * FROM employees`)
            mainMenu();

    } else if(response.starting_choice === 'Add a department') {
            addDepartment();

    } else if(response.starting_choice === 'Add a role') {
            addRole();

    } else if(response.starting_choice === 'Add an employee') {
            addEmployee();

    } else {
        updateRole();
    }})}
    
    function addDepartment() {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name the department you wish to add',
                name: 'addDepartment'
            }
        ])
    }

    function addRole()

    function addEmployee()

    function updateRole()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});