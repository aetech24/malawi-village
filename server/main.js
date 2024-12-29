import express from 'express';
const router = express.Router();
import { products } from '../data/products.js';

const cartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 10,
    quantity: 2,
    image: "/assets/image-3.jpg",
    weight: 20
  },
  {
    id: 2,
    name: "Product 2",
    price: 15,
    quantity: 3,
    image: "/assets/image-4.jpg",
    weight: 20
  },
];
// Shop Route
router.get('/shop', (req, res) => {
  const locals = {
    title: 'Malawi Village',
    description: 'This is Malawi Village official website',
  };

  // Retrieve category from query parameters
  const selectedCategory = req.query.category;

  // Filter products based on selected category
  let filteredProducts = [];
  if (selectedCategory) {
    if (selectedCategory === 'All') {
      filteredProducts = products; // Show all products
    } else {
      filteredProducts = products.filter(product => product.category === selectedCategory);
    }
  }

  // Pass the filtered products and locals to the EJS template
  res.render('shop', {
    locals,
    products,
    filteredProducts: products, // Pass the filtered list to EJS
    selectedCategory, // Pass selected category to EJS for better conditional rendering
  });
});

// Single Product Route
router.get('/singleproducts/:id', (req, res) => {
  const productId = parseInt(req.params.id); // Get the product ID from query parameters
  const product = products.find(p => p.id === productId); // Find the product by ID
  if (product)
  {
    res.render('singleproducts',{product});
  }else{
    res.status(404).send('Product not found')
  }
  if (product) {
     //Find related products (same category, excluding the current product)
    const relatedProducts = products.filter(
           p => p.category === product.category && p.id !== product.id
    );

    //Render the single product page
    res.render('singleproducts', { product, relatedProducts });
  } else {
    res.status(404).send('Product not found');
  }
});

// Other Routes
router.get('/', (req, res) => {
  res.render('about');
});

router.get('/testimonial', (req, res) => {
  res.render('testimonial');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/cart', (req, res) => {
  res.render('cart', { cartItems });
});

export default router;