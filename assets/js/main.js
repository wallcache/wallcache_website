// ============================================
// WALLCACHE WEBSITE - MAIN JAVASCRIPT
// ============================================

// ============================================
// COMPONENT STATE TRACKING
// ============================================
const componentState = {
    observers: [],  // IntersectionObservers to disconnect on cleanup
    intervals: [],  // Intervals to clear on cleanup
    timeouts: []    // Timeouts to clear on cleanup
};

// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Update aria-expanded for accessibility
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);

            // Animate icon (optional - change hamburger to X)
            this.textContent = isExpanded ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when window is resized above mobile breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add 'scrolled' class when scrolled down
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't prevent default for empty hash or just '#'
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Get header height for offset
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.textContent = '☰';
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
}

// Initialize smooth scroll
initSmoothScroll();

// ============================================
// ANIMATE ON SCROLL
// ============================================
function initAnimateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });

    // Store observer for cleanup
    componentState.observers.push(observer);
}

// Initialize animate on scroll
initAnimateOnScroll();

// ============================================
// FADE IN ON LOAD
// ============================================
window.addEventListener('load', function() {
    const fadeElements = document.querySelectorAll('.fade-in-up');

    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ============================================
// FORM VALIDATION (if forms are added later)
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Handle newsletter forms if they exist
const newsletterForms = document.querySelectorAll('form[data-newsletter]');
newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && validateEmail(emailInput.value)) {
            // Handle newsletter subscription
            console.log('Newsletter subscription:', emailInput.value);
            // Add your subscription logic here
            alert('Thanks for subscribing! (This is a demo - no actual subscription created)');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
});

// ============================================
// LAZY LOAD IMAGES (for future use)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }

                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// GALLERY LIGHTBOX
// ============================================
function initLightbox() {
    // Create lightbox element if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close lightbox">✕</button>
            <div class="lightbox-content">
                <img src="" alt="Lightbox image">
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Add click handlers to photo items (but not logo items which are links)
    const photoItems = document.querySelectorAll('.photo-item:not(a .photo-item)');
    photoItems.forEach(item => {
        // Skip if parent is an anchor tag (logo items)
        if (item.closest('a')) {
            return;
        }

        item.addEventListener('click', function(e) {
            e.preventDefault();
            const img = this.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox on close button click
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeLightbox();
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize lightbox
initLightbox();

// ============================================
// MASONRY LAYOUT FOR PHOTO GALLERY
// ============================================
function initMasonryLayout() {
    const galleries = document.querySelectorAll('.photo-gallery');

    galleries.forEach(gallery => {
        // Get items - for logo pages, get the photo-item inside anchor tags
        const items = gallery.querySelectorAll('.photo-item');

        items.forEach(item => {
            const img = item.querySelector('img');

            if (img) {
                // Function to calculate and set row span
                const setRowSpan = () => {
                    const rowHeight = 10; // matches grid-auto-rows in CSS
                    const rowGap = 24; // matches gap in CSS (1.5rem = 24px)

                    // Get the actual rendered height of the image
                    const imgHeight = img.offsetHeight;

                    if (imgHeight > 0) {
                        // Calculate how many rows this image should span
                        const rowSpan = Math.ceil((imgHeight + rowGap) / (rowHeight + rowGap));

                        // Apply to parent if it's an anchor (logo page), otherwise to item itself
                        const targetElement = item.closest('a') || item;
                        targetElement.style.gridRowEnd = `span ${rowSpan}`;
                    }
                };

                // Set row span after image loads
                if (img.complete) {
                    setRowSpan();
                } else {
                    img.addEventListener('load', setRowSpan);
                }

                // Recalculate on window resize
                window.addEventListener('resize', debounce(setRowSpan, 200));
            }
        });
    });
}

// Initialize masonry layout
window.addEventListener('load', initMasonryLayout);

// ============================================
// READING PROGRESS BAR (for blog posts)
// ============================================
function createReadingProgressBar() {
    // Remove old progress bar if it exists
    const oldProgressBar = document.querySelector('.reading-progress-bar');
    if (oldProgressBar) {
        oldProgressBar.remove();
    }

    // Only create on pages with blog posts or long content
    const isContentPage = document.querySelector('.blog-post') ||
                          document.querySelector('.book-card') ||
                          document.querySelector('article');

    if (!isContentPage) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-orange), var(--primary-orange-light));
        z-index: 9999;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize reading progress bar
createReadingProgressBar();

// ============================================
// CURRENT PAGE HIGHLIGHT IN NAV
// ============================================
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        // Check if current page matches link
        if (linkPath === currentPath) {
            link.style.color = 'var(--burnt-orange)';
            link.classList.add('active');
        }
    });
}

// Highlight current page in navigation
highlightCurrentPage();

// ============================================
// PERFORMANCE: DEBOUNCE FUNCTION
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounce for scroll and resize events if needed
const debouncedScroll = debounce(function() {
    // Additional scroll handling if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.focus();
            }
        }
    }
});

