// Sample product data (extended)
const allProducts = [
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
    },
    {
        id: 5,
        name: "Vivo X80 Pro",
        price: 899,
        image: "images/vivo-x80.jpg",
        brand: "vivo",
        rating: 4,
        isNew: false
    },
    {
        id: 6,
        name: "Realme GT 2 Pro",
        price: 699,
        image: "images/realme-gt2.jpg",
        brand: "realme",
        rating: 4,
        isNew: true,
        discount: 15
    },
    {
        id: 7,
        name: "iPhone 13",
        price: 799,
        image: "images/iphone13.jpg",
        brand: "apple",
        rating: 4,
        isNew: false
    },
    {
        id: 8,
        name: "Samsung Galaxy Z Fold4",
        price: 1799,
        image: "images/samsung-fold4.jpg",
        brand: "samsung",
        rating: 5,
        isNew: true,
        discount: 8
    }
];

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    renderAllProducts();
    setupEventListeners();
    updateCartCount();
});

// Render all products
function renderAllProducts(filteredProducts = allProducts) {
    const allProductsContainer = document.getElementById('allProducts');
    if (!allProductsContainer) return;
    
    allProductsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        allProductsContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 40px;">No products found matching your criteria.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        allProductsContainer.appendChild(productCard);
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

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterProducts();
        });
    }
    
    // Brand filter
    const brandFilter = document.getElementById('brandFilter');
    if (brandFilter) {
        brandFilter.addEventListener('change', function() {
            filterProducts();
        });
    }
}

// Filter products
function filterProducts() {
    const searchInput = document.getElementById('searchInput');
    const brandFilter = document.getElementById('brandFilter');
    
    if (!searchInput || !brandFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const brand = brandFilter.value;
    
    let filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesBrand = brand === 'all' || product.brand === brand;
        
        return matchesSearch && matchesBrand;
    });
    
    renderAllProducts(filteredProducts);
}

// Add to cart function
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
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
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

// Update cart count in navigation
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count-nav').forEach(element => {
        element.textContent = count;
    });
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