// Enhanced video data with more details
const videos = [
    {
        id: 1,
        title: "iPhone 14 Pro Max - Ultimate Review & Camera Test",
        description: "Complete in-depth review of iPhone 14 Pro Max including Dynamic Island, Always-On Display, and professional camera testing in various lighting conditions.",
        thumbnail: "images/video-thumb-1.jpg",
        videoUrl: "https://www.youtube.com/embed/XCbVbH2c-7c",
        duration: "18:25",
        category: "reviews",
        views: "3.2K",
        date: "Jan 18, 2024",
        product: "iPhone 14 Pro Max",
        featured: true,
        specs: {
            display: "6.7-inch Super Retina XDR",
            camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
            battery: "4323mAh",
            processor: "A16 Bionic",
            storage: "128GB/256GB/512GB/1TB"
        },
        rating: 4.8
    },
    {
        id: 2,
        title: "Samsung Galaxy S23 Ultra - Premium Unboxing Experience",
        description: "First look at the stunning Samsung Galaxy S23 Ultra. Unboxing the premium package and exploring the S Pen features and massive camera system.",
        thumbnail: "images/video-thumb-2.jpg",
        videoUrl: "https://www.youtube.com/embed/3M3D1V0_1Y8",
        duration: "14:10",
        category: "unboxing",
        views: "2.1K",
        date: "Jan 15, 2024",
        product: "Samsung Galaxy S23 Ultra",
        featured: true,
        specs: {
            display: "6.8-inch Dynamic AMOLED 2X",
            camera: "200MP Main + 12MP Ultra Wide + 10MP Telephoto x2",
            battery: "5000mAh",
            processor: "Snapdragon 8 Gen 2",
            storage: "256GB/512GB/1TB"
        },
        rating: 4.7
    },
    {
        id: 3,
        title: "iPhone 14 Pro vs Samsung S23 Ultra - Ultimate Camera Battle",
        description: "Side-by-side camera comparison in daylight, low light, portrait, and video modes. See which flagship camera system performs better.",
        thumbnail: "images/video-thumb-3.jpg",
        videoUrl: "https://www.youtube.com/embed/5J-87bW0-0c",
        duration: "22:45",
        category: "comparison",
        views: "4.5K",
        date: "Jan 12, 2024",
        product: "Comparison",
        featured: true,
        specs: {
            comparison: "Camera, Performance, Battery Life",
            duration: "7-day testing period",
            tests: "20+ different scenarios"
        },
        rating: 4.9
    },
    {
        id: 4,
        title: "Xiaomi 13 Pro - Gaming & Performance Deep Dive",
        description: "Testing gaming performance with Genshin Impact, Call of Duty Mobile, and PUBG. Thermal performance and battery drain analysis included.",
        thumbnail: "images/video-thumb-4.jpg",
        videoUrl: "https://www.youtube.com/embed/8Qn_spdM5K0",
        duration: "16:30",
        category: "reviews",
        views: "1.8K",
        date: "Jan 10, 2024",
        product: "Xiaomi 13 Pro",
        featured: false,
        specs: {
            display: "6.73-inch LTPO AMOLED",
            camera: "50MP Main + 50MP Ultra Wide + 50MP Telephoto",
            battery: "4820mAh",
            processor: "Snapdragon 8 Gen 2",
            storage: "256GB/512GB"
        },
        rating: 4.6
    },
    {
        id: 5,
        title: "10 Hidden Camera Features - Oppo Find X5 Pro",
        description: "Discover professional camera features and hidden settings that will transform your mobile photography experience.",
        thumbnail: "images/video-thumb-5.jpg",
        videoUrl: "https://www.youtube.com/embed/7Q7V-3YSP7c",
        duration: "12:15",
        category: "tips",
        views: "2.3K",
        date: "Jan 8, 2024",
        product: "Oppo Find X5 Pro",
        featured: false,
        specs: {
            display: "6.7-inch LTPO2 AMOLED",
            camera: "50MP Main + 50MP Ultra Wide + 13MP Telephoto",
            battery: "5000mAh",
            processor: "Snapdragon 8 Gen 1",
            storage: "256GB"
        },
        rating: 4.5
    },
    {
        id: 6,
        title: "Vivo X80 Pro - Professional Photography Guide",
        description: "Learn advanced photography techniques with Vivo X80 Pro's ZEISS optics and professional camera modes.",
        thumbnail: "images/video-thumb-6.jpg",
        videoUrl: "https://www.youtube.com/embed/6JQm5aSbXSU",
        duration: "19:20",
        category: "camera",
        views: "1.9K",
        date: "Jan 5, 2024",
        product: "Vivo X80 Pro",
        featured: true,
        specs: {
            display: "6.78-inch AMOLED",
            camera: "50MP Main + 48MP Ultra Wide + 12MP Portrait + 8MP Periscope",
            battery: "4700mAh",
            processor: "Snapdragon 8 Gen 1",
            storage: "256GB/512GB"
        },
        rating: 4.7
    },
    {
        id: 7,
        title: "Realme GT 2 Pro - 7-Day Battery Life Test",
        description: "Real-world battery life testing over 7 days with different usage patterns including gaming, streaming, and standby.",
        thumbnail: "images/video-thumb-7.jpg",
        videoUrl: "https://www.youtube.com/embed/9Y9Z6Z-5Z5c",
        duration: "13:45",
        category: "reviews",
        views: "1.4K",
        date: "Jan 3, 2024",
        product: "Realme GT 2 Pro",
        featured: false,
        specs: {
            display: "6.7-inch LTPO AMOLED",
            camera: "50MP Main + 50MP Ultra Wide + 3MP Microscope",
            battery: "5000mAh",
            processor: "Snapdragon 8 Gen 1",
            storage: "128GB/256GB/512GB"
        },
        rating: 4.4
    },
    {
        id: 8,
        title: "Samsung Z Fold4 vs iPhone 13 - Productivity Showdown",
        description: "Which device is better for work? Testing multitasking, document editing, video calls, and mobile office capabilities.",
        thumbnail: "images/video-thumb-8.jpg",
        videoUrl: "https://www.youtube.com/embed/4J4J4J4J4J4",
        duration: "24:10",
        category: "comparison",
        views: "3.8K",
        date: "Dec 30, 2023",
        product: "Comparison",
        featured: true,
        specs: {
            comparison: "Productivity, Multitasking, Battery",
            duration: "14-day work test",
            apps: "20+ productivity apps tested"
        },
        rating: 4.8
    }
];

