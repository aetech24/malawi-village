import express from 'express';
const router = express.Router();

import { products } from '../data/products.js';

// ingredients
import { ingredients } from '../data/ingredients.js';

const app = express();

app.set('view engine', 'ejs');

app.get('/ingredients', (req, res) => {
  res.render('ingredients', { 
    title: 'Ingredients',
    description: 'Explore the essential ingredients we use in our recipes.',
    ingredients,
    cartCount: req.session.cart.length,
    includeAbout: false
  });
});

// Shop Route
router.get('/shop', (req, res) => {
  const locals = {
    title: 'Malawi Village',
    description: 'This is Malawi Village official website',
  };

  const selectedCategory = req.query.category || 'All'; // Default to 'All' if no category is selected
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  res.render('shop', {
    locals,
    products: filteredProducts, // Pass the filtered list
    selectedCategory, // Pass selected category for UI updates
    cartCount: req.session.cart.length,
    includeAbout: false
  });
});

// Single Product Route
router.get('/singleproducts/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10); // Ensure the ID is a number
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );

  res.render('singleproducts', { product, relatedProducts, cartCount: req.session.cart.length, includeAbout: false });
});

// Other Routes
router.get('/about', (req, res) => {
  res.render('about', { cartCount: req.session.cart.length, includeAbout: true });
});

router.get('/testimonial', (req, res) => {
  res.render('testimonial', { cartCount: req.session.cart.length, includeAbout: true });
});

router.get('/contact', (req, res) => {
  res.render('contact', { cartCount: req.session.cart.length, includeAbout: false });
});

// Route to display products
router.get('/', (req, res) => {
  const locals = {
    title: 'Malawi Village',
    description: 'Welcome to Malawi Village',
  };
  res.render('index', { locals, products, cartCount: req.session.cart.length, includeAbout: true });
});

// Route to add to cart
router.post('/add-to-cart', (req, res) => {
  const { id } = req.body;
  const product = products.find((p) => p.id == id);

  if (product) {
    const item = req.session.cart.find((p) => p.id == product.id);
    if (item) {
      item.quantity += 1;
    } else {
      req.session.cart.push({ ...product, quantity: 1 });
    }
  }

  res.json({ cartCount: req.session.cart.length });
});

// Route to display cart
router.get('/cart', (req, res) => {
  const locals = {
    title: 'Your Cart',
    description: 'Review your cart items',
  };
  res.render('cart', { locals, cart: req.session.cart, cartCount: req.session.cart.length, includeAbout: false });
});

export default router;