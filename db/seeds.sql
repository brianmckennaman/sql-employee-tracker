INSERT INTO department (name)
VALUES ("Sales"),
("Marketing"),
("Management"),
("Engineering"),
("Temps");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 5000.00, 1),
("Marketer", 5000.00, 2),
("Sales Manager", 10000.00, 3),
("Engineer", 7000.00, 4),
("Temp", 1000.00, 5;);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Anthony", "Clark", 1, NULL),
("Tiffany", "Chandler", 2, NULL),
("Josh", "Stevenson", 3, NULL),
("Lucy", "Steele", 4, 3),
("Harold", "Gray", 5, 3);
