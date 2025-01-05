const express = require('express');
const router = express.Router();

// ...existing code...

router.post('/cart/add', (req, res) => {
  const { id, price, size } = req.body;
  const cartItems = req.session.cartItems || [];
  const existingItem = cartItems.find(item => item.id === id && item.size === size);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ id, price, size, quantity: 1 });
  }

  req.session.cartItems = cartItems;
  res.json({ cartItems });
});

router.post('/cart/update', (req, res) => {
  const { productId, quantity } = req.body;
  const cartItems = req.session.cartItems || [];
  const item = cartItems.find(item => item.id === productId);

  if (item) {
    item.quantity = quantity;
  }

  req.session.cartItems = cartItems;
  res.json({ cartItems });
});

router.post('/cart/remove', (req, res) => {
  const { productId } = req.body;
  let cartItems = req.session.cartItems || [];
  cartItems = cartItems.filter(item => item.id !== productId);

  req.session.cartItems = cartItems;
  res.json({ cartItems });
});

router.post('/wishlist/add', (req, res) => {
  const { id, name, image, price, size } = req.body;
  const wishlistItems = req.session.wishlistItems || [];
  const existingItem = wishlistItems.find(item => item.id === id && item.size === size);

  if (!existingItem) {
    wishlistItems.push({ id, name, image, price, size });
  }

  req.session.wishlistItems = wishlistItems;
  res.json({ wishlistItems });
});

router.post('/wishlist/remove', (req, res) => {
  const { productId } = req.body;
  let wishlistItems = req.session.wishlistItems || [];
  wishlistItems = wishlistItems.filter(item => item.id !== productId);

  req.session.wishlistItems = wishlistItems;
  res.json({ wishlistItems });
});

router.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Checkout', cartItemCount: req.session.cartItemCount || 0 });
});

router.get('/cart', (req, res) => {
  const cartItems = req.session.cartItems || [];
  res.render('cart', { cartItems, cartItemCount: cartItems.length });
});

router.get('/wishlist', (req, res) => {
  const wishlistItems = req.session.wishlistItems || [];
  res.render('wishlist', { wishlistItems });
});

// ...existing code...

module.exports = router;
