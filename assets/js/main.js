// ============================================
// WALLCACHE WEBSITE - MAIN JAVASCRIPT
// ============================================

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

// ============================================
// ANIMATE ON SCROLL
// ============================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

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
}

// Initialize animate on scroll if elements exist
if (document.querySelector('.animate-on-scroll')) {
    animateOnScroll();
}

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
// GALLERY LIGHTBOX (for future use)
// ============================================
const photoItems = document.querySelectorAll('.photo-item');
photoItems.forEach(item => {
    item.addEventListener('click', function() {
        // Add lightbox functionality here if needed
        console.log('Photo clicked - lightbox would open here');
    });
});

// ============================================
// READING PROGRESS BAR (for blog posts)
// ============================================
function createReadingProgressBar() {
    // Only create on pages with blog posts or long content
    const isContentPage = document.querySelector('.blog-post') ||
                          document.querySelector('.book-card') ||
                          document.querySelector('article');

    if (!isContentPage) return;

    const progressBar = document.createElement('div');
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
    const flickerLetters = document.querySelectorAll('.flicker-letter');
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
        setTimeout(() => {
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
        }, index * 100); // Stagger each letter by 100ms

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

                // Add a subtle scale effect for smoothness
                this.style.transform = 'scale(1.05)';
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

// Initialize letter flicker if element exists
if (document.querySelector('#flicker-name')) {
    initLetterFlicker();
}

// ============================================
// PAGE TRANSITIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Add page-content class to main content areas
    const mainContent = document.querySelector('body');
    if (mainContent) {
        mainContent.classList.add('page-content');
    }

    // Handle all internal links for smooth transitions
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="index.html"], a[href^="cv.html"], a[href^="projects.html"], a[href^="wallcache"], a[href^="renovision"], a[href^="long-form"], a[href^="writing/"], a[href^="logo-"]');

    links.forEach(link => {
        // Skip external links and anchor links
        if (link.hostname !== window.location.hostname && !link.href.includes(window.location.hostname)) {
            return;
        }
        if (link.getAttribute('href')?.startsWith('#')) {
            return;
        }

        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's a special link
            if (!href || href === '#' || href.startsWith('mailto:') || href.startsWith('tel:') || this.target === '_blank') {
                return;
            }

            e.preventDefault();

            // Add transitioning class
            document.body.classList.add('page-transitioning');

            // Navigate after fade out
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
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
// CONSOLE MESSAGE
// ============================================
console.log('%c🎨 WallCache Website', 'font-size: 20px; font-weight: bold; color: #E85D04;');
console.log('%cBuilt with HTML, CSS, and vanilla JavaScript', 'font-size: 12px; color: #4a4a4a;');
console.log('%cDesign: Liquid Glass Aesthetic', 'font-size: 12px; color: #4a4a4a;');
