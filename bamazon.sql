DROP DATABASE IF EXISTS Bamazon_db;

CREATE database Bamazon_db;

USE Bamazon_db;

CREATE TABLE products(
	item_id INT(4) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ( "sneakers", "footwear", 34.99, 15),
	   ("boots", "footwear", 28.00, 8),
	   ("skirt", "clothing", 7.87, 23),
	   ("sweater", "clothing", 112.56, 30),
	   ("lipstick", "makeup", 24.89, 19),
	   ("maskara", "makeup", 15.00, 12),
	   ("gloves", "accessory", 45.50, 8),
	   ("belt", "accessory", 180.90, 53),
	   ("tote", "handbag", 12.50, 24),
	   ("clutch", "handbag", 49.99, 17)

