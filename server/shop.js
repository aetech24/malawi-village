import { products } from "../data/products";



 products.map((product) => {
   let productDisplay = `
      <div class="products_details">
      <img src="${product.image}">
      <div class="product_name">
        ${product.name}
      </div>
      <div class="price">
        ${product.price}
      </div>
    </div>
    `;
 });

 console.log(productDisplay)