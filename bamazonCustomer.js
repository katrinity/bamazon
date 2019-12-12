var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "Bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;

    displayItems();

});

// display all of the items available for sale. Include the ids, names, and prices of products for sale.
var displayItems = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " || Product Name: " +
                res[i].product_name + " || Price: " + res[i].price);
        }

        requestProductInfo();
    });
};

//ask customer the ID of the product he/she would like to buy
var requestProductInfo = function () { }