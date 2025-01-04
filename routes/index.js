const express = require('express');
const router = express.Router();

// ...existing code...

router.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Checkout', cartItemCount: req.session.cartItemCount || 0 });
});

router.get('/cart', (req, res) => {
  const cartItems = req.session.cartItems || [];
  res.render('cart', { cartItems, cartItemCount: cartItems.length });
});

// ...existing code...

module.exports = router;