// Initialize enhanced videos page
document.addEventListener('DOMContentLoaded', function() {
    renderVideos();
    renderFeaturedVideos();
    setupEventListeners();
    updateCartCount();
    
    // Add loading animation
    showLoadingAnimation();
});

// Show loading animation
function showLoadingAnimation() {
    const videosGrid = document.getElementById('videosGrid');
    if (videosGrid) {
        videosGrid.innerHTML = `
            <div class="loading-spinner" style="grid-column: 1 / -1;">
                <div class="spinner"></div>
            </div>
        `;
        
        // Simulate loading delay
        setTimeout(() => {
            renderVideos();
        }, 1000);
    }
}

// Render videos with enhanced design
function renderVideos(filterCategory = 'all', searchQuery = '') {
    const videosGrid = document.getElementById('videosGrid');
    if (!videosGrid) return;
    
    videosGrid.innerHTML = '';
    
    let filteredVideos = filterCategory === 'all' 
        ? videos 
        : videos.filter(video => video.category === filterCategory);
    
    // Apply search filter if provided
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredVideos = filteredVideos.filter(video => 
            video.title.toLowerCase().includes(query) ||
            video.description.toLowerCase().includes(query) ||
            video.product.toLowerCase().includes(query) ||
            video.category.toLowerCase().includes(query)
        );
    }
    
    if (filteredVideos.length === 0) {
        videosGrid.innerHTML = `
            <div class="no-videos" style="grid-column: 1 / -1;">
                <i class="fas fa-video-slash" style="font-size: 80px; color: var(--gray-text); margin-bottom: 20px;"></i>
                <h3 style="font-size: 24px; margin-bottom: 15px; color: var(--gray-text);">No videos found</h3>
                <p style="color: var(--gray-text);">Try different search terms or browse all categories.</p>
            </div>
        `;
        return;
    }
    
    filteredVideos.forEach(video => {
        const videoCard = createEnhancedVideoCard(video);
        videosGrid.appendChild(videoCard);
    });
}