// ============================================
// LETTER FLICKER ANIMATION FOR HAL WALL
// ============================================
function initLetterFlicker() {
    const flickerElement = document.querySelector('#flicker-name');
    if (!flickerElement) return;

    const flickerLetters = flickerElement.querySelectorAll('.flicker-letter');
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';

    flickerLetters.forEach((letter, index) => {
        let flickerInterval = null;
        const originalLetter = letter.textContent;

        // Skip spaces
        if (originalLetter.trim() === '') {
            return;
        }

        // Determine if original letter is uppercase or lowercase
        const isUppercase = originalLetter === originalLetter.toUpperCase();
        const letterSet = isUppercase ? uppercaseLetters : lowercaseLetters;

        // Measure the natural width of this letter, then lock it
        // This preserves natural spacing but prevents layout shift during flicker
        letter.style.display = 'inline-block';
        letter.style.position = 'relative';
        const naturalWidth = letter.getBoundingClientRect().width;
        letter.style.minWidth = naturalWidth + 'px';
        letter.style.width = naturalWidth + 'px';
        letter.style.overflow = 'visible';
        letter.style.textAlign = 'center';
        letter.style.verticalAlign = 'top';

        // Play animation once on page load
        const loadTimeout = setTimeout(() => {
            let iterations = 0;
            const maxIterations = 12;

            flickerInterval = setInterval(() => {
                const randomLetter = letterSet[Math.floor(Math.random() * letterSet.length)];
                letter.textContent = randomLetter;
                iterations++;

                if (iterations >= maxIterations) {
                    clearInterval(flickerInterval);
                    letter.textContent = originalLetter;
                }
            }, 60);

            // Store interval for cleanup
            if (flickerInterval) componentState.intervals.push(flickerInterval);
        }, index * 100); // Stagger each letter by 100ms

        // Store timeout for cleanup
        componentState.timeouts.push(loadTimeout);

        letter.addEventListener('mouseenter', function() {
            let iterations = 0;
            const maxIterations = 8; // Faster completion

            // Clear any existing interval
            if (flickerInterval) {
                clearInterval(flickerInterval);
            }

            // Fast flicker - every 50ms for quicker mouse-over response
            flickerInterval = setInterval(() => {
                // Get random letter from the appropriate case set
                const randomLetter = letterSet[Math.floor(Math.random() * letterSet.length)];

                // Subtle scale effect (no blur)
                this.style.transform = 'scale(1.02)';
                this.textContent = randomLetter;

                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 25);

                iterations++;

                // After max iterations, return to original with smooth transition
                if (iterations >= maxIterations) {
                    clearInterval(flickerInterval);
                    setTimeout(() => {
                        this.textContent = originalLetter;
                        this.style.transform = 'scale(1)';
                    }, 30);
                }
            }, 50); // 50 milliseconds = faster for quick mouse passes
        });

        letter.addEventListener('mouseleave', function() {
            // Stop flickering and restore original letter smoothly
            if (flickerInterval) {
                clearInterval(flickerInterval);
            }
            setTimeout(() => {
                this.textContent = originalLetter;
                this.style.transform = 'scale(1)';
            }, 50);
        });

        // Add cursor pointer style and smooth transitions
        letter.style.cursor = 'pointer';
        letter.style.display = 'inline-block';
        letter.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
    });
}

// Initialize letter flicker
initLetterFlicker();

// ============================================
// PAGE TRANSITIONS - SPA NAVIGATION
// ============================================

// Helper: Close mobile menu
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.textContent = '☰';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    }
}

// Helper: Extract main content (everything between header and footer)
function extractMainContent(doc) {
    const header = doc.querySelector('header');
    const footer = doc.querySelector('footer');
    const contentNodes = [];
    let currentNode = header ? header.nextElementSibling : doc.body.firstElementChild;

    while (currentNode && currentNode !== footer) {
        contentNodes.push(currentNode);
        currentNode = currentNode.nextElementSibling;
    }

    return contentNodes;
}

