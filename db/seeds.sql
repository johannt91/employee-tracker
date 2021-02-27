USE employee_DB;
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES  
('Sales Lead', 100000.00, 1),
('Salesperson', 80000.00, 2),
('Lead Engineer', 1500000.00, 1),
('Software Engineer', 200000.00, 2),
('Accountant', 80000.00, 1),
('Legal Team Lead', 600000.00, 1),
('Lawyer', 750000.00, 2),
('Lead Engineer', 200000.00, 3);
 
INSERT INTO employee (first_name, last_name, role_id) VALUES
('John', 'Doe', 1),
('Mike', 'Chan', 2),
('Ashley', 'Rodriguez', 3),
('Kevin', 'Tupik', 4),
('Malia', 'Brown', 5),
('Sarah', 'Lourd', 6),
('Tom', 'Allen', 7),
('Christian', 'Eckenrode', 8);
 
UPDATE employee SET manager_id = 3 WHERE id = 1;
UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 3 WHERE id = 4;
UPDATE employee SET manager_id = 6 WHERE id = 7;
UPDATE employee SET manager_id = 2 WHERE id = 8;