// Render featured videos
function renderFeaturedVideos() {
    const featuredVideosContainer = document.getElementById('featuredVideos');
    if (!featuredVideosContainer) return;
    
    const featuredVideos = videos.filter(video => video.featured).slice(0, 3);
    
    featuredVideosContainer.innerHTML = '';
    
    featuredVideos.forEach(video => {
        const videoCard = createEnhancedVideoCard(video);
        featuredVideosContainer.appendChild(videoCard);
    });
}

// Create enhanced video card
function createEnhancedVideoCard(video) {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card-enhanced';
    videoCard.setAttribute('data-category', video.category);
    
    const ratingStars = generateRatingStars(video.rating);
    
    videoCard.innerHTML = `
        <div class="video-thumbnail-enhanced">
            <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='images/placeholder.jpg'">
            <div class="video-overlay">
                <div class="video-badge">${video.category.toUpperCase()}</div>
            </div>
            <div class="play-button-enhanced">
                <i class="fas fa-play"></i>
            </div>
            <div class="video-duration-enhanced">${video.duration}</div>
        </div>
        <div class="video-info-enhanced">
            <h3 class="video-title-enhanced">${video.title}</h3>
            <p class="video-description-enhanced">${video.description}</p>
            <div class="video-meta-enhanced">
                <div class="video-stats">
                    <div class="video-stat">
                        <i class="far fa-eye"></i>
                        <span>${video.views}</span>
                    </div>
                    <div class="video-stat">
                        <i class="far fa-calendar"></i>
                        <span>${video.date}</span>
                    </div>
                    <div class="video-stat">
                        <i class="fas fa-star"></i>
                        <span>${video.rating}</span>
                    </div>
                </div>
                <div class="video-category-tag">
                    ${getCategoryIcon(video.category)} ${video.category}
                </div>
            </div>
        </div>
    `;
    
    // Add click event to open video
    videoCard.addEventListener('click', function() {
        openEnhancedVideoModal(video);
    });
    
    return videoCard;
}

// Generate rating stars
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'reviews': '⭐',
        'unboxing': '📦',
        'comparison': '⚖️',
        'tips': '💡',
        'camera': '📷'
    };
    return icons[category] || '🎬';
}

// Setup enhanced event listeners
function setupEventListeners() {
    // Category filter buttons
    const categoryBtns = document.querySelectorAll('.category-btn-enhanced');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter videos
            const category = this.dataset.category;
            renderVideos(category);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('videoSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            const activeCategory = document.querySelector('.category-btn-enhanced.active').dataset.category;
            renderVideos(activeCategory, query);
        });
    }
    
    // Close video modal
    const closeVideoModal = document.getElementById('closeVideoModal');
    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', function() {
            closeVideoModalFunc();
        });
    }
    
    // Close modal when clicking outside or pressing ESC
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeVideoModalFunc();
            }
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.style.display === 'flex') {
                closeVideoModalFunc();
            }
        });
    }
}

// Open enhanced video modal
function openEnhancedVideoModal(video) {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoModalDescription = document.getElementById('videoModalDescription');
    const videoModalDuration = document.getElementById('videoModalDuration');
    const videoModalDate = document.getElementById('videoModalDate');
    const videoModalViews = document.getElementById('videoModalViews');
    const videoSpecs = document.getElementById('videoSpecs');
    
    if (videoModal && videoPlayer) {
        // Set video content
        videoPlayer.innerHTML = `
            <iframe 
                src="${video.videoUrl}?autoplay=1" 
                title="${video.title}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
        
        // Set video info
        videoModalTitle.textContent = video.title;
        videoModalDescription.textContent = video.description;
        videoModalDuration.textContent = `Duration: ${video.duration}`;
        videoModalDate.textContent = `Uploaded: ${video.date}`;
        videoModalViews.textContent = `Views: ${video.views}`;
        
        // Set specifications
        videoSpecs.innerHTML = '';
        if (video.specs) {
            for (const [key, value] of Object.entries(video.specs)) {
                const specItem = document.createElement('div');
                specItem.className = 'spec-item';
                specItem.innerHTML = `
                    <i class="fas fa-check"></i>
                    <span>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</span>
                `;
                videoSpecs.appendChild(specItem);
            }
        }
        
        // Show modal
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close video modal function
function closeVideoModalFunc() {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (videoModal && videoPlayer) {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Stop video when modal closes
        videoPlayer.innerHTML = '';
    }
}

// Update cart count in navigation
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count-nav').forEach(element => {
        element.textContent = count;
    });
}