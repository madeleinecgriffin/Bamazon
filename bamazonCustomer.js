var mysql = require("mysql");
var inquirer = require('inquirer');
var buyID;
var buyStock;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  listInventory();
  buyItem();
});

function listInventory() {
  var query = connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.log("---------------------------------");
    console.log("PRODUCT NAME | DEPARTMENT NAME | PRICE | STOCK");
    console.log("---------------------------------");

    for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        console.log("---------------------------------");
    }
  });
}


function inStock(buyID, buyStock) {
  var query = connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: buyStock}, {item_id: buyID}], function(err, res) {
    if (err) throw err;
  });
}

function buyAgain() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Would you like to buy another item?",
      choices: [
        "Yes",
        "No"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "No":
          console.log("Thank you for your patronage. Please come again!");
          connection.end();
          break;

        case "Yes":
          listInventory();
          buyItem();
          break;
      }
    });
}


function buyItem() {
  inquirer
  .prompt({
    name: "buy",
    type: "input",
    message: "Which item would you like to purchase? Please input the item ID shown in the table above."
  })
  .then(function(answer) {
    var query = connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      buyID = answer.buy;

      console.log("---------------------------------");
      console.log("You have chosen to buy:");

      for (var i = 0; i < res.length; i++) {
        if (buyID == res[i].item_id) {
          console.log(res[i].product_name);
          console.log("---------------------------------");
          buyStock = res[i].stock_quantity;
          if (buyStock <= 0) {
            console.log("This item is not in stock.");
            buyAgain();
          }
          else {
            buyStock = buyStock - 1;
            inStock(buyID, buyStock);
            buyAgain();
          }
        }
      }

    });
  });
}