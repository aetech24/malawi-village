<<<<<<< HEAD
import express from "express";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import router from "./server/main.js";
import { products } from "./data/products.js";

const PORT = 5000 || process.env.PORT;
const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.use(express.static("public"));
=======
import dotenv from 'dotenv';
import express from 'express';
const PORT = 5000 || process.env.PORT;
import expressLayouts from 'express-ejs-layouts';
import router from './server/main.js';
const app = express();

import { products } from './data/products.js';

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Use express ejs layouts
app.use(expressLayouts);

// Let the layout file be optional
app.set('layout', './layouts/main');

// Serving static files
app.use(express.static('public'));

// Middleware to parse JSON requests
>>>>>>> 9b3fc57bb4bedbea0f804fed329b339bfbd1d10a
app.use(express.json());

<<<<<<< HEAD
// Session setup
app.use(
  session({
    secret: "your_secret_key",
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
// app.get('/', (req, res) => {
//   res.render('index', { products, cartCount: req.session.cart.length });
// });

router.get("/", (req, res) => {
  const items = [
    { name: "Malawi Juice", image: "/assets/image-1.jpg" },
    { name: "Orange Juice", image: "/assets/image-2.jpg" },
    { name: "Watermelon Drink", image: "/assets/image-3.jpg" },
    { name: "Coca-Cola", image: "/assets/image-4.jpg" },
  ];

  const gridProducts = [
    { name: "Strawberry Juice", price: 120.0, image: "/assets/image-5.jpg" },
    { name: "Cocktail Drink", price: 120.0, image: "/assets/image-2.jpg" },
    { name: "Milkshake", price: 120.0, image: "/assets/image-3.jpg" },
    { name: "Hot Cocoa", price: 120.0, image: "/assets/image-4.jpg" },
  ];

  const products = [
    {
      id: 1,
      name: "Apple Juice",
      price: { big: 5.0, small: 3.0 },
      image: "/assets/image-7.jpg",
    },
    {
      id: 2,
      name: "Mango Juice",
      price: { big: 6.0, small: 4.0 },
      image: "/assets/image-8.jpg",
    },
  ];

  const locals = {
    title: "Malawi Village",
    description: "Welcome to Malawi Village",
  };

  res.render("index", {
    locals,
    items, // Now items is included
    gridProducts,
    products, // Added products
    backgroundImage: "/assets/image-6.jpg",
    productImage: "/assets/image-6.jpg",
    buttonLink: "/shop",
    cartCount: req.session.cart ? req.session.cart.length : 0, // Ensure cartCount doesn't throw an error if cart is undefined
    includeAbout: true,
  });
});

// Route to add to cart
app.post("/add-to-cart", (req, res) => {
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
app.get("/cart", (req, res) => {
  res.render("cart", { cart: req.session.cart });
});

// Use the router
app.use("/", router);
=======
// App route
app.use('/', router);
>>>>>>> 9b3fc57bb4bedbea0f804fed329b339bfbd1d10a

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
