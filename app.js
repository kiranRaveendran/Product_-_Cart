// Sample Product List
const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  // State to track the cart
  let cart = {};
  
  // Function to render the product list
  function renderProductList() {
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = `
      <div class="box">
        <h2>Products</h2>
        ${Products.map(product => `
          <div class="product-item" data-id="${product.id}">
            <span>${product.name} - $${product.price}</span>
            <div class="buttons">
              <button onclick="removeFromCart(${product.id})">-</button>
              <span>${cart[product.id]?.quantity || 0}</span>
              <button onclick="addToCart(${product.id})">+</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // Function to render the cart
  function renderCart() {
    const cartContainer = document.getElementById('cart');
    const cartItems = Object.values(cart);
  
    if (cartItems.length === 0) {
      cartContainer.innerHTML = `
        <div class="box">
          <h2>Cart</h2>
          <p>No Product added to the cart</p>
        </div>
      `;
      return;
    }
  
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
    cartContainer.innerHTML = `
      <div class="box">
        <h2>Cart</h2>
        ${cartItems.map(item => `
          <div class="cart-item">
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
          </div>
        `).join('')}
        <div class="cart-total">Total Price: $${totalPrice}</div>
      </div>
    `;
  }
  
  // Function to add a product to the cart
  function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
  
    if (!cart[productId]) {
      cart[productId] = { ...product, quantity: 1 };
    } else {
      cart[productId].quantity += 1;
    }
  
    renderProductList();
    renderCart();
  }
  
  // Function to remove a product from the cart
  function removeFromCart(productId) {
    if (cart[productId]) {
      cart[productId].quantity -= 1;
  
      if (cart[productId].quantity === 0) {
        delete cart[productId];
      }
    }
  
    renderProductList();
    renderCart();
  }
  
  // Initial render
  renderProductList();
  renderCart();
  