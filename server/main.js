import express from 'express';
const router = express.Router();
import { products } from '../data/products.js';


const cartItems = []; // Simulated cart storage (replace with session or database in production)

router.post('/add-to-cart', (req, res) => {
  const { id, size } = req.body;

  // Find the product in the catalog
  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if the product (with the selected size) already exists in the cart
  const existingCartItem = cartItems.find(item => item.id === product.id && item.size === size);

  if (existingCartItem) {
    // Increase quantity and update price
    existingCartItem.quantity += 1;
    existingCartItem.totalPrice = existingCartItem.quantity * product.price.big;
  } else {
    // Add new item to cart
    cartItems.push({
      id: product.id,
      name: product.name,
      size,
      price: product.price.big,
      quantity: 1,
      totalPrice: product.price.big,
    });
  }

  res.json({ message: 'Product added to cart', cart: cartItems });
});
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
    filteredProducts, // Pass the filtered list to EJS
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
router.get('/about', (req, res) => {
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