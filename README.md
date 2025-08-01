# Marma Polskie Folie - Strona Internetowa

## 🏢 O projekcie

Profesjonalna, zaawansowana strona internetowa dla firmy **Marma Polskie Folie Sp. z o.o.** - jednego z największych przetwórców tworzyw sztucznych w Europie z 30-letnim doświadczeniem.

## ✨ Funkcjonalności

### 🎨 Design i UI/UX
- **Nowoczesny, minimalistyczny design** inspirowany najlepszymi praktykami UX
- **Pełna responsywność** - optymalizacja dla wszystkich urządzeń
- **Animacje i efekty hover** - płynne, profesjonalne przejścia
- **Gradient backgrounds** z dynamicznymi animacjami
- **Glassmorphism effects** w nawigacji

### 🚀 Wydajność i Optymalizacja
- **Lazy loading** obrazów dla szybszego ładowania
- **Progressive Web App (PWA)** ready
- **WebP image format** support z fallback
- **Critical CSS** inlining
- **Service Worker** implementacja
- **Core Web Vitals** optymalizacja

### 📱 Interaktywność
- **Smooth scrolling** z custom easing
- **Intersection Observer** dla animacji scroll
- **Counter animations** dla statystyk
- **Interactive forms** z walidacją real-time
- **Touch-friendly** navigation dla urządzeń mobilnych
- **Keyboard navigation** support

### 🔍 SEO i Dostępność
- **Semantic HTML5** struktura
- **Open Graph** meta tags
- **Structured data** (JSON-LD)
- **Alt texts** dla wszystkich obrazów
- **ARIA labels** i accessibility enhancements
- **Skip links** dla screen readers
- **Focus management** dla dynamic content

### 📊 Analytics i Monitoring
- **Error tracking** z console logging
- **Performance monitoring** (Core Web Vitals)
- **User interaction tracking**
- **Custom event tracking**

## 🛠️ Technologie

### Frontend
- **HTML5** - semantyczna struktura
- **CSS3** - nowoczesne style z CSS Grid i Flexbox
- **Vanilla JavaScript ES6+** - bez zewnętrznych bibliotek
- **CSS Custom Properties** dla consistent theming
- **CSS Animations** i transitions

### Optymalizacja
- **Intersection Observer API**
- **Web Performance API**
- **Service Worker API**
- **Canvas API** (WebP detection)
- **Mutation Observer** (accessibility)

## 📁 Struktura projektu

```
marma-website/
├── index.html          # Główny plik HTML
├── styles.css          # Style CSS
├── script.js           # Funkcjonalności JavaScript
├── manifest.json       # PWA manifest
├── robots.txt          # SEO robots file
├── sitemap.xml         # XML sitemap
├── README.md           # Dokumentacja
├── icons/              # PWA icons (do dodania)
├── images/             # Obrazy strony (do dodania)
└── fonts/              # Custom fonts (opcjonalne)
```

## 🚀 Uruchomienie

### Lokalne środowisko
1. Sklonuj repozytorium
2. Otwórz `index.html` w przeglądarce lub użyj local server

### Live Server (VS Code)
```bash
# Zainstaluj Live Server extension
# Kliknij prawym przyciskiem na index.html
# Wybierz "Open with Live Server"
```

### Python Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Node.js Server
```bash
# Zainstaluj http-server
npm install -g http-server

# Uruchom
http-server -p 8000
```

## 📋 Sekcje strony

### 🏠 Strona główna (Hero)
- Imponujące tło z animowanymi gradientami
- Statystyki firmy z animacjami liczników
- Call-to-action buttons z efektami hover
- Scroll indicator animation

### 🏢 O firmie
- Historia i doświadczenie firmy
- Ikony z animacjami i hover effects
- Metryki biznesowe
- Responsive layout

### 📦 Produkty
- 4 główne kategorie produktów:
  - Produkty dla budownictwa
  - Rolnictwo i ogrodnictwo
  - Opakowania
  - Folie techniczne
- Interactive cards z hover effects
- Product detail modals (placeholder)

### 🔬 Innowacje
- Technologie przyszłości
- R&D informacje
- Dark theme section
- Animated cards

### 🌱 Zrównoważony rozwój
- Eco-friendly practices
- Certyfikaty ekologiczne
- Sustainability goals

### 📍 Lokalizacje
- 4 lokalizacje w Polsce:
  - Rzeszów (biuro zarządu)
  - Kańczuga
  - Nowa Dęba
  - Kędzierzyn-Koźle
- Contact information

### 📞 Kontakt
- Responsive contact form
- Form validation
- Success/error notifications
- Multiple contact methods

## 🎨 Kolory i branding

### Paleta kolorów
- **Primary Blue**: `#2563eb`
- **Secondary Green**: `#10b981`
- **Neutral Grays**: `#f9fafb` do `#111827`
- **Accent Colors**: Various blues, greens, oranges

### Typography
- **Primary Font**: Inter (system fonts fallback)
- **Secondary Font**: Poppins (headings)
- **Responsive font sizes**: Od 0.75rem do 3.75rem

## ⚡ Performance

### Optymalizacje zastosowane
- **Minified CSS/JS** (do implementacji w build process)
- **Lazy loading** obrazów
- **Critical CSS** inlining
- **Resource preloading**
- **Service Worker** caching
- **Throttled scroll events**
- **Debounced form inputs**

### Metryki docelowe
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Lighthouse Score**: 90+

## 🔧 Dostępność (A11y)

### Implementowane standardy
- **WCAG 2.1 AA** compliance
- **Keyboard navigation** support
- **Screen reader** optimization
- **Focus management**
- **High contrast** mode support
- **Reduced motion** respect
- **Skip links** implementation

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Wide**: > 1280px

### Mobile-first approach
- Progressive enhancement
- Touch-friendly interactions
- Optimized typography scaling
- Flexible grid systems

## 🧪 Browser Support

### Supported Browsers
- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **iOS Safari**: 14+
- **Android Chrome**: 90+

### Fallbacks
- **CSS Grid** → Flexbox
- **CSS Custom Properties** → Static values
- **WebP** → JPEG/PNG
- **Modern JS** → Polyfills

## 🔄 Future Enhancements

### Planowane funkcjonalności
- [ ] Multi-language support (EN/DE)
- [ ] Advanced product catalog
- [ ] Client portal login
- [ ] News/blog section
- [ ] Career opportunities page
- [ ] Advanced animations (GSAP)
- [ ] Image gallery with lightbox
- [ ] Virtual factory tour
- [ ] Customer testimonials
- [ ] Live chat integration

### Technical improvements
- [ ] TypeScript migration
- [ ] Build system (Webpack/Vite)
- [ ] CSS preprocessing (Sass/Less)
- [ ] Automated testing
- [ ] CI/CD pipeline
- [ ] CDN integration
- [ ] Advanced caching strategies

## 📧 Kontakt

Dla pytań technicznych dotyczących strony internetowej:

**Marma Polskie Folie Sp. z o.o.**
- 📍 Al. Pod Kasztanami 10, 35-030 Rzeszów
- 📞 +48 17 777 62 70
- ✉️ biuro@marma.com.pl
- 🌐 [www.marma.com.pl](https://www.marma.com.pl)

## 📄 Licencja

© 2024 Marma Polskie Folie Sp. z o.o. Wszelkie prawa zastrzeżone.

---

*Strona została stworzona z wykorzystaniem najnowszych technologii webowych i najlepszych praktyk industry. Zaprojektowana z myślą o wydajności, dostępności i user experience.*