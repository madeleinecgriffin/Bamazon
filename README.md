# Bamazon

This app uses Node.js an mySQL to imitate stocking and purchasing from a web stire like Amazon.

Initially, a table is created showing which items are available for purchase in the Bamazon store in mySQL. Then, when the user runs the .js file in their terminal using Node, the app lists the items and their current stock in the store. It then asks the user which item they would like to purchase. If the item the user selects is in stock, the purchase is successful. The app relists the Bamazon stock minus the purchased item and the user is asked if they would like to purchase anything else. This process continues until the user indicates they do not want to continue after their purchase.

One failsafe is that if the item the user selects is not currently in stock, the app will inform the user the item is not available and reprompt for an item the user would like to purchase.
