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
        name: "item_id",
        type: "input",
        message: "What is the product ID of the item you wish to purchase?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }, {
        name: "quantity",
        type: "input",
        message: "How many units would you like to purchase?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false
        }
    }]).then(function (input) {

        var item = input.item_id;
        var quantity = input.quantity;

        // console.log(answer)
        var query = "SELECT item_id, stock_quantity, price, department_name FROM products WHERE products.item_id=?";
        connection.query(query, [parseInt(input.item_id)], function (err, res) {

            if (err) throw err;
            console.table(res)
            //console.log(res)
            // for (let index = 0; index < res.length; index++) {
            //     const element = res[index];
            //     console.log(element.stock_quantity)
            // }

            var queryStr = 'SELECT * FROM products WHERE ?';

            connection.query(queryStr, { item_id: item }, function (err, data) {
                if (err) throw err;

                //invalid ID
                if (data.length === 0) {
                    console.log('ERROR: Invalid Item ID');
                    requestProductInfo();

                } else {
                    var productData = data[0];
                    //if (res[0].stock_quantity >= input.quantity) {
                    //console.log("Complete Purchase")
                    //quary to update product table. set stock_quitity to be substructed by the answer quantity
                    if (quantity <= productData.stock_quantity) {
                        console.log('Congratulations, your order has been placed!');

                        // Construct the updating query string
                        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                        // Update the inventory
                        connection.query(updateQueryStr, function (err, data) {
                            if (err) throw err;

                            console.log('Your total is $' + productData.price * quantity);
                            console.log("\n---------------------------------------------------------------------\n");
                            connection.end();
                        })

                        // completePurchase()

                    } else {
                        console.log("Insufficient quantity!");
                        console.log("Please modify your order");
                        requestProductInfo();
                    }
                }
            })
        })
    }
    )
}
