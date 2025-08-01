// Główny obiekt aplikacji
const TestMapsApp = {
    // Inicjalizacja
    init() {
        this.initNavigation();
        this.initScrollEffects();
        this.initAnimations();
        this.initFormHandling();
        this.initResponsive();
        this.initIntersectionObserver();
        this.initPerformanceOptimizations();
        
        // Ładowanie strony
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            this.initLoadAnimations();
        });
    },

    // Nawigacja
    initNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.querySelector('.navbar');

        // Toggle menu mobilnego
        navToggle?.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Smooth scrolling dla linków nawigacyjnych
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Zamknij menu mobilne
                    navToggle?.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Smooth scroll
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Efekt navbar przy scrollu
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Ukryj/pokaż navbar przy scrollu
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    },

    // Efekty scrollowania
    initScrollEffects() {
        // Aktywne linki w nawigacji
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 120;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // Parallax effect dla hero section
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const floatingCards = document.querySelector('.floating-cards');

        window.addEventListener('scroll', () => {
            if (hero) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                if (heroContent) {
                    heroContent.style.transform = `translateY(${rate * 0.3}px)`;
                }
                
                if (floatingCards) {
                    floatingCards.style.transform = `translateY(${rate * 0.2}px) rotate(${scrolled * 0.1}deg)`;
                }
            }
        });
    },

    // Animacje i efekty wizualne
    initAnimations() {
        // Animowane liczniki w sekcji about
        const stats = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element, target) => {
            const targetNumber = parseInt(target.replace(/\D/g, ''));
            const increment = targetNumber / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < targetNumber) {
                    current += increment;
                    element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '') + (target.includes('%') ? '%' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            updateCounter();
        };

        // Hover efekty dla kart
        const cards = document.querySelectorAll('.service-card, .card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Gradient następujący za kursorem
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor-gradient');
            if (!cursor) {
                const cursorElement = document.createElement('div');
                cursorElement.className = 'cursor-gradient';
                cursorElement.style.cssText = `
                    position: fixed;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(45, 114, 255, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: -1;
                    transition: all 0.3s ease;
                `;
                document.body.appendChild(cursorElement);
                
                cursorElement.style.left = (e.clientX - 150) + 'px';
                cursorElement.style.top = (e.clientY - 150) + 'px';
            } else {
                cursor.style.left = (e.clientX - 150) + 'px';
                cursor.style.top = (e.clientY - 150) + 'px';
            }
        });
    },

    // Obsługa formularzy
    initFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Pobranie danych z formularza
                const formData = new FormData(contactForm);
                const name = contactForm.querySelector('input[type="text"]').value;
                const email = contactForm.querySelector('input[type="email"]').value;
                const message = contactForm.querySelector('textarea').value;
                
                // Walidacja
                if (!name || !email || !message) {
                    this.showNotification('Proszę wypełnić wszystkie pola', 'error');
                    return;
                }
                
                if (!this.validateEmail(email)) {
                    this.showNotification('Proszę podać prawidłowy adres email', 'error');
                    return;
                }
                
                // Symulacja wysyłania
                const submitBtn = contactForm.querySelector('.btn-primary');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Wysyłanie...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    this.showNotification('Wiadomość została wysłana! Odpowiemy wkrótce.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
        
        // Efekty focus dla pól formularza
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time walidacja
            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    },

    // Walidacja email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Walidacja pól
    validateField(field) {
        const value = field.value.trim();
        const fieldContainer = field.parentElement;
        
        // Usuń poprzednie komunikaty błędów
        const existingError = fieldContainer.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'To pole jest wymagane';
        } else if (field.type === 'email' && value && !this.validateEmail(value)) {
            isValid = false;
            errorMessage = 'Proszę podać prawidłowy adres email';
        }
        
        if (!isValid) {
            field.classList.add('error');
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
            fieldContainer.appendChild(errorElement);
        } else {
            field.classList.remove('error');
        }
        
        return isValid;
    },

    // Notyfikacje
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(notification);
        
        // Animacja wejścia
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Automatyczne usunięcie
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    },

    // Responsywność
    initResponsive() {
        // Obsługa zmiany orientacji
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.recalculateLayout();
            }, 100);
        });
        
        // Obsługa zmiany rozmiaru okna
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.recalculateLayout();
            }, 250);
        });
    },

    // Przeliczenie layoutu
    recalculateLayout() {
        // Aktualizuj wysokości elementów
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth <= 768) {
            hero.style.minHeight = window.innerHeight + 'px';
        }
    },

    // Intersection Observer dla animacji
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animuj liczniki gdy sekcja about staje się widoczna
                    if (entry.target.classList.contains('about')) {
                        this.animateCounters();
                    }
                }
            });
        }, observerOptions);
        
        // Obserwuj sekcje
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Obserwuj karty serwisów
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    },

    // Animacja liczników
    animateCounters() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            if (!stat.classList.contains('animated')) {
                stat.classList.add('animated');
                const target = stat.textContent;
                const targetNumber = parseInt(target.replace(/\D/g, ''));
                const increment = Math.ceil(targetNumber / 50);
                let current = 0;
                
                const updateCounter = () => {
                    if (current < targetNumber) {
                        current += increment;
                        const currentValue = Math.min(current, targetNumber);
                        stat.textContent = currentValue + (target.includes('+') ? '+' : '') + (target.includes('%') ? '%' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    },

    // Animacje ładowania
    initLoadAnimations() {
        const elements = document.querySelectorAll('.hero-content > *');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    },

    // Optymalizacje wydajności
    initPerformanceOptimizations() {
        // Lazy loading dla obrazów
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Preload krytycznych zasobów
        const preloadLinks = [
            { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
        ];
        
        preloadLinks.forEach(link => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'preload';
            linkElement.href = link.href;
            linkElement.as = link.as;
            document.head.appendChild(linkElement);
        });
        
        // Service Worker dla cache'owania (opcjonalnie)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // navigator.serviceWorker.register('/sw.js'); // Uncomment gdy dodamy service worker
            });
        }
    },

    // Funkcje pomocnicze
    utils: {
        // Throttle function
        throttle(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Debounce function
        debounce(func, wait, immediate) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func(...args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func(...args);
            };
        },

        // Check if element is in viewport
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    }
};

// Dodatkowe style CSS dla animacji
const additionalStyles = `
    .loaded {
        transition: opacity 0.3s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .form-group.focused input,
    .form-group.focused textarea {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(45, 114, 255, 0.1);
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Dodaj style do dokumentu
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicjalizacja aplikacji
document.addEventListener('DOMContentLoaded', () => {
    TestMapsApp.init();
});

// Export dla potencjalnego użycia modułowego
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestMapsApp;
}