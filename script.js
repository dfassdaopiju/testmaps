/**
 * MARMA POLSKIE FOLIE - Website JavaScript
 * Professional, advanced website functionality
 * Author: AI Assistant
 * Version: 1.0.0
 */

// ===== GLOBAL VARIABLES =====
let lastScrollY = window.scrollY;
let ticking = false;
let isMenuOpen = false;

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function for performance optimization
 */
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

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(target, duration = 1000) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 80; // Account for fixed navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

/**
 * Create typing animation effect
 */
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * Animate counter numbers
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== LOADING SCREEN =====
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.init();
    }

    init() {
        // Simulate loading time
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hide();
            }, 2000);
        });
    }

    hide() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 500);
        }
    }
}

// ===== NAVIGATION =====
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleActiveLinks();
        this.handleDropdowns();
    }

    handleScroll() {
        const handleScrollEvent = throttle(() => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for backdrop effect
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        }, 10);

        window.addEventListener('scroll', handleScrollEvent);
    }

    handleMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (isMenuOpen && !this.navbar.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        isMenuOpen = false;
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleActiveLinks() {
        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        smoothScrollTo(target);
                        this.closeMobileMenu();
                        this.setActiveLink(link);
                    }
                }
            });
        });

        // Set active link based on scroll position
        const handleActiveOnScroll = throttle(() => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        this.setActiveLink(activeLink);
                    }
                }
            });
        }, 100);

        window.addEventListener('scroll', handleActiveOnScroll);
    }

    setActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    handleDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            if (dropdownMenu) {
                // Touch device support
                if ('ontouchstart' in window) {
                    dropdown.addEventListener('click', (e) => {
                        e.preventDefault();
                        dropdownMenu.style.opacity = dropdownMenu.style.opacity === '1' ? '0' : '1';
                        dropdownMenu.style.visibility = dropdownMenu.style.visibility === 'visible' ? 'hidden' : 'visible';
                    });
                }
            }
        });
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.animateCounters();
        this.animateProgressBars();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    const suffix = counter.textContent.replace(/\d/g, '');
                    
                    animateCounter(counter, target);
                    
                    // Add suffix back after animation
                    setTimeout(() => {
                        counter.textContent = target + suffix;
                    }, 2000);
                    
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width') || '100%';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                    
                    progressObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
}

// ===== PRODUCT INTERACTIONS =====
class ProductInteractions {
    constructor() {
        this.productCards = document.querySelectorAll('.product-category');
        this.productButtons = document.querySelectorAll('.product-btn');
        this.init();
    }

    init() {
        this.handleProductHovers();
        this.handleProductButtons();
        this.handleProductFiltering();
    }

    handleProductHovers() {
        this.productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }

