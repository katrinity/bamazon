DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (754, "sneakers", "footwear", 34.99, 15),
	   (654, "boots", "footwear", 28.00, 8),
	   (132, "skirt", "clothing", 7.87, 23),
	   (545, "sweater", "clothing", 112.56, 30),
	   (167, "lipstick", "makeup", 24.89, 19),
	   (097, "maskara", "makeup", 15.00, 12),
	   (726, "gloves", "accessory", 45.50, 8),
	   (098, "belt", "accessory", 180.90, 53),
	   (198, "tote", "handbag", 12.50, 24),
	   (101, "clutch", "handbag", 49.99, 17)