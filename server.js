const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'P@$$word',
  database: 'employee_DB'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  promptUser();
});

// function listEmployees(){
//     connection.query
// }


function promptUser(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }
    ])
    .then(answer => {
        if(answer.option === 'View all departments') { viewDepartments(); }
        if(answer.option === 'View all roles') { viewRoles(); }
        if(answer.option === 'View all employees') { viewAllEmployees(); }
        if(answer.option === 'Add a department') { console.log(answer); }
        if(answer.option === 'Add a role') { console.log(answer); }
        if(answer.option === 'Add an employee') { addEmployee(); }
        if(answer.option === 'Update an employee role') { }
        if(answer.option === 'Exit') { connection.end(); }
    })
}


viewDepartments = () => {
    console.log('View departments');
    connection.query(`SELECT id AS department_id, name AS department_name FROM department;`, function(err, res) {
    if(err) throw err;
    console.table('\n', res, '\n');
    promptUser();
  })
};

viewAllEmployees = () => {
    connection.query(`
    SELECT * 
    FROM employee 
    LEFT JOIN role 
    ON employee.role_id = role.id;`
    , function(err, res) {
        if(err) throw err;
        console.table('\n', res, '\n');
        promptUser();
    })
}

viewRoles = () => {
    connection.query(`
    SELECT title, role_id, department.name, salary FROM role
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee
    ON role.id = employee.role_id;`, 
    function(err, res) {
        if(err) throw err;
        console.table('\n', res, '\n');
        promptUser();
    })
}

addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name",
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's first name",
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter the employee's first name",
        }
    ])
    console.log('Add employee');
    connection.query(`INSERT INTO * employee (first_name, last_name, role_id, manager_id)`, function(err, res) {
    if(err) throw err;
    console.log(res)
    connection.end();
  })
};