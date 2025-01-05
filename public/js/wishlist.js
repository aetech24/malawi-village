function addToWishlist(productId) {
  fetch('/wishlist/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: parseInt(productId, 10) }), // Ensure productId is an integer
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add product to wishlist');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        alert(data.message || 'Product added to wishlist');

        // Update the wishlist count
        const wishlistCountElement = document.querySelector('.wishlist-count');
        if (wishlistCountElement) {
          wishlistCountElement.textContent = data.wishlistItemCount || 0;
        }
      } else {
        alert(data.message || 'Failed to add product to wishlist');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while adding the product to the wishlist.');
    });
}

function removeFromWishlist(productId) {
  fetch('/wishlist/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: parseInt(productId, 10) }), // Ensure productId is an integer
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to remove product from wishlist');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        alert(data.message || 'Product removed from wishlist');

        // Remove the product card from the DOM
        const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
        if (productCard) {
          productCard.remove();
        }

        // Update the wishlist count
        const wishlistCountElement = document.querySelector('.wishlist-count');
        if (wishlistCountElement) {
          wishlistCountElement.textContent = data.wishlistItemCount || 0;
        }
      } else {
        alert(data.message || 'Failed to remove product from wishlist');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while removing the product from the wishlist.');
    });
}

// Add event listeners to remove buttons (if needed)
document.addEventListener('DOMContentLoaded', () => {
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      removeFromWishlist(productId);
    });
  });
});