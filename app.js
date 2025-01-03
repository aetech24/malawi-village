import express from 'express';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import router from './server/main.js';
import { products } from './data/products.js';

const PORT = 5000 || process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware to initialize cart
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

// Middleware to pass cartCount to all views
app.use((req, res, next) => {
  res.locals.cartCount = req.session.cart.length;
  next();
});

// Route to display products
app.get('/', (req, res) => {
  res.render('index', { products, cartCount: req.session.cart.length });
});

// Route to add to cart
app.post('/add-to-cart', (req, res) => {
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
app.get('/cart', (req, res) => {
  res.render('cart', { cart: req.session.cart });
});

// Use the router
app.use('/', router);

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});