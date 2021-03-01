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



function promptUser() {
    inquirer.prompt([{
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }])
        .then(answer => {
            if (answer.option === 'View all departments') {
                viewDepartments();
            }
            if (answer.option === 'View all roles') {
                viewRoles();
            }
            if (answer.option === 'View all employees') {
                viewAllEmployees();
            }
            if (answer.option === 'Add a department') {
                addDepartment();
            }
            if (answer.option === 'Add a role') {
                addRole();
            }
            if (answer.option === 'Add an employee') {
                addEmployee();
            }
            if (answer.option === 'Update an employee role') {
                updateEmployeeRole();
            }
            if (answer.option === 'Exit') {
                connection.end();
            }
        })
}


viewDepartments = () => {
    console.log('View departments');
    connection.query(`SELECT id AS department_id, name AS department_name FROM department;`, function (err, res) {
        if (err) throw err;
        console.table('\n', res, '\n');
        promptUser();
    })
};

viewAllEmployees = () => {
    connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, title, department.name AS department, salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee 
    LEFT JOIN role 
    ON employee.role_id = role.id
	LEFT JOIN department
	ON role.department_id = department.id
    LEFT JOIN employee manager
    ON manager.id = employee.manager_id;`, (err, res) => {
        if (err) throw err;
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
        (err, res) => {
            if (err) throw err;
            console.table('\n', res, '\n');
            promptUser();
        })
}

addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'newDepartment',
        message: 'Add a new department'
    }).then(data => {
        connection.query(`
        INSERT INTO department (name) 
        VALUE('${data.newDepartment}');`,

            function (error) {
                if (error) throw error;
                console.log('Department added!');
                viewDepartments();
                promptUser();
            });
    })
}

addRole = () => {
    connection.query('SELECT title FROM role;', function (error, res) {
        if (error) throw error;
        const titles = res.map(({
            title
        }) => ({
            name: title
        }));
        inquirer.prompt([{
                    type: 'list',
                    name: 'newRole',
                    message: 'Choose a role',
                    choices: titles
                },
                {
                    type: 'input',
                    name: 'newSalary',
                    message: 'Please enter a salary for this employee.'
                },
                {

                    type: 'list',
                    name: 'department',
                    message: `Add department id (1) Sales, (2) Engineering, (3) Finance, (4) Legal `,
                    choices: [1, 2, 3, 4]
                }
            ])
            .then(data => {
                connection.query(
                    `INSERT INTO role (title, salary, department_id)
            VALUE ('${data.newRole}', '${data.newSalary}', '${data.department}')
            `,
                    function (err, res) {
                        if (err) throw err;
                        viewRoles();
                        promptUser();
                    }
                )
            })
    })
}

addEmployee = () => {
    inquirer.prompt([{
                type: 'input',
                name: 'first_name',
                message: "Enter the employee's [FIRST NAME]",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Enter the employee's [LAST NAME]",
            },
            {
                type: 'input',
                name: 'role_id',
                message: "Enter the employee's role [ID]",
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter an employee ID for the manager',
            }
        ])
        .then(data => {
            connection.query(`
        INSERT INTO employee 
        (first_name, last_name, role_id, manager_id) 
        VALUES ('${data.first_name}', '${data.last_name}', '${data.role_id}', '${data.manager_id}');`, function (err) {
                if (err) throw err;
                viewAllEmployees();
                promptUser();
            })
        })

};


updateEmployeeRole = () => {
    viewAllEmployees();

    connection.query(`
    SELECT CONCAT(first_name, ' ', last_name)
    AS employee
    FROM employee;`, function (err, res) {
        if (err) throw err;
        const employeeList = res.map(({
            employee
        }) => ({
            name: employee
        }));
        inquirer
            .prompt([{
                    type: 'list',
                    name: 'employeeName',
                    message: 'Select an employee to update',
                    choices: employeeList
                },

            ])
            .then(data => {
                connection.query(`
                UPDATE employee SET role_id =
                `)
            })
    })
}