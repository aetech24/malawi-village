import express from 'express';
const router = express.Router();

import { products } from '../data/products.js';
import { ingredients } from '../data/ingredients.js';

let cartItems = [];
import { ingredients} from '../data/ingredients.js'

const cartItems = [];

// Ingredients



const app = express();

app.set('view engine', 'ejs');

// Ingredients Route
router.get('/ingredients', (req, res) => {
  res.render('ingredients', { 
    title: 'Ingredients',
    description: 'Explore the essential ingredients we use in our recipes.',
    ingredients,
    cartCount: req.session.cart.length,
    includeAbout: false
  });
});

router.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Checkout' });
});

// Shop Route
router.get('/shop', (req, res) => {
  const locals = {
    title: 'Malawi Village',
    description: 'This is Malawi Village official website',
  };

  const selectedCategory = req.query.category || 'All';
  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);
  const selectedCategory = req.query.category || 'All'; // Default to 'All' if no category is selected
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  res.render('shop', {
    locals,
    products: filteredProducts,
    selectedCategory,
    cartItemCount: cartItems.length
  });
});

// Single Product Route
router.get('/singleproducts/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).send('No product found');
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);

  res.render('singleproducts', { 
    product, 
    relatedProducts,
    ingredients,
    cartItemCount: cartItems.length
    cartCount: req.session.cart.length, 
    includeAbout: false
  });
});

// Cart Routes
router.post('/cart/add', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === parseInt(productId, 10));
  if (product) {
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    res.status(200).json({ message: 'Product added to cart', cartItemCount: cartItems.length });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.post('/cart/update', (req, res) => {
  const { productId, change } = req.body;
  const item = cartItems.find(item => item.id === parseInt(productId, 10));
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cartItems = cartItems.filter(item => item.id !== productId);
    }
    res.status(200).json({ message: 'Quantity updated', cartItemCount: cartItems.length });
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

router.post('/cart/remove', (req, res) => {
  const { productId } = req.body;
  cartItems = cartItems.filter(item => item.id !== parseInt(productId, 10));
  res.status(200).json({ message: 'Product removed from cart', cartItemCount: cartItems.length });
});

router.get('/cart', (req, res) => {
  res.render('cart', { cartItems, cartItemCount: cartItems.length });
});

// Other Routes
router.get('/about', (req, res) => {
  res.render('about', { cartItemCount: cartItems.length });
});

router.get('/login', (req, res) => {
  res.render('login', { cartItemCount: cartItems.length });
});

router.get('/signup', (req, res) => {
  res.render('signup', { cartItemCount: cartItems.length });
});

router.get('/testimonial', (req, res) => {
  res.render('testimonial', { cartItemCount: cartItems.length });
});

router.get('/contact', (req, res) => {
  res.render('contact', { cartItemCount: cartItems.length });
});

// Route to display products
router.get('/', (req, res) => {

  const items = [
    { name: 'Malawi Juice', image: '/assets/image-1.jpg' },
    { name: 'Orange Juice', image: '/assets/image-2.jpg' },
    { name: 'Watermelon Drink', image: '/assets/image-3.jpg' },
    { name: 'Coca-Cola', image: '/assets/image-4.jpg' },
  ];
  const gridProducts = [
    { name: "Strawberry Juice", price: 120.0, image: "/assets/image-5.jpg" },
    { name: "Cocktail Drink", price: 120.0, image: "/assets/image-2.jpg" },
    { name: "Milkshake", price: 120.0, image: "/assets/image-3.jpg" },
    { name: "Hot Cocoa", price: 120.0, image: "/assets/image-4.jpg" },
  ];
  res.render('index', {
    items, 
    backgroundImage: '/assets/image-6.jpg',
    productImage: '/assets/image-6.jpg',
    buttonLink: '/shop',
    gridProducts,
    cartItemCount: cartItems.length
  });
});

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