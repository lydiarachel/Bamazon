## Bamazon

In this activity, I've created an Amazon-like storefront using MySQL. The app will take in orders from customers and deplete stock from the store's inventory. 

* [click here for the link to my video walk-through](https://drive.google.com/file/d/1-aSKspj19Qndx-Nj__NXXctrDnitI9WN/view?usp=sharing)

## Screenshots and Written Instructions
### Challenge #1: Customer View 

1. I've created a MySQL Database called `bamazon`, with a Table inside of that database called `products`.

![Bamazon MySQL Pic](/assets/images/mysqldatabase.png)

2. The products table has each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

![Bamazon MySQL Pic](/assets/images/table.png)

3. This database has around 10 different products. I've inserted "mock" data rows into this database and table).

![Bamazon MySQL Pic](/assets/images/productsIntable.png)

4. Then I created a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. I've included an NPM package called CLI-Table, that does a nicer job of displaying the ids, product names, department names, prices, and quantity of products for sale.

![Bamazon MySQL Pic](/assets/images/bamazonnodeapp.png)

5. Using the NPM package Inquirer, the Bamazon app prompts the users with two messages.

   * The first message asks them: "What is the ID of the product you would like to buy?"
   * The second message asks: "How many would you like to buy?"

![Bamazon MySQL Pic](/assets/images/inquirer.png)

6. Once the customer has placed the order, using an if/else function with MySQL methods, the Bamazon app will check to see if the store has enough of the product to meet the customer's request.

7. If the store _does_ have enough of the product, 
    * Bamazon fulfills the customer's order
    * Shows the customer the total cost of their purchase
    * And reflects the remaining quantity of the item. 
    
![Bamazon MySQL Pic](/assets/images/fulfillorder.png)

     If the store _does_not, the app logs the phrase `Insufficient quantity!`, and then prevents the order from going through.
     
![Bamazon MySQL Pic](/assets/images/insufficient.png)

    