// Helper: Clean up component state (observers, intervals, timeouts)
function cleanupComponents() {
    // Disconnect all observers
    componentState.observers.forEach(observer => {
        if (observer && observer.disconnect) {
            observer.disconnect();
        }
    });
    componentState.observers = [];

    // Clear all intervals
    componentState.intervals.forEach(interval => {
        if (interval) clearInterval(interval);
    });
    componentState.intervals = [];

    // Clear all timeouts
    componentState.timeouts.forEach(timeout => {
        if (timeout) clearTimeout(timeout);
    });
    componentState.timeouts = [];
}

// Helper: Re-initialize all components after content swap
function reinitializeComponents() {
    // Clean up old state
    cleanupComponents();

    // Re-run all content-specific initializers
    initSmoothScroll();           // Anchor links
    initAnimateOnScroll();        // IntersectionObserver animations
    initLightbox();               // Gallery lightbox
    initMasonryLayout();          // Photo gallery layout
    createReadingProgressBar();   // Progress bar for long content
    highlightCurrentPage();       // Current page highlighting in nav
    initLetterFlicker();          // Letter flicker (home page only)
    initScrollAnimations();       // Scroll-triggered animations
    updateHeaderTheme();          // Dark theme switching
    initCVScrollTracker();        // CV page scroll tracker

    // Note: Mobile menu and header scroll effects persist (on header element)
}

// Core navigation function
async function navigateToPage(url) {
    try {
        // 1. Close mobile menu if open
        closeMobileMenu();

        // 2. Start fetching the new page immediately (parallel with fade)
        const fetchPromise = fetch(url);

        // 3. Get current content and prepare for transition
        const currentContent = extractMainContent(document);
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        if (!header || !footer) {
            throw new Error('Header or footer not found');
        }

        // 4. Fade out current content
        currentContent.forEach(node => {
            node.style.transition = 'opacity 0.3s ease-out';
            node.style.opacity = '0';
        });

        // Wait for both fade and fetch
        const [_, response] = await Promise.all([
            new Promise(resolve => setTimeout(resolve, 300)),
            fetchPromise
        ]);

        if (!response.ok) throw new Error('Page not found');

        const html = await response.text();

        // 5. Parse HTML
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');

        // 6. Extract new content
        const newContent = extractMainContent(newDoc);

        // 7. Update page metadata
        document.title = newDoc.title;

        const currentMeta = document.querySelectorAll('meta[name="description"], meta[property^="og:"]');
        const newMeta = newDoc.querySelectorAll('meta[name="description"], meta[property^="og:"]');

        currentMeta.forEach((meta, index) => {
            if (newMeta[index]) {
                meta.setAttribute('content', newMeta[index].getAttribute('content'));
            }
        });

        // 8. Update browser history
        window.history.pushState({ path: url }, '', url);

        // 9. Remove old content
        currentContent.forEach(node => node.remove());

        // 10. Scroll to top
        window.scrollTo(0, 0);

        // 11. Insert new content
        let insertPoint = header;
        newContent.forEach(node => {
            const clonedNode = node.cloneNode(true);
            clonedNode.style.opacity = '0';
            insertPoint.after(clonedNode);
            insertPoint = clonedNode;
        });

        // 12. Trigger fade-in
        await new Promise(resolve => requestAnimationFrame(resolve));

        const insertedContent = extractMainContent(document);
        insertedContent.forEach(node => {
            node.style.transition = 'opacity 0.5s ease-out';
            node.style.opacity = '1';
        });

        // 13. Re-initialize all components
        await new Promise(resolve => setTimeout(resolve, 100));
        reinitializeComponents();

    } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to traditional navigation on error
        window.location.href = url;
    }
}

