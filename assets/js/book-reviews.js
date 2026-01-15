// ============================================
// BOOK REVIEWS - DISPLAY LOGIC
// ============================================

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = parseInt(rating);
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    for (let i = fullStars; i < 5; i++) {
        stars += '☆';
    }
    return stars;
}

// Generate HTML for a single review
function generateReviewHtml(review, index) {
    const cardClass = index % 2 === 0 ? 'navy-card' : 'paper-card';

    const paragraphsHtml = review.paragraphs
        .map(p => `<p style="font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.75rem;">${p}</p>`)
        .join('');

    return `
        <div class="${cardClass}">
            <h3 class="handwriting tilt-light" style="font-size: 1.5rem; margin-bottom: 0.5rem;">${review.title}</h3>
            <p style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem;">${review.author}</p>
            <div style="color: var(--burnt-orange); margin-bottom: 0.75rem; font-size: 0.9rem;">${generateStars(review.rating)}</div>
            <p style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 0.75rem;">Finished: ${review.finished}</p>
            ${paragraphsHtml}
        </div>
    `;
}

// Load all reviews
function loadAllReviews() {
    console.log('Loading book reviews...');
    const container = document.getElementById('reviews-container');

    if (!container) {
        console.error('Reviews container not found');
        return;
    }

    // Check if reviewsData is available
    if (typeof reviewsData === 'undefined') {
        console.error('Reviews data not loaded');
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: red;">Error: Reviews data not found. Make sure reviews-data.js is loaded.</p>';
        return;
    }

    console.log(`Found ${reviewsData.length} reviews`);

    if (reviewsData.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">No reviews found.</p>';
        return;
    }

    // Generate HTML for all reviews
    const reviewsHtml = reviewsData.map((review, index) => generateReviewHtml(review, index)).join('');

    container.innerHTML = reviewsHtml;

    // Re-initialize scroll animations if they exist
    if (typeof initScrollAnimations === 'function') {
        setTimeout(initScrollAnimations, 100);
    }

    console.log('Reviews loaded successfully!');
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllReviews);
} else {
    loadAllReviews();
}
