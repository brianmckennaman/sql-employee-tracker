INSERT INTO department (name)VALUES ("Sales"), ("Marketing"), ("Management"),("Engineering"),("Temps");

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", "5000.00", 1),
("Marketer", "5000.00", 2),
("Sales Manager", "10000.00", 3),
("Engineer", "7000.00", 4),
("Temp", "1000.00", 5);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Anthony", "Clark", 3, NULL),
("Tiffany", "Chandler", 3, NULL),
("Josh", "Stevenson", 1, 1),
("Lucy", "Steele", 1, 2),
("Harold", "Gray", 1, 2);
