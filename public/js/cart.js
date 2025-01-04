function addToCart(productId) {
  fetch('/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId: productId })
  }).then(response => response.json())
    .then(data => {
      if (data.message === 'Product added to cart') {
        alert('Product added to cart');
        document.querySelector('.cart-count').textContent = data.cartItemCount;
      } else {
        alert('Failed to add product to cart');
      }
    });
}
