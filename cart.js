// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    renderCartItems();
    updateCartCount();
    setupEventListeners();
});

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart to continue shopping.</p>
                <a href="products.html" class="btn" style="margin-top: 20px;">Continue Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">৳${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly data-id="${item.id}">
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners
    setupCartItemEventListeners();
    updateCartSummary();
}

// Setup event listeners for cart items
function setupCartItemEventListeners() {
    // Quantity controls
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            updateQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            updateQuantity(id, 1);
        });
    });
    
    // Remove item
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            removeFromCart(id);
        });
    });
}

// Setup page event listeners
function setupEventListeners() {
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showToast('Your cart is empty!');
                return;
            }
            
            // Show order slip modal
            showOrderSlip();
        });
    }
    
    // Confirm order button
    const confirmOrderBtn = document.getElementById('confirmOrder');
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', function() {
            sendWhatsAppOrder();
        });
    }
    
    // Cancel order button
    const cancelOrderBtn = document.getElementById('cancelOrder');
    if (cancelOrderBtn) {
        cancelOrderBtn.addEventListener('click', function() {
            document.getElementById('orderSlipModal').style.display = 'none';
        });
    }
}

// Update quantity
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            // Update the input field
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            if (input) {
                input.value = item.quantity;
            }
            
            saveCartToLocalStorage();
            updateCartSummary();
        }
    }
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToLocalStorage();
    renderCartItems();
    updateCartCount();
    showToast('Product removed from cart.', 'info');
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate shipping (simplified logic)
    const shipping = subtotal > 0 ? 130 : 0;
    
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `৳${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `৳${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `৳${total.toFixed(2)}`;
}

// Update cart count in navigation
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count-nav').forEach(element => {
        element.textContent = count;
    });
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show order slip
function showOrderSlip() {
    const orderDetails = document.getElementById('orderDetails');
    if (!orderDetails) return;
    
    orderDetails.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>৳${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderDetails.appendChild(orderItem);
    });
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 130 : 0;
    const total = subtotal + shipping;
    
    const orderTotal = document.createElement('div');
    orderTotal.className = 'order-total';
    orderTotal.innerHTML = `
        <span>Total:</span>
        <span>৳${total.toFixed(2)}</span>
    `;
    orderDetails.appendChild(orderTotal);
    
    document.getElementById('orderSlipModal').style.display = 'flex';
}

// Send WhatsApp order
function sendWhatsAppOrder() {
    const phoneNumber = '01611134095';
    let message = 'Hello, I would like to place an order from MRM Mobile Shop:\n\n';
    
    // Add order items
    cart.forEach(item => {
        message += `• ${item.name} x ${item.quantity} - ৳${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 130 : 0;
    const total = subtotal + shipping;
    
    message += `\nSubtotal: ৳${subtotal.toFixed(2)}`;
    message += `\nShipping: ৳${shipping.toFixed(2)}`;
    message += `\nTotal: ৳${total.toFixed(2)}`;
    message += '\n\nPlease confirm my order. Thank you!';
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Close modal and clear cart
    document.getElementById('orderSlipModal').style.display = 'none';
    cart = [];
    saveCartToLocalStorage();
    renderCartItems();
    updateCartCount();
    
    showToast('Order sent via WhatsApp!', 'success');
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.style.backgroundColor = type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}