import express from 'express';
const router = express.Router();
import { products } from '../data/products.js';


// router.get('/', (req, res) => {
//   const locals = {
//     title: 'Malawi village',
//     description: 'this is malawi village official website'
//   }
//   res.render('shop',locals);
  
// })

// Set the public directory for static assets
//app.use(express.static('public'));

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

router.get('/index', (req, res) => {
  res.render('home');
});

router.get('/shop/juice', (req, res) => {
  res.render('juice');
});

router.get('/tea', (req, res) => {
  res.render('tea');
});

export default router;