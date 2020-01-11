Bamazon is an Amazon-like storefront which utilizes MySQL and node.js. 

**Customer Module**

The app will take in orders from customers and deplete stock from the store's inventory. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale. 
The app asks users with two messages.
The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.


<img width="610" alt="1" src="https://user-images.githubusercontent.com/42060484/72202339-1cc64400-3413-11ea-98c2-df4969c557f7.png">


Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

<img width="566" alt="2" src="https://user-images.githubusercontent.com/42060484/72202352-3d8e9980-3413-11ea-88f9-ce90044150ec.png">

However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

**Manager Module**

Running this application will a set of menu options:
View Products for Sale
View Low Inventory
Add to Inventory
Add New Product

<img width="530" alt="4" src="https://user-images.githubusercontent.com/42060484/72202487-eee1ff00-3414-11ea-8a46-464dce7f6b5c.png">


If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

<img width="597" alt="1 1" src="https://user-images.githubusercontent.com/42060484/72202459-a0ccfb80-3414-11ea-9417-202b9233ecb4.png">

If a manager selects View Low Inventory, then it should list all items with an inventory count lower than fifty.

<img width="595" alt="2" src="https://user-images.githubusercontent.com/42060484/72202469-b4786200-3414-11ea-9f41-bb769b254be0.png">

If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
<img width="511" alt="3" src="https://user-images.githubusercontent.com/42060484/72202510-34063100-3415-11ea-9ce7-158d2726a0c9.png">

If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
<img width="530" alt="4" src="https://user-images.githubusercontent.com/42060484/72202503-22248e00-3415-11ea-8cba-54ec92f5c4ed.png">


**Technologies Used**
JavaScript
Node JS
MySQL
NPM Packages:
mysql
inquirer
express