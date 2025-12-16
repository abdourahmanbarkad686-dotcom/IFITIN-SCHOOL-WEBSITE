// ======== Responsive Menu ========
const menuBtn = document.getElementById('menu-btn');
const navList = document.querySelector('nav ul');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
  });
}

// ======== Enroll Form ========
const enrollForm = document.getElementById('enrollForm');
if (enrollForm) {
  enrollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('enrollMessage').textContent =
      'Thank you for enrolling! We will contact you soon.';
    enrollForm.reset();
  });
}

// ======== Contact Form ========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactSuccess').textContent =
      'Your message has been sent successfully!';
    contactForm.reset();
  });
}

// ======== CART SYSTEM (with localStorage + receipt) ========

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const cartCount = document.getElementById('cart-count');

// Update Cart Display
function updateCart() {
  if (!cartContainer) return;

  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = `Total: $${total}`;
  cartCount.textContent = cart.length;
  checkoutBtn.style.display = cart.length > 0 ? 'block' : 'none';

  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

const addButtons = document.querySelectorAll('.add-cart');
addButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const name = item.getAttribute('data-name');
    const price = parseFloat(item.getAttribute('data-price'));
    cart.push({ name, price });
    updateCart();
  });
});

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    checkoutForm.classList.toggle('hidden');
  });
}

// Checkout Form Submission
const form = document.getElementById('checkoutForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const payment = document.getElementById('payment').value;
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Store data for receipt
    localStorage.setItem(
      'receipt',
      JSON.stringify({ name, email, payment, total, cart })
    );

    // Clear cart
    localStorage.removeItem('cart');
    window.location.href = 'receipt.html';
  });
}

document.addEventListener('DOMContentLoaded', updateCart);
