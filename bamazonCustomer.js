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
        // for (var i = 0; i < res.length; i++) {
        //     console.log("Product ID: " + res[i].item_id + " || Product Name: " +
        //         res[i].product_name + " || Price: " + res[i].price);
        // }
        console.table(res)

        requestProductInfo();
    });
};

//ask customer the ID of the product he/she would like to buy
var requestProductInfo = function () {
    inquirer.prompt([{
        name: "productID",
        type: "input",
        message: "What is the product ID of the item you wish to purchase?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }, {
        name: "productQt",
        type: "input",
        message: "How many units would you like to purchase?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false
        }
    }]).then(function (answer) {
        console.log(answer)
        var query = "Select stock_quantity, price, department_name FROM products WHERE products.item_id=?";
        connection.query(query, [parseInt(answer.productID)], function (err, res) {

            if (err) throw err;
            console.table(res)
            console.log(res)
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                console.log(element.stock_quantity)
            }
            if (res[0].stock_quantity >= answer.productQt) {
                console.log("completePurchase")
                //quary to update product table. set stock_quitity to be substructed by the answer quantity
                completePurchase()

            } else {
                console.log("Sorry, we do not have enough items in stock");

            }
        })
    })
};