    addHoverEffect(card) {
        const icon = card.querySelector('.product-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    }

    removeHoverEffect(card) {
        const icon = card.querySelector('.product-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    handleProductButtons() {
        this.productButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const category = button.closest('.product-category').getAttribute('data-category');
                this.showProductDetails(category);
            });
        });
    }

    showProductDetails(category) {
        // Create modal or redirect to product page
        console.log(`Showing details for category: ${category}`);
        
        // For now, show an alert (can be replaced with modal)
        const categoryNames = {
            'building': 'Produkty dla budownictwa',
            'agriculture': 'Rolnictwo i ogrodnictwo',
            'packaging': 'Opakowania',
            'technical': 'Folie techniczne'
        };

        const message = `Więcej informacji o kategorii: ${categoryNames[category] || category}`;
        this.showNotification(message, 'info');
    }

    handleProductFiltering() {
        // Add product filtering functionality if needed
        const filterButtons = document.querySelectorAll('.product-filter');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProducts(filter);
            });
        });
    }

    filterProducts(filter) {
        this.productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0.3';
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Remove on click
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// ===== CONTACT FORM =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.handleSubmit();
            this.handleValidation();
            this.handleFieldAnimations();
        }
    }

    handleSubmit() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                await this.submitForm();
            }
        });
    }

    handleValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    handleFieldAnimations() {
        const fields = this.form.querySelectorAll('.form-group');
        
        fields.forEach(field => {
            const input = field.querySelector('input, textarea, select');
            const label = field.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    field.classList.add('focused');
                });

                input.addEventListener('blur', () => {
                    if (!input.value) {
                        field.classList.remove('focused');
                    }
                });

                // Check if field has value on load
                if (input.value) {
                    field.classList.add('focused');
                }
            }
        });
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate email
        const emailField = this.form.querySelector('input[type="email"]');
        if (emailField && !this.validateEmail(emailField.value)) {
            this.showFieldError(emailField, 'Podaj prawidłowy adres email');
            isValid = false;
        }

        // Validate consent checkbox
        const consentField = this.form.querySelector('#consent');
        if (consentField && !consentField.checked) {
            this.showFieldError(consentField, 'Musisz wyrazić zgodę na przetwarzanie danych');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'To pole jest wymagane');
            return false;
        }

        if (field.type === 'email' && value && !this.validateEmail(value)) {
            this.showFieldError(field, 'Podaj prawidłowy adres email');
            return false;
        }

        this.clearFieldError(field);
        return true;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.appendChild(errorElement);
            formGroup.classList.add('error');
        }
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            const existingError = formGroup.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            formGroup.classList.remove('error');
        }
    }

    async submitForm() {
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <svg class="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
            </svg>
            <span>Wysyłanie...</span>
        `;
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showFormMessage('Dziękujemy! Wiadomość została wysłana pomyślnie.', 'success');
            this.form.reset();
            
        } catch (error) {
            // Show error message
            this.showFormMessage('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.', 'error');
            
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showFormMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.textContent = message;
        
        this.form.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.parentNode.removeChild(messageElement);
                }
            }, 300);
        }, 5000);
    }
}

// ===== BACK TO TOP BUTTON =====
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        if (this.button) {
            this.handleScroll();
            this.handleClick();
        }
    }

    handleScroll() {
        const handleScrollEvent = throttle(() => {
            if (window.scrollY > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, 100);

        window.addEventListener('scroll', handleScrollEvent);
    }

    handleClick() {
        this.button.addEventListener('click', () => {
            smoothScrollTo(document.body, 1000);
        });
    }
}

// ===== LAZY LOADING =====
class LazyLoading {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if (this.images.length > 0) {
            this.setupIntersectionObserver();
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px 50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.images.forEach(img => {
            observer.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.setAttribute('src', src);
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        }
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceOptimization {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.preloadCriticalResources();
        this.setupServiceWorker();
    }

    optimizeImages() {
        // Add WebP support detection
        const supportsWebP = this.checkWebPSupport();
        
        if (supportsWebP) {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                const src = img.src;
                if (src && src.includes('.jpg') || src.includes('.png')) {
                    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                    img.src = webpSrc;
                }
            });
        }
    }

    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    preloadCriticalResources() {
        // Preload critical CSS and fonts
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed');
                });
        }
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.handleKeyboardNavigation();
        this.handleFocusManagement();
        this.handleReducedMotion();
        this.addSkipLinks();
    }

    handleKeyboardNavigation() {
        // Trap focus in mobile menu
        const navbar = document.getElementById('navbar');
        const navMenu = document.getElementById('nav-menu');
        
        if (navbar && navMenu) {
            navbar.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && isMenuOpen) {
                    this.trapFocus(e, navMenu);
                }
            });
        }

        // Add keyboard support for custom elements
        const customButtons = document.querySelectorAll('[role="button"]');
        customButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }

    handleFocusManagement() {
        // Manage focus for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const addedNodes = Array.from(mutation.addedNodes);
                    addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const focusableElement = node.querySelector('[autofocus]');
                            if (focusableElement) {
                                focusableElement.focus();
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    handleReducedMotion() {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations
            document.documentElement.style.setProperty('--transition-fast', '0ms');
            document.documentElement.style.setProperty('--transition-normal', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
        }
    }

    addSkipLinks() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link sr-only';
        skipLink.textContent = 'Przejdź do głównej treści';
        skipLink.addEventListener('focus', () => {
            skipLink.classList.remove('sr-only');
        });
        skipLink.addEventListener('blur', () => {
            skipLink.classList.add('sr-only');
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// ===== ERROR HANDLING =====
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => {
            this.logError('JavaScript Error', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.logError('Unhandled Promise Rejection', e.reason);
        });
    }

    logError(type, error) {
        console.error(`${type}:`, error);
        
        // In production, send to error tracking service
        // this.sendToErrorService(type, error);
    }

    sendToErrorService(type, error) {
        // Implementation for error tracking service
        // e.g., Sentry, LogRocket, etc.
    }
}

// ===== ANALYTICS =====
class Analytics {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackUserInteractions();
        this.trackPerformance();
    }

    trackPageView() {
        // Track page view (replace with actual analytics service)
        console.log('Page view tracked');
    }

    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn, .nav-link')) {
                this.trackEvent('click', e.target.textContent.trim());
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            this.trackEvent('form_submit', e.target.id || 'unknown_form');
        });
    }

    trackPerformance() {
        // Track Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            }).observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            new PerformanceObserver((entryList) => {
                let clsValue = 0;
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
            }).observe({ entryTypes: ['layout-shift'] });
        }
    }

    trackEvent(action, label) {
        console.log(`Event tracked: ${action} - ${label}`);
        // Replace with actual analytics tracking
    }
}

// ===== MAIN APPLICATION =====
class MarmaWebsite {
    constructor() {
        this.components = {};
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all components
            this.components.loadingScreen = new LoadingScreen();
            this.components.navigation = new Navigation();
            this.components.scrollAnimations = new ScrollAnimations();
            this.components.productInteractions = new ProductInteractions();
            this.components.contactForm = new ContactForm();
            this.components.backToTop = new BackToTop();
            this.components.lazyLoading = new LazyLoading();
            this.components.performanceOptimization = new PerformanceOptimization();
            this.components.accessibilityEnhancements = new AccessibilityEnhancements();
            this.components.errorHandler = new ErrorHandler();
            this.components.analytics = new Analytics();

            // Add custom CSS for dynamic elements
            this.addDynamicStyles();

            console.log('Marma Website initialized successfully');
        } catch (error) {
            console.error('Error initializing website:', error);
        }
    }

    addDynamicStyles() {
        const styles = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                z-index: 9999;
                transition: all 0.3s ease;
                max-width: 400px;
            }
            
            .notification-content {
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #666;
                margin-left: auto;
            }
            
            .notification-info {
                border-left: 4px solid #2563eb;
            }
            
            .notification-success {
                border-left: 4px solid #10b981;
            }
            
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            
            .form-message {
                padding: 12px 16px;
                border-radius: 8px;
                margin-top: 16px;
                transition: opacity 0.3s ease;
            }
            
            .form-message-success {
                background: #dcfce7;
                color: #15803d;
                border: 1px solid #bbf7d0;
            }
            
            .form-message-error {
                background: #fef2f2;
                color: #dc2626;
                border: 1px solid #fecaca;
            }
            
            .field-error {
                display: block;
                color: #dc2626;
                font-size: 0.875rem;
                margin-top: 4px;
            }
            
            .form-group.error input,
            .form-group.error textarea,
            .form-group.error select {
                border-color: #dc2626;
            }
            
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #2563eb;
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 9999;
                transition: top 0.3s ease;
            }
            
            .skip-link:focus {
                top: 6px;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .animate-spin {
                animation: spin 1s linear infinite;
                width: 16px;
                height: 16px;
            }
            
            @media (max-width: 640px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// ===== INITIALIZE APPLICATION =====
const marmaWebsite = new MarmaWebsite();