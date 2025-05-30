function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update all cart icons in the page
        const cartIcons = document.querySelectorAll('.icon-link[href="cart.html"]');
        cartIcons.forEach(cartIcon => {
            // Remove any existing count spans
            const existingCount = cartIcon.querySelector('span.cart-count');
            if (existingCount) {
                existingCount.remove();
            }
            
            if (cartCount > 0) {
                const countSpan = document.createElement('span');
                countSpan.className = 'cart-count';
                countSpan.style.cssText = 'font-size: 12px; vertical-align: super; margin-left: 2px;';
                countSpan.textContent = cartCount;
                cartIcon.innerHTML = '🛒';
                cartIcon.appendChild(countSpan);
            } else {
                cartIcon.innerHTML = '🛒';
            }
        });
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Initialize cart functionality
function initializeCart() {
    updateCartCount();
    
    // Update when cart changes in localStorage (from other tabs)
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            updateCartCount();
        }
    });
}

// Run initialization based on document state
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCart);
} else {
    initializeCart();
}