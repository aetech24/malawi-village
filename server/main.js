import express from 'express';
import session from 'express-session';
const router = express.Router();
import { products } from '../data/products.js';
import { ingredients } from '../data/ingredients.js';

let cartItems = [];

// Initialize the app
const app = express();
app.set('view engine', 'ejs');

// Middleware to initialize session cart
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

// Ingredients Route
router.get('/ingredients', (req, res) => {
  res.render('ingredients', { 
    title: 'Ingredients',
    description: 'Explore the essential ingredients we use in our recipes.',
    ingredients,
    cartCount: req.session.cart.length,
    includeAbout: false,
  });
});

// Checkout Route
router.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Checkout' });
});

// Shop Route
router.get('/shop', (req, res) => {
  const selectedCategory = req.query.category || 'All';
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  res.render('shop', {
    title: 'Malawi Village',
    description: 'This is Malawi Village official website',
    products: filteredProducts,
    selectedCategory,
    cartItemCount: cartItems.length,
  });
});

// Single Product Route
router.get('/singleproducts/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== productId
  );

  res.render('singleproducts', { 
    product,
    relatedProducts,
    ingredients: product.ingredients || [],
    cartItemCount: cartItems.length,
    cartCount: cartItems.length,
    includeAbout: false,
  });
});

// Cart Routes
router.get('/cart', (req, res) => {
  const locals = {
    title: 'Your Cart',
    description: 'Review your cart items',
  };

  res.render('cart', {
    locals,
    cartItems,
    cartItemCount: cartItems.length,
    includeAbout: false,
  });
});

router.post('/cart/add', (req, res) => {
  const { productId, size } = req.body; // Expect `size` ("big" or "small") in the request
  const product = products.find(p => p.id === parseInt(productId, 10));

  if (product) {
    const selectedPrice = size === 'big' ? product.price.big : product.price.small;
    const weight = size === 'big' ? 2 : 1;

    const existingItem = cartItems.find(
      item => item.id === parseInt(productId, 10) && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        ...product,
        size,
        selectedPrice,
        weight,
        quantity: 1,
      });
    }

    res.status(200).json({ message: 'Product added to cart', cartItemCount: cartItems.length });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.post('/cart/update', (req, res) => {
  const { productId, size, change } = req.body; 
  const item = cartItems.find(
    item => item.id === parseInt(productId, 10) && item.size === size
  );

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      cartItems = cartItems.filter(
        item => item.id !== parseInt(productId, 10) || item.size !== size
      );
    }

    res.status(200).json({ message: 'Quantity updated', cartItemCount: cartItems.length });
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

router.post('/cart/remove', (req, res) => {
  const { productId, size } = req.body; 
  cartItems = cartItems.filter(
    item => item.id !== parseInt(productId, 10) || item.size !== size
  );

  res.status(200).json({ message: 'Product removed from cart', cartItemCount: cartItems.length });
});
//wishlist route
let wishlistItems = []; // Temporary in-memory wishlist

// Add to Wishlist Route
router.post('/wishlist/add', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === parseInt(productId, 10));

  if (product) {
    const exists = wishlistItems.some(item => item.id === product.id);
    if (!exists) {
      wishlistItems.push(product);
    }

    res.status(200).json({
      success: true,
      message: 'Product added to wishlist',
      wishlistItemCount: wishlistItems.length,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
});
router.get('/wishlist',(req,res)=>{
  res.render('wishlist',{
    title: 'Your Wishlist',
    wishlistItems,
    cartItemCount: cartItems.length,

  })
})
// Remove from Wishlist Route
router.post('/wishlist/remove', (req, res) => {
  const { productId } = req.body;

  const productIndex = wishlistItems.findIndex(item => item.id === parseInt(productId, 10));

  if (productIndex !== -1) {
    wishlistItems.splice(productIndex, 1);

    res.status(200).json({
      success: true,
      message: 'Product removed from wishlist',
      wishlistItemCount: wishlistItems.length,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Product not found in wishlist',
    });
  }
});
// Billing details route
router.get('/billing', (req, res) => {
  res.render('billing', { cartItemCount: cartItems.length, cartItems });
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

// Home Route
router.get('/', (req, res) => {
  const items = [
    { id: 1, name: 'Malawi Juice', image: '/assets/image-1.jpg' },
    { id: 2, name: 'Orange Juice', image: '/assets/image-2.jpg' },
    {  id: 3, name: 'Watermelon Drink', image: '/assets/image-3.jpg' },
    { id: 4, name: 'Coca-Cola', image: '/assets/image-4.jpg' },
  ];
  const gridProducts = [
    { id: 1, name: "Strawberry Juice", price: 120.0, image: "/assets/image-5.jpg" },
    { id: 2, name: "Cocktail Drink", price: 120.0, image: "/assets/image-2.jpg" },
    { id: 3, name: "Milkshake", price: 120.0, image: "/assets/image-3.jpg" },
    { id: 4, name: "Hot Cocoa", price: 120.0, image: "/assets/image-4.jpg" },
  ];
  res.render('index', {
    title: 'Malawi Village',
    description: 'Welcome to Malawi Village',
    items,
    backgroundImage: '/assets/image-6.jpg',
    productImage: '/assets/image-6.jpg',
    buttonLink: '/shop',
    gridProducts,
    cartItemCount: cartItems.length,
  });
});

// Routes to List All Available Routes
router.get('/routes', (req, res) => {
  const routes = router.stack
    .filter(r => r.route)
    .map(r => r.route.path);
  res.json({ availableRoutes: routes });
});

export default router;