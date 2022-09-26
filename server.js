const inquirer = require('inquirer')
const express = require('express')
const mysql = require('mysql2')

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

inquirer
    .prompt([
        {
            type: 'choice',
            message: 'What would you like to do?',
            name: 'Starting_choice',
            choices: ['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
        }
    ])

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});