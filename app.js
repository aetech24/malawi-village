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
app.use(express.json());

// App route
app.use('/', router);

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
