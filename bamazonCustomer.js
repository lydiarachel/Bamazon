//require mysql, inquirer, and dotenv npm packages 
require("dotenv").config()
var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.password,
  database: "bamazon"
});

//confirming connection to the bamazon database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.
connection.query("SELECT * FROM products;", function (err, data) {
  if (err) throw err;

  var table = new Table({
    head: ['Product ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
  });

  var choicesList = {};
  for (i = 0; i < data.length; i++) {

    table.push(
      [data[i].id, data[i].product_name, data[i].department_name, data[i].price, data[i].stock_quantity]

    );

    choicesList[data[i].id] = {
      quantity: data[i].stock_quantity,
      price: data[i].price
    }
    // console.log(data[i].id + "\t" + data[i].product_name + '\t' + data[i].department_name + '\t' + data[i].price);
  }
  console.log(table.toString());
  console.log(Object.keys(choicesList));

  inquirer.prompt([
    {
      name: "productID",
      type: "rawlist",
      choices: Object.keys(choicesList),
      message: "What is the ID of the product you would like to buy?"
    },
    {
      name: "unitsRequested",
      type: "input",
      message: "How many would you like to buy?"
    }
  ])
  .then(function(answer) {
    // get the information of the chosen item
    var stockQuantity = choicesList[answer.productID].quantity;
    var unitPrice = choicesList[answer.productID].price;

    if (answer.unitsRequested > stockQuantity){
      console.log ("Insufficient quantity!")
    } else {       
      
      var updatedStock = (stockQuantity - answer.unitsRequested)
      connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
         stock_quantity:updatedStock
        },
        {
          id: answer.productID
        }
      ],
      function(error) {
        if (error) throw err;
        console.log("Thank you for your order!");
        console.log("Your total is $" + (answer.unitsRequested * unitPrice));
        
      });
    
    }
    
  });
});

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.