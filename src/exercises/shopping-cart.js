/*
* Shopping Cart Requirements:
* - Before you start, please run `npm run start:api` to start mock API server
* - data for mock APIs come from ./db/db.json
* - There are 2 APIs you need to call:
*     - http://localhost:4002/cart : this will provide a list of product-ids for current shopping cart
*     - http://localhost:4002/products : this will provide a list of products with full details
*
* We want to display detail of items in shopping carts. i.e: user has added product 1001 and 1004 to the cart.
* product 1001 is TV and product 1002 is iPad. Thus, we would like to display them in tabular format
* inside table#shopping-cart-tbl as below:
* ID     Item
* 1001   TV
* 1002   iPad
*
* */
const View = 
{
  init: async () => 
  {
    const tbodyElem = document.getElementById('shopping-cart-tbl').querySelector('tbody');

    try 
    {
      // Fetching cart items
      const cartResponse = await fetch('http://localhost:4002/cart');
      const cartData = await cartResponse.json();
      //console.log('Cart Data:', cartData);

      // Fetching products
      const productsResponse = await fetch('http://localhost:4002/products');
      const productsData = await productsResponse.json();
      //console.log('Products Data:', productsData);

      // Create a map of product IDs to product names
      const productMap = new Map();

      productsData.forEach(product => {
        // Convert product id to number
        const productId = parseInt(product.id);
        productMap.set(productId, product.name);
      });
      console.log('Product Map:', productMap);

      // Clear any existing content in the table body
      tbodyElem.innerHTML = '';

      // Populate the table with cart items
      cartData.forEach(item => {
        // Convert cart item id to number
        const itemId = parseInt(item.id);
        const productName = productMap.get(itemId);
        console.log('Item ID:', itemId);
        console.log('Product Name:', productName);
        if (productName) 
        {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${itemId}</td><td>${productName}</td>`;
          tbodyElem.appendChild(row);
        } 
        else 
        {
          console.warn('Product name not found for item ID:', itemId);
        }
      });
    } 
    catch (error) 
    {
      console.error('Error fetching data:', error);
    }
  }
};
document.addEventListener('DOMContentLoaded', View.init);
