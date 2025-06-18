let cartItems = []; // To store cart items

// Filter blogs by category
function filterBlogs(category) {
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    if (category === 'featured' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  const buttons = document.querySelectorAll('.category-menu button');
  buttons.forEach(btn => btn.classList.remove('active'));
  const activeButton = document.querySelector(`button[onclick="filterBlogs('${category}')"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Open modal for blog details
function openModal(postId, postTitle, postContent) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <h3>${postTitle}</h3>
    <p>${postContent}</p>
    <button onclick="addToCart('${postTitle}')">Add to Cart</button>
  `;
  modal.style.display = 'flex';
}

// Close modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Add item to cart
function addToCart(item) {
  const existingItem = cartItems.find(cartItem => cartItem.name === item);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ name: item, quantity: 1 });
  }
  updateCartCount();
  closeModal();
}

// Update cart count
function updateCartCount() {
  const totalItems = cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  document.getElementById('cart-count').innerText = totalItems;
}

// Open cart
function openCart() {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  
  if (cartItems.length === 0) {
    modalBody.innerHTML = '<p>Your cart is empty!</p>';
  } else {
    modalBody.innerHTML = `
      <h3>Cart Items</h3>
      <ul>
        ${cartItems.map(cartItem => `
          <li>
            ${cartItem.name} - Quantity: ${cartItem.quantity}
            <button onclick="addToCart('${cartItem.name}')">+</button>
            <button onclick="removeFromCart('${cartItem.name}')">-</button>
          </li>
        `).join('')}
      </ul>
    `;
  }
  modal.style.display = 'flex';
}

// Remove item from cart
function removeFromCart(item) {
  const itemIndex = cartItems.findIndex(cartItem => cartItem.name === item);
  if (itemIndex > -1) {
    if (cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity -= 1;
    } else {
      cartItems.splice(itemIndex, 1);
    }
  }
  updateCartCount();
  openCart(); // Refresh cart display
}

// Attach read more functionality
document.addEventListener('DOMContentLoaded', () => {
  const readMoreLinks = document.querySelectorAll('.read-more');
  readMoreLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const postId = link.dataset.postId;

      const blogPosts = {
        paratha: { title: 'Paratha Love', content: 'The very mention of paratha...' },
        dalkhichdi: { title: 'Dal Khichdi Recipes', content: 'Dal Khichdi is comfort food...' },
        biryani: { title: 'Boneless Biryani', content: 'Biryani lovers rejoice!' }
      };

      const post = blogPosts[postId];
      if (post) openModal(postId, post.title, post.content);
    });
  });
});

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
}
