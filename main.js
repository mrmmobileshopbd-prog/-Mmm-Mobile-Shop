// Sample product data
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro Max",
        price: 1299,
        image: "images/iphone14.jpg",
        brand: "apple",
        rating: 5,
        isNew: true,
        discount: 10
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        price: 1199,
        image: "images/samsung-s23.jpg",
        brand: "samsung",
        rating: 4,
        isNew: true,
        discount: 5
    },
    {
        id: 3,
        name: "Xiaomi 13 Pro",
        price: 899,
        image: "images/xiaomi-13.jpg",
        brand: "xiaomi",
        rating: 4,
        isNew: false
    },
    {
        id: 4,
        name: "Oppo Find X5 Pro",
        price: 799,
        image: "images/oppo-findx5.jpg",
        brand: "oppo",
        rating: 4,
        isNew: true
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedProducts();
    updateCartCount();
    
    // Show popup on page load
    setTimeout(function() {
        document.getElementById('popupModal').style.display = 'flex';
    }, 500);
    
    // Hide popup after 2 seconds
    setTimeout(function() {
        document.getElementById('popupModal').style.display = 'none';
    }, 2500);
});

// Render featured products
function renderFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (!featuredProductsContainer) return;
    
    featuredProductsContainer.innerHTML = '';
    
    // Get first 4 products for featured section
    const featuredProducts = products.slice(0, 4);
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsContainer.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    let discountBadge = '';
    if (product.discount) {
        discountBadge = `<div class="discount-badge">${product.discount}% OFF</div>`;
    }
    
    let newBadge = '';
    if (product.isNew) {
        newBadge = `<div class="new-badge">NEW</div>`;
    }
    
    productCard.innerHTML = `
        ${discountBadge}
        ${newBadge}
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                ${generateStars(product.rating)}
            </div>
            <div class="product-price">
                ${product.discount ? 
                    `<span style="text-decoration: line-through; color: var(--gray-text); margin-right: 8px;">৳${product.price.toFixed(2)}</span>
                     <span>৳${(product.price * (1 - product.discount/100)).toFixed(2)}</span>` :
                    `৳${product.price.toFixed(2)}`
                }
            </div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Add event listener to Add to Cart button
    const addToCartBtn = productCard.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        addToCart(product.id);
    });
    
    return productCard;
}

// Generate star rating
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.discount ? product.price * (1 - product.discount/100) : product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToLocalStorage();
    showToast(`${product.name} added to cart!`);
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

// Get cart data
function getCart() {
    return cart;
}

// Update cart data
function updateCart(newCart) {
    cart = newCart;
    saveCartToLocalStorage();
    updateCartCount();
}