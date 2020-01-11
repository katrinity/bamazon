
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "Bamazon_db"
});

function ManagerTasks() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Please select an option:',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            filter: function (val) {
                if (val === 'View Products for Sale') {
                    return 'sale';
                } else if (val === 'View Low Inventory') {
                    return 'lowInventory';
                } else if (val === 'Add to Inventory') {
                    return 'addInventory';
                } else if (val === 'Add New Product') {
                    return 'newProduct';
                } else {
                    console.log('ERROR: Unsupported operation!');
                    exit(1);
                }
            }
        }
    ]).then(function (input) {

        // pick the action from the list
        if (input.option === 'sale') {
            displayInventory();
        } else if (input.option === 'lowInventory') {
            displayLowInventory();
        } else if (input.option === 'addInventory') {
            addInventory();
        } else if (input.option === 'newProduct') {
            createNewProduct();
        } else {
            // Unreachable
            console.log('ERROR: This operation is not supported!');
            exit(1);
        }
    })
}

// display all of the items available for sale
var displayInventory = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        connection.end();
    });
};



var displayLowInventory = function () {
    var query = "Select * FROM products WHERE stock_quantity < 50";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log('Low Inventory Items (< 50): ');
        console.table(res)
        connection.end();
    });
};

// Validation for positive integers inputs
function validateInteger(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);
    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole number greater than 0.';
    }
}

// Validation for input >0
function validateNumber(value) {
    var number = (typeof parseFloat(value)) === 'number';
    var positive = parseFloat(value) > 0;
    if (number && positive) {
        return true;
    } else {
        return 'Please enter a number grater than 0.'
    }
}


var addInventory = function () {
    inquirer.prompt([{
        name: 'item_id',
        type: 'input',
        message: 'Please enter item ID',
        validate: validateInteger,
        filter: Number
    }, {
        name: 'item_id',
        type: 'input',
        name: 'quantity',
        message: 'How many items would you like to add?',
        validate: validateInteger,
        filter: Number
    }
    ]).then(function (input) {
        var item = input.item_id;
        var addQuantity = input.quantity;
        var queryStr = 'SELECT * FROM products WHERE ?';
        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            //invalid ID selected 
            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                addInventory();

            } else {
                var productData = data[0];
                //console.log('Updating Inventory');
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;
                connection.query(updateQueryStr, function (err, data) {
                    if (err) throw err;
                    console.log('Stock count for Item ID ' + item + ' has been updated' + '. ' + 'Total stock count is ' + (productData.stock_quantity + addQuantity) + '.');
                    console.log("\n-------------------------------------------------------------------\n");
                    connection.end();
                })
            }
        })
    })
}

var createNewProduct = function () {
    inquirer.prompt([{
        type: 'input',
        name: 'product_name',
        message: 'Please enter product name',
    }, {
        type: 'input',
        name: 'department_name',
        message: 'Please enter department name',
    }, {
        type: 'input',
        name: 'price',
        message: 'Please enter unit price',
        validate: validateNumber
    }, {
        type: 'input',
        name: 'stock_quantity',
        message: 'Please enter stock quantity',
        validate: validateInteger
    }
    ]).then(function (input) {

        console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +
            '    department_name = ' + input.department_name + '\n' +
            '    price = ' + input.price + '\n' +
            '    stock_quantity = ' + input.stock_quantity);
        var queryStr = 'INSERT INTO products SET ?';
        connection.query(queryStr, input, function (error, results) {
            if (error) throw error;

            console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
            console.log("\n---------------------------------------------------------------------\n");
            connection.end();
        });
    })
}

function runBamazon() {
    ManagerTasks();
}
runBamazon();