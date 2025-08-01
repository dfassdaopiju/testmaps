// Główny obiekt aplikacji dla Marma Polskie Folie
const MarmaApp = {
    // Inicjalizacja
    init() {
        this.initNavigation();
        this.initScrollEffects();
        this.initAnimations();
        this.initFormHandling();
        this.initResponsive();
        this.initIntersectionObserver();
        this.initPerformanceOptimizations();
        this.initProductInteractions();
        
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
        const floatingElements = document.querySelector('.floating-elements');

        window.addEventListener('scroll', () => {
            if (hero) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                
                if (heroContent) {
                    heroContent.style.transform = `translateY(${rate * 0.2}px)`;
                }
                
                if (floatingElements) {
                    floatingElements.style.transform = `translateY(${rate * 0.15}px)`;
                }
            }
        });
    },

    // Animacje i efekty wizualne
    initAnimations() {
        // Hover efekty dla kart produktów
        const productCards = document.querySelectorAll('.product-card, .float-element, .feature-item');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Efekt podświetlenia dla logo
        const logoSquare = document.querySelector('.logo-square');
        if (logoSquare) {
            logoSquare.addEventListener('mouseenter', () => {
                logoSquare.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            logoSquare.addEventListener('mouseleave', () => {
                logoSquare.style.transform = 'scale(1) rotate(0deg)';
            });
        }

        // Efekt gradientu dla przycisków
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'linear-gradient(135deg, #1e40af, #059669)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.background = '#1e40af';
            });
        });

        // Animacja dla certyfikatów
        const certItems = document.querySelectorAll('.cert-item');
        certItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            
            item.addEventListener('click', () => {
                this.showNotification(`Certyfikat ${item.textContent} - szczegóły dostępne na żądanie`, 'info');
            });
        });
    },

    // Interakcje specyficzne dla produktów
    initProductInteractions() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productIcon = card.querySelector('.product-icon');
            const productFeatures = card.querySelectorAll('.product-features li');
            
            // Hover effect dla ikon produktów
            if (productIcon) {
                card.addEventListener('mouseenter', () => {
                    productIcon.style.transform = 'scale(1.2) rotate(5deg)';
                    productIcon.style.filter = 'drop-shadow(0 4px 8px rgba(30, 64, 175, 0.3))';
                });
                
                card.addEventListener('mouseleave', () => {
                    productIcon.style.transform = 'scale(1) rotate(0deg)';
                    productIcon.style.filter = 'none';
                });
            }
            
            // Animacja dla listy funkcji produktu
            productFeatures.forEach((feature, index) => {
                feature.addEventListener('mouseenter', () => {
                    feature.style.transform = 'translateX(10px)';
                    feature.style.color = '#1e40af';
                });
                
                feature.addEventListener('mouseleave', () => {
                    feature.style.transform = 'translateX(0)';
                    feature.style.color = '#475569';
                });
            });
            
            // Klik na kartę produktu
            card.addEventListener('click', () => {
                const productName = card.querySelector('h3').textContent;
                this.showProductDetails(productName);
            });
        });
        
        // Animacja elementów hero
        const floatElements = document.querySelectorAll('.float-element');
        floatElements.forEach((element, index) => {
            element.addEventListener('click', () => {
                const category = element.querySelector('h4').textContent;
                this.highlightProductCategory(category);
            });
        });
    },

    // Pokazanie szczegółów produktu
    showProductDetails(productName) {
        const productDetails = {
            'Produkty dla budownictwa': 'Nasza oferta obejmuje ekrany dachowe, membrany paroprzepuszczalne, folie paroizolacyjne i izolacyjno-budowlane. Produkty certyfikowane zgodnie z normami europejskimi.',
            'Produkty dla rolnictwa': 'Specjalizujemy się w produkcji folii kiszonkarskich, agrowłóknin, folii tunelowych i do ściółkowania. Zwiększają wydajność i chronią uprawy.',
            'Opakowania': 'Oferujemy zaawansowane folie opakowaniowe z wielokolorowym nadrukiem, folie stretch i kurczliwe oraz opakowania na zamówienie.',
            'Produkty dla ogrodnictwa': 'Nasze dzianiny cieniujące, tkaniny ogrodnicze i ekrany energetyczne optymalizują warunki wzrostu roślin.',
            'Produkty ochronne i medyczne': 'Certyfikowane folie ochronne, materiały medyczne i produkty higieniczne spełniające najwyższe standardy.',
            'Folie i tkaniny techniczne': 'Włókniny spunbond, folie techniczne specjalne i materiały przemysłowe dla specjalistycznych zastosowań.'
        };
        
        const details = productDetails[productName] || 'Skontaktuj się z nami, aby uzyskać szczegółowe informacje o tym produkcie.';
        this.showNotification(`${productName}: ${details}`, 'info', 6000);
    },

    // Podświetlenie kategorii produktów
    highlightProductCategory(category) {
        const categoryMap = {
            'Budownictwo': 'Produkty dla budownictwa',
            'Rolnictwo': 'Produkty dla rolnictwa',
            'Opakowania': 'Opakowania',
            'Ogrodnictwo': 'Produkty dla ogrodnictwa'
        };
        
        const targetCategory = categoryMap[category];
        if (targetCategory) {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                const cardTitle = card.querySelector('h3').textContent;
                if (cardTitle === targetCategory) {
                    // Scroll do karty i podświetl
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.background = 'linear-gradient(135deg, #f0f9ff, #e0f2fe)';
                    card.style.borderColor = '#1e40af';
                    card.style.transform = 'scale(1.05)';
                    
                    setTimeout(() => {
                        card.style.background = 'white';
                        card.style.borderColor = '#e2e8f0';
                        card.style.transform = 'scale(1)';
                    }, 3000);
                }
            });
        }
    },

    // Obsługa formularzy
    initFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Pobranie danych z formularza
                const name = contactForm.querySelector('input[type="text"]').value;
                const email = contactForm.querySelector('input[type="email"]').value;
                const company = contactForm.querySelectorAll('input[type="text"]')[1]?.value || '';
                const phone = contactForm.querySelector('input[type="tel"]').value;
                const category = contactForm.querySelector('select').value;
                const message = contactForm.querySelector('textarea').value;
                const consent = contactForm.querySelector('input[type="checkbox"]').checked;
                
                // Walidacja
                if (!name || !email || !message) {
                    this.showNotification('Proszę wypełnić wszystkie wymagane pola', 'error');
                    return;
                }
                
                if (!this.validateEmail(email)) {
                    this.showNotification('Proszę podać prawidłowy adres email', 'error');
                    return;
                }
                
                if (!consent) {
                    this.showNotification('Proszę wyrazić zgodę na przetwarzanie danych osobowych', 'error');
                    return;
                }
                
                // Symulacja wysyłania
                const submitBtn = contactForm.querySelector('.btn-primary');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Wysyłanie...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    this.showNotification('Zapytanie zostało wysłane! Skontaktujemy się w ciągu 24 godzin.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Specjalne podziękowanie dla różnych kategorii
                    if (category) {
                        setTimeout(() => {
                            this.showCategorySpecificMessage(category);
                        }, 2000);
                    }
                }, 2000);
            });
        }
        
        // Efekty focus dla pól formularza
        const inputs = document.querySelectorAll('input, textarea, select');
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

    // Wiadomość specyficzna dla kategorii
    showCategorySpecificMessage(category) {
        const messages = {
            'budownictwo': 'Nasz specjalista ds. produktów budowlanych skontaktuje się z Państwem w sprawie doboru odpowiednich rozwiązań.',
            'rolnictwo': 'Dziękujemy za zainteresowanie naszymi produktami rolniczymi. Otrzymają Państwo szczegółową ofertę wraz z próbkami.',
            'opakowania': 'Nasze biuro projektowe przygotuje dedykowaną ofertę opakowań dostosowaną do Państwa potrzeb.',
            'ogrodnictwo': 'Specjalista ds. produktów ogrodniczych przedstawi rozwiązania optymalizujące warunki uprawy.',
            'medyczne': 'Otrzymają Państwo informacje o naszych certyfikowanych produktach medycznych i ochronnych.',
            'techniczne': 'Nasz zespół R&D skontaktuje się w sprawie specjalistycznych rozwiązań technicznych.'
        };
        
        const message = messages[category] || 'Dziękujemy za zainteresowanie naszymi produktami!';
        this.showNotification(message, 'info', 5000);
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
        } else if (field.type === 'tel' && value && !/^[\+]?[0-9\s\-\(\)]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Proszę podać prawidłowy numer telefonu';
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
    showNotification(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#059669',
            error: '#dc2626',
            info: '#1e40af',
            warning: '#d97706'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            background: ${colors[type] || colors.info};
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            line-height: 1.5;
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
        }, duration);
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
        
        // Reorganizuj floating elements na mobile
        const floatingElements = document.querySelector('.floating-elements');
        if (floatingElements && window.innerWidth <= 480) {
            const elements = floatingElements.querySelectorAll('.float-element');
            elements.forEach((element, index) => {
                const angle = (index * 90) * Math.PI / 180;
                const radius = 80;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                element.style.left = `calc(50% + ${x}px)`;
                element.style.top = `calc(50% + ${y}px)`;
                element.style.transform = 'translate(-50%, -50%)';
            });
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
                    
                    // Animuj statystyki hero gdy stają się widoczne
                    if (entry.target.classList.contains('hero-stats')) {
                        this.animateHeroStats();
                    }
                    
                    // Animuj statystyki firmy
                    if (entry.target.classList.contains('company-stats')) {
                        this.animateCompanyStats();
                    }
                    
                    // Animuj elementy innovation
                    if (entry.target.classList.contains('feature-item')) {
                        entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.2}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Obserwuj sekcje
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Obserwuj karty produktów
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Obserwuj elementy specjalne
        const specialElements = document.querySelectorAll('.hero-stats, .company-stats, .feature-item');
        specialElements.forEach(element => {
            observer.observe(element);
        });
    },

    // Animacja statystyk hero
    animateHeroStats() {
        const stats = document.querySelectorAll('.hero-stats .stat-number');
        
        stats.forEach(stat => {
            if (!stat.classList.contains('animated')) {
                stat.classList.add('animated');
                const target = stat.textContent;
                const targetNumber = parseInt(target.replace(/\D/g, '')) || 0;
                
                if (targetNumber > 0) {
                    const increment = Math.ceil(targetNumber / 30);
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < targetNumber) {
                            current += increment;
                            const currentValue = Math.min(current, targetNumber);
                            stat.textContent = currentValue + (target.includes('+') ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    
                    updateCounter();
                }
            }
        });
    },

    // Animacja statystyk firmy
    animateCompanyStats() {
        const stats = document.querySelectorAll('.company-stats .stat-box');
        
        stats.forEach((stat, index) => {
            stat.style.animationDelay = `${index * 0.2}s`;
            stat.classList.add('animate-scale');
        });
    },

    // Animacje ładowania
    initLoadAnimations() {
        const elements = document.querySelectorAll('.hero-content > *');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
    },

    // Optymalizacje wydajności
    initPerformanceOptimizations() {
        // Lazy loading dla obrazów tła
        if ('IntersectionObserver' in window) {
            const bgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        if (element.dataset.bg) {
                            element.style.backgroundImage = `url(${element.dataset.bg})`;
                            element.removeAttribute('data-bg');
                        }
                        bgObserver.unobserve(element);
                    }
                });
            });
            
            document.querySelectorAll('[data-bg]').forEach(element => {
                bgObserver.observe(element);
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
        
        // Prefetch dla prawdopodobnych nawigacji
        const prefetchLinks = ['#products', '#about', '#contact'];
        prefetchLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
        });
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
        },

        // Format phone number
        formatPhone(phone) {
            return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+48 $1 $2 $3 $4');
        },

        // Sprawdź czy to godziny pracy
        isBusinessHours() {
            const now = new Date();
            const hour = now.getHours();
            const day = now.getDay();
            
            // Poniedziałek-Piątek 8:00-16:00
            return day >= 1 && day <= 5 && hour >= 8 && hour < 16;
        }
    }
};