// Check if link is internal
function isInternalLink(link) {
    const href = link.getAttribute('href');

    // Skip these cases
    if (!href || href === '#' || href.startsWith('#') ||
        href.startsWith('mailto:') || href.startsWith('tel:') ||
        link.target === '_blank') {
        return false;
    }

    // Check if same origin
    try {
        const linkURL = new URL(href, window.location.origin);
        return linkURL.origin === window.location.origin;
    } catch {
        // Relative URL, assume internal
        return true;
    }
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Set initial browser state
    window.history.replaceState({ path: window.location.pathname }, '', window.location.pathname);

    // Handle back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.path) {
            navigateToPage(e.state.path);
        }
    });

    // Intercept all link clicks using event delegation
    document.body.addEventListener('click', function(e) {
        const link = e.target.closest('a');

        if (!link || !isInternalLink(link)) {
            return;
        }

        e.preventDefault();
        const href = link.getAttribute('href');

        // Don't navigate if same page
        if (href === window.location.pathname || href === window.location.pathname.split('/').pop()) {
            return;
        }

        navigateToPage(href);
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.paper-card, .navy-card, .project-card, .book-card, .blog-post, .photo-item');

    elements.forEach(el => {
        if (!el.classList.contains('scroll-animate')) {
            el.classList.add('scroll-animate');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });

    // Store observer for cleanup
    componentState.observers.push(observer);
}

// Initialize scroll animations
initScrollAnimations();

// ============================================
// DYNAMIC HEADER THEME SWITCHING
// ============================================
function updateHeaderTheme() {
    const header = document.querySelector('header');
    if (!header) return;

    // Get all sections with dark backgrounds
    const darkSections = document.querySelectorAll('.blueprint-grid, .navy-card, footer');
    const headerRect = header.getBoundingClientRect();
    const headerMiddle = headerRect.top + (headerRect.height / 2);

    let isOverDark = false;

    darkSections.forEach(section => {
        const sectionRect = section.getBoundingClientRect();

        // Check if header middle point is within a dark section
        if (headerMiddle >= sectionRect.top && headerMiddle <= sectionRect.bottom) {
            isOverDark = true;
        }
    });

    // Toggle dark-theme class
    if (isOverDark) {
        header.classList.add('dark-theme');
    } else {
        header.classList.remove('dark-theme');
    }
}

// Update on scroll with debouncing
let themeUpdateTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(themeUpdateTimeout);
    themeUpdateTimeout = setTimeout(updateHeaderTheme, 10);
});

// Update on load
window.addEventListener('load', updateHeaderTheme);

// Update on resize
window.addEventListener('resize', debounce(updateHeaderTheme, 100));

// ============================================
// CV PAGE SCROLL TRACKER
// ============================================
function initCVScrollTracker() {
    // Only run on CV page
    const isCVPage = window.location.pathname.includes('cv.html') ||
                     document.querySelector('.timeline');

    if (!isCVPage) return;

    // Create scroll tracker element
    const tracker = document.createElement('div');
    tracker.className = 'cv-scroll-tracker';
    tracker.innerHTML = `
        <div class="tracker-line"></div>
        <div class="tracker-progress"></div>
        <div class="tracker-dot"></div>
    `;

    // Add styles
    tracker.style.cssText = `
        position: fixed;
        right: 3rem;
        top: 50%;
        transform: translateY(-50%);
        height: 60vh;
        width: 4px;
        z-index: 100;
        display: none;
    `;

    document.body.appendChild(tracker);

    const trackerLine = tracker.querySelector('.tracker-line');
    const trackerProgress = tracker.querySelector('.tracker-progress');
    const trackerDot = tracker.querySelector('.tracker-dot');

    trackerLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 100%;
        background: rgba(232, 93, 4, 0.2);
        border-radius: 2px;
    `;

    trackerProgress.style.cssText = `
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 0%;
        background: linear-gradient(180deg, #E85D04, #DC2F02);
        border-radius: 2px;
        transition: height 0.2s ease;
    `;

    trackerDot.style.cssText = `
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        background: #E85D04;
        border: 2px solid #FAF7F2;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(232, 93, 4, 0.3);
        transition: top 0.2s ease;
    `;

    function updateTracker() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Show tracker after scrolling past header
        if (scrollTop > 300) {
            tracker.style.display = 'block';
        } else {
            tracker.style.display = 'none';
        }

        // Update progress bar and dot position
        trackerProgress.style.height = scrollPercent + '%';
        trackerDot.style.top = scrollPercent + '%';
    }

    // Update on scroll
    window.addEventListener('scroll', debounce(updateTracker, 10));

    // Initial update
    updateTracker();

    // Hide on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMobile(e) {
        if (e.matches) {
            tracker.style.display = 'none';
        }
    }
    mediaQuery.addListener(handleMobile);
    handleMobile(mediaQuery);
}

// Initialize CV scroll tracker
initCVScrollTracker();

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🎨 WallCache Website', 'font-size: 20px; font-weight: bold; color: #E85D04;');
console.log('%cBuilt with HTML, CSS, and vanilla JavaScript', 'font-size: 12px; color: #4a4a4a;');
console.log('%cDesign: Liquid Glass Aesthetic', 'font-size: 12px; color: #4a4a4a;');
