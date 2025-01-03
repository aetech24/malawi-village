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
    // Render a 404 page if the product is not found
    return res.status(404).send('No product found');
  }

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );


  res.render('singleproducts', { 
    product, 
    relatedProducts,
    ingredients,
    cartCount: req.session.cart.length, 
    includeAbout: false
  });



// Other Routes
router.get('/about', (req, res) => {
  res.render('about', { cartCount: req.session.cart.length, includeAbout: true });
});
router.get('/login',(req,res)=>{
  res.render('login')
})
router.get('/signup', (req,res) =>{
  res.render('signup')
})

router.get('/testimonial', (req, res) => {
  res.render('testimonial', { cartCount: req.session.cart.length, includeAbout: true });
});

router.get('/contact', (req, res) => {
  res.render('contact', { cartCount: req.session.cart.length, includeAbout: false });
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
    {
      name: "Strawberry Juice",
      price: 120.0,
      image: "/assets/image-5.jpg",
    },
    {
      name: "Cocktail Drink",
      price: 120.0,
      image: "/assets/image-2.jpg",
    },
    {
      name: "Milkshake",
      price: 120.0,
      image: "/assets/image-3.jpg",
    },
    {
      name: "Hot Cocoa",
      price: 120.0,
      image: "/assets/image-4.jpg",
    },
    
  ];
  res.render('index',{items, 
    backgroundImage: '/assets/image-6.jpg', // Path to your background image
    productImage: '/assets/image-6.jpg', // Path to the product image
    buttonLink: '/shop',
    gridProducts

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