// Dodatkowe style CSS dla animacji specyficznych dla Marma
const marmaStyles = `
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
        transition: all 0.8s ease;
    }
    
    .product-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(30, 64, 175, 0.1);
    }
    
    .form-group.focused input,
    .form-group.focused textarea,
    .form-group.focused select {
        border-color: #1e40af;
        box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
    }
    
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }
    
    .animate-scale {
        animation: scaleIn 0.6s ease forwards;
    }
    
    @keyframes scaleIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .logo-square {
        transition: all 0.3s ease;
    }
    
    .feature-item {
        animation: slideInLeft 0.6s ease forwards;
        opacity: 0;
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-30px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* Efekt dla business hours indicator */
    .business-hours-indicator {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #059669;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-size: 0.875rem;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.3s ease;
    }
    
    .business-hours-indicator.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .business-hours-indicator.closed {
        background: #64748b;
    }
`;

// Dodaj style do dokumentu
const marmaStyleSheet = document.createElement('style');
marmaStyleSheet.textContent = marmaStyles;
document.head.appendChild(marmaStyleSheet);

// Business hours indicator
function showBusinessHoursIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'business-hours-indicator';
    
    if (MarmaApp.utils.isBusinessHours()) {
        indicator.textContent = '🟢 Biuro czynne - zadzwoń już teraz!';
        indicator.classList.add('show');
    } else {
        indicator.textContent = '🔴 Biuro nieczynne - wyślij zapytanie';
        indicator.classList.add('show', 'closed');
    }
    
    document.body.appendChild(indicator);
    
    // Ukryj po 10 sekundach
    setTimeout(() => {
        indicator.classList.remove('show');
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 300);
    }, 10000);
}

// Inicjalizacja aplikacji
document.addEventListener('DOMContentLoaded', () => {
    MarmaApp.init();
    
    // Pokaż wskaźnik godzin pracy po 3 sekundach
    setTimeout(showBusinessHoursIndicator, 3000);
});

// Export dla potencjalnego użycia modułowego
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarmaApp;
}