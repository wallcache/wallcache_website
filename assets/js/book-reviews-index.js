// ============================================
// BOOK REVIEWS INDEX - GRID DISPLAY
// ============================================

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

function generateBookCard(book, index) {
    const cardClass = index % 2 === 0 ? 'navy-card' : 'paper-card';

    return `
        <a href="reviews/${book.slug}.html" style="text-decoration: none; color: inherit;">
            <div class="${cardClass}" style="cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;">
                <h3 class="handwriting tilt-light" style="font-size: 1.4rem; margin-bottom: 0.5rem;">${book.title}</h3>
                <p style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">${book.author}</p>
                <div style="color: var(--burnt-orange); font-size: 1rem; margin-bottom: 0.5rem;">
                    ${generateStars(book.rating)}
                </div>
                <p style="font-size: 0.85rem; opacity: 0.7;">Finished: ${book.finished}</p>
            </div>
        </a>
    `;
}

function loadBooksIndex() {
    console.log('Loading book reviews index...');
    const container = document.getElementById('books-grid');

    if (!container) {
        console.error('Books grid container not found');
        return;
    }

    if (typeof reviewsIndex === 'undefined') {
        console.error('Reviews index not loaded');
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: red;">Error: Could not load books list.</p>';
        return;
    }

    console.log(`Found ${reviewsIndex.length} books`);

    if (reviewsIndex.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">No reviews found.</p>';
        return;
    }

    const booksHtml = reviewsIndex.map((book, index) => generateBookCard(book, index)).join('');
    container.innerHTML = booksHtml;

    // Add hover effect
    const cards = container.querySelectorAll('.navy-card, .paper-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Re-initialize scroll animations
    if (typeof initScrollAnimations === 'function') {
        setTimeout(initScrollAnimations, 100);
    }

    console.log('Books loaded successfully!');
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBooksIndex);
} else {
    loadBooksIndex();
}
