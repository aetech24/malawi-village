import express from 'express';
const router = express.Router();

import { products } from '../data/products.js';
import { ingredients} from '../data/ingredients.js'

const cartItems = [];

// Ingredients


const app = express();

app.set('view engine', 'ejs');

// Ingredients Route
app.get('/ingredients', (req, res) => {
  res.render('ingredients', { 
    title: 'Ingredients',
    description: 'Explore the essential ingredients we use in our recipes.',
    ingredients
  });
});

// Shop Route
router.get('/shop', (req, res) => {
  const locals = {
    title: 'Malawi Village',
    description: 'This is Malawi Village official website',
  };

  const selectedCategory = req.query.category || null; // Default to null if no category is selected
  const filteredProducts = selectedCategory
    ? selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory)
    : []; // No products displayed if no category is selected

  res.render('shop', {
    locals,
    products: filteredProducts, // Pass the filtered list
    selectedCategory, // Pass selected category for UI updates
  });
});

// Single Product Route
router.get('/singleproducts/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10); // Ensure the ID is a number
  const product = products.find(p => p.id === productId);

  if (!product) {
    // Render a 404 page if the product is not found
    return res.status(404).send('No product found');
  }

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );

  res.render('singleproducts', { 
    product, 
    relatedProducts,
    ingredients
  });
});


// Other Routes
router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/login',(req,res)=>{
  res.render('login')
})
router.get('/signup', (req,res) =>{
  res.render('signup')
})

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