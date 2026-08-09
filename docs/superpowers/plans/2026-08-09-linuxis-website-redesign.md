# LinuXis Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the LinuXis website with improved UI/UX, 5 navigable pages, shared CSS/JS, responsive mobile navigation, and smooth animations.

**Architecture:** Extract inline CSS/JS from index.html into shared files (css/style.css, js/main.js). Create 4 new HTML pages (servicos.html, sobre.html, portfolio.html, contato.html) that import the shared resources. Each page has unique content but shares header, footer, and background effects.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript (Intersection Observer, event listeners), Font Awesome icons, Google Fonts (Orbitron, Plus Jakarta Sans).

## Global Constraints

- Maintain dark futuristic aesthetic (bg: #080c14, primary: #0088ff, cyan glow: #00f0ff)
- Mobile-first responsive design with breakpoints at 900px and 600px
- All pages must include background effects (glow circles + grid overlay)
- Font Awesome 6.4.0 for icons, Google Fonts for typography
- No external frameworks (React, Bootstrap) - pure HTML/CSS/JS
- Cross-browser compatibility: Chrome, Firefox, Safari, Edge

---

## File Structure

| File | Purpose |
|------|---------|
| `css/style.css` | All shared styles (variables, base, header, footer, components, responsive) |
| `js/main.js` | All shared JavaScript (hamburger menu, smooth scroll, animations, form validation) |
| `index.html` | Home page (refactored to use shared CSS/JS) |
| `servicos.html` | Services page (8 service cards) |
| `sobre.html` | About page (mission, vision, values, stats, history) |
| `portfolio.html` | Portfolio page (filter buttons + project grid) |
| `contato.html` | Contact page (form + contact cards) |

---

### Task 1: Create Shared CSS File

**Files:**
- Create: `css/style.css`

**Interfaces:**
- Produces: CSS variables, base styles, header/footer styles, component styles, responsive breakpoints

- [ ] **Step 1: Create css directory**

Run: `mkdir -p css`

- [ ] **Step 2: Create css/style.css with CSS variables and base styles**

```css
/* Variables */
:root {
    --bg-dark: #080c14;
    --bg-card: rgba(15, 23, 42, 0.65);
    --bg-card-active: rgba(16, 28, 58, 0.85);
    --primary-blue: #0088ff;
    --cyan-glow: #00f0ff;
    --text-white: #ffffff;
    --text-dim: #94a3b8;
    --border-glow: rgba(0, 180, 255, 0.25);
    --font-logo: 'Orbitron', sans-serif;
    --font-main: 'Plus Jakarta Sans', sans-serif;
}

/* Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    background-color: var(--bg-dark);
    color: var(--text-white);
    font-family: var(--font-main);
    overflow-x: hidden;
    line-height: 1.5;
}

/* Background Effects */
.bg-effects {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
}

.glow-circle-1 {
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(0, 136, 255, 0.18) 0%, rgba(0, 240, 255, 0.05) 45%, rgba(0,0,0,0) 70%);
    filter: blur(50px);
}

.glow-circle-2 {
    position: absolute;
    bottom: -10%;
    right: 10%;
    width: 600px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 136, 255, 0.12) 0%, rgba(0, 0, 0, 0) 70%);
    filter: blur(60px);
}

.grid-overlay {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 50px 50px;
}
```

- [ ] **Step 3: Add header/navbar styles to css/style.css**

```css
/* Header / Navbar */
header {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 1.2rem 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(8, 12, 20, 0.75);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 1000;
}

.logo-container {
    display: flex;
    flex-direction: column;
    text-decoration: none;
}

.logo-text {
    font-family: var(--font-logo);
    font-size: 1.8rem;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: 2px;
    position: relative;
    display: inline-block;
}

.logo-text .x-tech {
    color: #ffffff;
    position: relative;
}

.logo-text .x-tech::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -2px;
    width: 130%;
    height: 100%;
    border-top: 3px solid var(--cyan-glow);
    border-radius: 50% 50% 0 0;
    box-shadow: 0 -2px 10px var(--cyan-glow);
    transform: rotate(-12deg);
}

.logo-subtext {
    font-family: var(--font-main);
    font-size: 0.42rem;
    letter-spacing: 3px;
    color: var(--cyan-glow);
    text-transform: uppercase;
    margin-top: -3px;
    text-align: center;
    border-top: 1px solid rgba(0, 240, 255, 0.3);
    border-bottom: 1px solid rgba(0, 240, 255, 0.3);
    padding: 1px 0;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2.5rem;
}

nav a {
    color: var(--text-dim);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s;
}

nav a:hover, nav a.active {
    color: var(--text-white);
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
}

.btn-header {
    background: linear-gradient(135deg, #0066ff, #00c3ff);
    color: #fff;
    padding: 0.65rem 1.6rem;
    border-radius: 30px;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    box-shadow: 0 0 20px rgba(0, 136, 255, 0.4);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-header:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(0, 195, 255, 0.7);
}

/* Hamburger Menu */
.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    gap: 5px;
}

.hamburger span {
    width: 25px;
    height: 2px;
    background: var(--text-white);
    transition: all 0.3s;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Menu */
.mobile-menu {
    display: none;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: rgba(8, 12, 20, 0.95);
    backdrop-filter: blur(16px);
    padding: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 999;
}

.mobile-menu.active {
    display: block;
}

.mobile-menu ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.mobile-menu a {
    color: var(--text-dim);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.3s;
}

.mobile-menu a:hover, .mobile-menu a.active {
    color: var(--text-white);
}

.mobile-menu .btn-header {
    margin-top: 1.5rem;
    justify-content: center;
}
```

- [ ] **Step 4: Add footer styles to css/style.css**

```css
/* Footer */
footer {
    background: rgba(8, 12, 20, 0.9);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 4rem 8% 2rem;
    margin-top: 4rem;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
}

.footer-brand .logo-text {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.footer-brand p {
    color: var(--text-dim);
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

.footer-column h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    color: var(--text-white);
}

.footer-column ul {
    list-style: none;
}

.footer-column li {
    margin-bottom: 0.8rem;
}

.footer-column a {
    color: var(--text-dim);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;
}

.footer-column a:hover {
    color: var(--cyan-glow);
}

.footer-column .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-dim);
    margin-bottom: 0.8rem;
}

.footer-column .contact-item i {
    color: var(--cyan-glow);
    width: 20px;
}

.social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.social-links a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-dim);
    transition: all 0.3s;
}

.social-links a:hover {
    background: var(--primary-blue);
    color: var(--text-white);
    box-shadow: 0 0 15px rgba(0, 136, 255, 0.4);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    color: var(--text-dim);
    font-size: 0.85rem;
}
```

- [ ] **Step 5: Add component styles to css/style.css**

```css
/* Hero Section */
.hero {
    padding: 9rem 5% 4rem;
    text-align: center;
    max-width: 1280px;
    margin: 0 auto;
}

.hero-subtitle-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--cyan-glow);
    font-family: var(--font-logo);
    font-size: 0.85rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
}

.hero-subtitle-tag::before, .hero-subtitle-tag::after {
    content: '';
    width: 30px;
    height: 1px;
    background: var(--cyan-glow);
    box-shadow: 0 0 8px var(--cyan-glow);
}

.hero h1 {
    font-size: clamp(2.5rem, 5.5vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.15;
    margin-bottom: 0.5rem;
}

.hero h1 .highlight-blue {
    color: var(--cyan-glow);
    background: linear-gradient(180deg, #00f0ff 0%, #0066ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
    text-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
}

.hero-description {
    font-size: 1.15rem;
    color: var(--text-dim);
    margin: 1.2rem auto 3rem;
    max-width: 680px;
    font-weight: 400;
}

/* Service Cards */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 4rem;
}

.service-card {
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2rem 1.5rem;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;
}

.service-card:hover, .service-card.active {
    background: var(--bg-card-active);
    border-color: var(--cyan-glow);
    box-shadow: 0 10px 30px rgba(0, 136, 255, 0.25);
    transform: translateY(-5px);
}

.service-icon {
    width: 60px;
    height: 60px;
    background: rgba(0, 136, 255, 0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.2rem;
    color: var(--cyan-glow);
    font-size: 1.6rem;
    border: 1px solid rgba(0, 240, 255, 0.2);
}

.service-card h4 {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
    font-weight: 600;
}

.service-card p {
    color: var(--text-dim);
    font-size: 0.9rem;
}

/* Stats CTA */
.stats-cta-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 2rem 3rem;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 2rem;
}

.stats-group {
    display: flex;
    gap: 3rem;
}

.stat-item {
    text-align: left;
}

.stat-number {
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-white);
    font-family: var(--font-logo);
}

.stat-label {
    font-size: 0.85rem;
    color: var(--text-dim);
}

.btn-cta-large {
    background: linear-gradient(135deg, #0066ff, #00d2ff);
    color: white;
    padding: 0.9rem 2.2rem;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1rem;
    box-shadow: 0 0 25px rgba(0, 136, 255, 0.5);
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.btn-cta-large:hover {
    box-shadow: 0 0 35px rgba(0, 210, 255, 0.8);
    transform: scale(1.03);
}

/* Qualities Footer */
.qualities-footer {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    margin-top: 4rem;
    padding-top: 2rem;
    font-family: var(--font-logo);
    font-size: 0.9rem;
    color: var(--text-dim);
    letter-spacing: 1px;
}

.qualities-footer span {
    display: flex;
    align-items: center;
    gap: 10px;
}

.qualities-footer span::before {
    content: '';
    width: 6px;
    height: 6px;
    background: var(--cyan-glow);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--cyan-glow);
}

/* Animation Classes */
.fade-in {
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-in.visible {
    opacity: 1;
    transform: scale(1);
}

/* Page Hero (for inner pages) */
.page-hero {
    padding: 10rem 5% 4rem;
    text-align: center;
    max-width: 1280px;
    margin: 0 auto;
}

/* Section Container */
.section {
    padding: 4rem 8%;
    max-width: 1280px;
    margin: 0 auto;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
}

.section-subtitle {
    color: var(--text-dim);
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.1rem;
}

/* Contact Form */
.contact-container {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 3rem;
    align-items: start;
}

.contact-form {
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-dim);
    font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: var(--text-white);
    font-family: var(--font-main);
    font-size: 0.95rem;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-blue);
}

.form-group textarea {
    min-height: 150px;
    resize: vertical;
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
    border-color: #ff4444;
}

.form-group input.success,
.form-group select.success,
.form-group textarea.success {
    border-color: #00ff88;
}

.form-message {
    font-size: 0.8rem;
    margin-top: 0.3rem;
}

.form-message.error {
    color: #ff4444;
}

.form-message.success {
    color: #00ff88;
}

.btn-submit {
    background: linear-gradient(135deg, #0066ff, #00c3ff);
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 30px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 136, 255, 0.4);
    transition: all 0.3s ease;
    width: 100%;
}

.btn-submit:hover {
    box-shadow: 0 0 30px rgba(0, 195, 255, 0.7);
    transform: translateY(-2px);
}

/* Contact Cards */
.contact-cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact-card {
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
}

.contact-card:hover {
    border-color: var(--cyan-glow);
    box-shadow: 0 5px 20px rgba(0, 136, 255, 0.2);
}

.contact-card i {
    font-size: 2rem;
    color: var(--cyan-glow);
    margin-bottom: 1rem;
}

.contact-card h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.contact-card p {
    color: var(--text-dim);
    font-size: 0.9rem;
}

/* Portfolio Filters */
.portfolio-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    padding: 0.6rem 1.5rem;
    color: var(--text-dim);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.filter-btn:hover,
.filter-btn.active {
    background: rgba(0, 136, 255, 0.2);
    border-color: var(--cyan-glow);
    color: var(--text-white);
}

/* Portfolio Grid */
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.portfolio-card {
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.portfolio-card:hover {
    border-color: var(--cyan-glow);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 136, 255, 0.25);
}

.portfolio-image {
    height: 200px;
    background: linear-gradient(135deg, rgba(0, 136, 255, 0.2), rgba(0, 240, 255, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
}

.portfolio-info {
    padding: 1.5rem;
}

.portfolio-info h4 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.portfolio-info .category {
    color: var(--cyan-glow);
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
}

.portfolio-info p {
    color: var(--text-dim);
    font-size: 0.9rem;
}

/* About Page - Mission Vision Values */
.mvv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
}

.mvv-card {
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
}

.mvv-card:hover {
    border-color: var(--cyan-glow);
    box-shadow: 0 10px 30px rgba(0, 136, 255, 0.25);
}

.mvv-card i {
    font-size: 2.5rem;
    color: var(--cyan-glow);
    margin-bottom: 1.5rem;
}

.mvv-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
}

.mvv-card p {
    color: var(--text-dim);
    font-size: 0.95rem;
}

/* About Page - Stats */
.about-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
}

.about-stat {
    text-align: center;
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2rem;
}

.about-stat .number {
    font-size: 2.5rem;
    font-weight: 800;
    font-family: var(--font-logo);
    color: var(--cyan-glow);
    margin-bottom: 0.5rem;
}

.about-stat .label {
    color: var(--text-dim);
    font-size: 0.95rem;
}

/* About Page - History */
.history-content {
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2.5rem;
    max-width: 800px;
    margin: 0 auto;
}

.history-content p {
    color: var(--text-dim);
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.history-content p:last-child {
    margin-bottom: 0;
}
```

- [ ] **Step 6: Add responsive styles to css/style.css**

```css
/* Responsive */
@media (max-width: 900px) {
    header nav {
        display: none;
    }

    .hamburger {
        display: flex;
    }

    .btn-header {
        display: none;
    }

    .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .stats-cta-container {
        flex-direction: column;
        text-align: center;
    }

    .stats-group {
        flex-direction: column;
        gap: 1.5rem;
    }

    .stat-item {
        text-align: center;
    }

    .qualities-footer {
        flex-wrap: wrap;
        gap: 1rem;
    }

    .contact-container {
        grid-template-columns: 1fr;
    }

    .about-stats {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .social-links {
        justify-content: center;
    }

    .portfolio-filters {
        gap: 0.5rem;
    }

    .filter-btn {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
    }

    .about-stats {
        grid-template-columns: 1fr;
    }

    .section-title {
        font-size: 2rem;
    }
}
```

- [ ] **Step 7: Verify css/style.css is complete**

Run: `wc -l css/style.css`
Expected: ~500+ lines

---

### Task 2: Create Shared JavaScript File

**Files:**
- Create: `js/main.js`

**Interfaces:**
- Produces: Hamburger menu toggle, smooth scroll, intersection observer animations, form validation

- [ ] **Step 1: Create js directory**

Run: `mkdir -p js`

- [ ] **Step 2: Create js/main.js with hamburger menu functionality**

```javascript
// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}
```

- [ ] **Step 3: Add smooth scroll functionality to js/main.js**

```javascript
// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
```

- [ ] **Step 4: Add Intersection Observer for animations to js/main.js**

```javascript
// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});
```

- [ ] **Step 5: Add active page indicator to js/main.js**

```javascript
// Active Page Indicator
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});
```

- [ ] **Step 6: Add form validation to js/main.js**

```javascript
// Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let message = '';

    // Remove previous classes
    field.classList.remove('error', 'success');
    const existingMsg = field.parentElement.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    // Required validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Este campo é obrigatório';
    }
    // Email validation
    else if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Email inválido';
        }
    }

    // Apply result
    if (isValid) {
        field.classList.add('success');
    } else {
        field.classList.add('error');
        const msgEl = document.createElement('div');
        msgEl.className = 'form-message error';
        msgEl.textContent = message;
        field.parentElement.appendChild(msgEl);
    }

    return isValid;
}
```

- [ ] **Step 7: Add portfolio filter functionality to js/main.js**

```javascript
// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterButtons.length && portfolioCards.length) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter cards
            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}
```

- [ ] **Step 8: Verify js/main.js is complete**

Run: `wc -l js/main.js`
Expected: ~150+ lines

---

### Task 3: Refactor index.html to Use Shared Files

**Files:**
- Modify: `index.html` (remove inline CSS/JS, add links to shared files)

**Interfaces:**
- Consumes: css/style.css, js/main.js

- [ ] **Step 1: Read current index.html to identify inline styles and scripts**

Read: `index.html` (full file)

- [ ] **Step 2: Replace inline style block with CSS link**

Remove the `<style>` block (lines 41-579) and add:
```html
<link rel="stylesheet" href="css/style.css">
```

- [ ] **Step 3: Add hamburger button to header**

Add before the `<nav>` element:
```html
<div class="hamburger">
    <span></span>
    <span></span>
    <span></span>
</div>
```

- [ ] **Step 4: Add mobile menu div after header**

Add after `</header>`:
```html
<div class="mobile-menu">
    <ul>
        <li><a href="index.html" class="active">Home</a></li>
        <li><a href="servicos.html">Serviços</a></li>
        <li><a href="sobre.html">Sobre</a></li>
        <li><a href="portfolio.html">Portfólio</a></li>
        <li><a href="contato.html">Contato</a></li>
    </ul>
    <a href="contato.html" class="btn-header">
        Começar Agora <i class="fa-solid fa-arrow-right"></i>
    </a>
</div>
```

- [ ] **Step 5: Update navigation links to use page URLs**

Change all nav links from `#section` to actual page URLs:
```html
<nav>
    <ul>
        <li><a href="index.html" class="active">Home</a></li>
        <li><a href="servicos.html">Serviços</a></li>
        <li><a href="sobre.html">Sobre</a></li>
        <li><a href="portfolio.html">Portfólio</a></li>
        <li><a href="contato.html">Contato</a></li>
    </ul>
</nav>
```

- [ ] **Step 6: Replace inline script with JS link**

Remove the `<script>` block (lines 753-771) and add before `</body>`:
```html
<script src="js/main.js"></script>
```

- [ ] **Step 7: Add fade-in classes to animated elements**

Add `class="fade-in"` to:
- `.service-card` elements
- `.stats-cta-container`
- `.qualities-footer`

- [ ] **Step 8: Verify index.html renders correctly**

Open `index.html` in browser and verify:
- Header with logo, nav, hamburger (resize to < 900px)
- Hero section displays correctly
- Service cards animate on scroll
- Footer displays with 4 columns
- Mobile menu works

---

### Task 4: Create servicos.html (Services Page)

**Files:**
- Create: `servicos.html`

**Interfaces:**
- Consumes: css/style.css, js/main.js

- [ ] **Step 1: Create servicos.html with head section**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LinuXis - Nossos Serviços</title>
    <meta name="description" content="Conheça os serviços da LinuXis: Design de Sites, SEO, E-Commerce, Desenvolvimento de Apps, IA, Cloud e mais.">
    <meta name="keywords" content="serviços, design de sites, SEO, e-commerce, desenvolvimento web, inteligência artificial">
    <link rel="canonical" href="https://linuxis.tech/servicos.html">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
```

- [ ] **Step 2: Add body with background effects and header**

```html
<body>
    <div class="bg-effects">
        <div class="glow-circle-1"></div>
        <div class="glow-circle-2"></div>
        <div class="grid-overlay"></div>
    </div>

    <header>
        <a href="index.html" class="logo-container">
            <div class="logo-text">Linu<span class="x-tech">X</span>is</div>
            <div class="logo-subtext">Tecnologia que impulsiona o futuro</div>
        </a>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="servicos.html" class="active">Serviços</a></li>
                <li><a href="sobre.html">Sobre</a></li>
                <li><a href="portfolio.html">Portfólio</a></li>
                <li><a href="contato.html">Contato</a></li>
            </ul>
        </nav>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <a href="contato.html" class="btn-header">
            Começar Agora <i class="fa-solid fa-arrow-right"></i>
        </a>
    </header>

    <div class="mobile-menu">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="servicos.html" class="active">Serviços</a></li>
            <li><a href="sobre.html">Sobre</a></li>
            <li><a href="portfolio.html">Portfólio</a></li>
            <li><a href="contato.html">Contato</a></li>
        </ul>
        <a href="contato.html" class="btn-header">
            Começar Agora <i class="fa-solid fa-arrow-right"></i>
        </a>
    </div>
```

- [ ] **Step 3: Add hero section**

```html
    <main class="page-hero">
        <div class="hero-subtitle-tag">O Que Fazemos</div>
        <h1>
            Nossos
            <span class="highlight-blue">Serviços</span>
        </h1>
        <p class="hero-description">
            Oferecemos soluções completas para transformar seu negócio digital. Da concepção à implementação, com tecnologia de ponta.
        </p>
    </main>
```

- [ ] **Step 4: Add services grid with 8 cards**

```html
    <section class="section">
        <div class="services-grid">
            <div class="service-card fade-in">
                <div class="service-icon">
                    <i class="fa-solid fa-laptop-code"></i>
                </div>
                <h4>Design de Sites</h4>
                <p>Sites modernos e responsivos que convertem visitantes em clientes.</p>
            </div>

            <div class="service-card fade-in">
                <div class="service-icon">
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <h4>SEO & Crescimento</h4>
                <p>Otimização para mecanismos de busca e estratégias de crescimento orgânico.</p>
            </div>

            <div class="service-card fade-in">
                <div class="service-icon">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <h4>E-Commerce</h4>
                <p>Lojas virtuais completas com pagamento integrado e gestão de estoque.</p>
            </div>

            <div class="service-card fade-in">
                <div class="service-icon">
                    <i class="fa-solid fa-headset"></i>
                </div>
                <h4>Suporte 24/7</h4>
                <p>Suporte técnico especializado disponível 24 horas por dia, 7 dias por semana.</p>
            </div>

            <div class="service-card fade-in">
                <div class="service-icon">
                    <i class="fa-solid fa-mobile-screen-button"></i>
                </div>
                <h4>Desenvolvimento de Apps</h4>
                <p>Aplicativos mobile nativos e multiplataforma para iOS e Android.</p>
            </div>

            <div class="service-card fade-in">
                <div class="service-icon">
                    <i class="fa-solid fa-brain"></i>
                </div>
                <h4>Inteligência Artificial</h4>
                <p>Soluções de IA e machine learning para automatizar processos.</p>
            </div>

            <div class="service-card fade-in">
                <div class="service-icon">
                    <i class="fa-solid fa-cloud"></i>
                </div>
                <h4>Cloud & Infraestrutura</h4>
                <p>Infraestrutura escalável e segura na nuvem.</p>
            </div>

            <div class="service-card fade-in">
                <div class="service-icon">
                    <i class="fa-solid fa-compass"></i>
                </div>
                <h4>Consultoria Digital</h4>
                <p>Consultoria estratégica para transformação digital do seu negócio.</p>
            </div>
        </div>

        <div class="stats-cta-container fade-in">
            <div class="stats-group">
                <div class="stat-item">
                    <div class="stat-number">500+</div>
                    <div class="stat-label">Projetos Concluídos</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">98%</div>
                    <div class="stat-label">Satisfação dos Clientes</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Monitoramento Ativo</div>
                </div>
            </div>
            <a href="contato.html" class="btn-cta-large">
                Solicitar Orçamento <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </section>
```

- [ ] **Step 5: Add footer**

```html
    <footer>
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="index.html" class="logo-container">
                    <div class="logo-text">Linu<span class="x-tech">X</span>is</div>
                </a>
                <p>Tecnologia que impulsiona o futuro. Soluções digitais de alta performance.</p>
                <div class="social-links">
                    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i class="fa-brands fa-github"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </div>
            <div class="footer-column">
                <h4>Links Rápidos</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="servicos.html">Serviços</a></li>
                    <li><a href="sobre.html">Sobre</a></li>
                    <li><a href="portfolio.html">Portfólio</a></li>
                    <li><a href="contato.html">Contato</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Contato</h4>
                <div class="contact-item">
                    <i class="fa-solid fa-envelope"></i>
                    <span>contato@linuxis.tech</span>
                </div>
                <div class="contact-item">
                    <i class="fa-solid fa-phone"></i>
                    <span>+55 (11) 99999-9999</span>
                </div>
                <div class="contact-item">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>São Paulo, SP</span>
                </div>
            </div>
            <div class="footer-column">
                <h4>Horário</h4>
                <p style="color: var(--text-dim); font-size: 0.9rem;">Seg - Sex: 9h - 18h</p>
                <p style="color: var(--text-dim); font-size: 0.9rem;">Suporte: 24/7</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 LinuXis. Todos os direitos reservados.</p>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 6: Verify servicos.html renders correctly**

Open `servicos.html` in browser and verify:
- Hero section with title
- 8 service cards in 3-column grid
- Footer matches design
- Mobile responsive
- Animations work

---

### Task 5: Create sobre.html (About Page)

**Files:**
- Create: `sobre.html`

**Interfaces:**
- Consumes: css/style.css, js/main.js

- [ ] **Step 1: Create sobre.html with head section**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LinuXis - Sobre Nós</title>
    <meta name="description" content="Conheça a história, missão e valores da LinuXis. Tecnologia que impulsiona o futuro.">
    <link rel="canonical" href="https://linuxis.tech/sobre.html">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
```

- [ ] **Step 2: Add body with background effects and header**

```html
<body>
    <div class="bg-effects">
        <div class="glow-circle-1"></div>
        <div class="glow-circle-2"></div>
        <div class="grid-overlay"></div>
    </div>

    <header>
        <a href="index.html" class="logo-container">
            <div class="logo-text">Linu<span class="x-tech">X</span>is</div>
            <div class="logo-subtext">Tecnologia que impulsiona o futuro</div>
        </a>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="servicos.html">Serviços</a></li>
                <li><a href="sobre.html" class="active">Sobre</a></li>
                <li><a href="portfolio.html">Portfólio</a></li>
                <li><a href="contato.html">Contato</a></li>
            </ul>
        </nav>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <a href="contato.html" class="btn-header">
            Começar Agora <i class="fa-solid fa-arrow-right"></i>
        </a>
    </header>

    <div class="mobile-menu">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="servicos.html">Serviços</a></li>
            <li><a href="sobre.html" class="active">Sobre</a></li>
            <li><a href="portfolio.html">Portfólio</a></li>
            <li><a href="contato.html">Contato</a></li>
        </ul>
        <a href="contato.html" class="btn-header">
            Começar Agora <i class="fa-solid fa-arrow-right"></i>
        </a>
    </div>
```

- [ ] **Step 3: Add hero section**

```html
    <main class="page-hero">
        <div class="hero-subtitle-tag">Quem Somos</div>
        <h1>
            Sobre a
            <span class="highlight-blue">LinuXis</span>
        </h1>
        <p class="hero-description">
            Conheça nossa história, missão e os valores que guiam nossa jornada na transformação digital.
        </p>
    </main>
```

- [ ] **Step 4: Add Mission, Vision, Values section**

```html
    <section class="section">
        <div class="mvv-grid">
            <div class="mvv-card fade-in">
                <i class="fa-solid fa-bullseye"></i>
                <h3>Missão</h3>
                <p>Desenvolver soluções digitais inovadoras que impulsionam o crescimento dos nossos clientes, combinando tecnologia de ponta com excelência em cada projeto.</p>
            </div>
            <div class="mvv-card fade-in">
                <i class="fa-solid fa-eye"></i>
                <h3>Visão</h3>
                <p>Ser referência global em soluções tecnológicas futuristas, reconhecida pela inovação, qualidade e impacto positivo nas empresas que atendemos.</p>
            </div>
            <div class="mvv-card fade-in">
                <i class="fa-solid fa-gem"></i>
                <h3>Valores</h3>
                <p>Inovação contínua, transparência, compromisso com resultados, trabalho em equipe e foco total na satisfação do cliente.</p>
            </div>
        </div>
```

- [ ] **Step 5: Add Statistics section**

```html
        <div class="about-stats fade-in">
            <div class="about-stat">
                <div class="number">500+</div>
                <div class="label">Projetos Concluídos</div>
            </div>
            <div class="about-stat">
                <div class="number">200+</div>
                <div class="label">Clientes Satisfeitos</div>
            </div>
            <div class="about-stat">
                <div class="number">8+</div>
                <div class="label">Anos de Experiência</div>
            </div>
            <div class="about-stat">
                <div class="number">50+</div>
                <div class="label">Especialistas</div>
            </div>
        </div>
```

- [ ] **Step 6: Add History section**

```html
        <div class="history-content fade-in">
            <h3 style="text-align: center; margin-bottom: 1.5rem;">Nossa História</h3>
            <p>
                Fundada em 2018, a LinuXis nasceu da paixão por tecnologia e da vontade de criar soluções que realmente fazem a diferença. Começamos como uma pequena equipe de desenvolvedores e, ao longo dos anos, crescemos para nos tornarmos uma referência em soluções digitais.
            </p>
            <p>
                Ao longo da nossa jornada, expandimos nossos serviços para incluir inteligência artificial, computação em nuvem e consultoria digital, sempre mantendo nosso compromisso com a inovação e a qualidade. Hoje, atendemos mais de 200 clientes em diversos segmentos, e continuamos evoluindo para superar as expectativas do mercado.
            </p>
        </div>

        <div style="text-align: center; margin-top: 3rem;">
            <a href="contato.html" class="btn-cta-large fade-in">
                Fale Conosco <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </section>
```

- [ ] **Step 7: Add footer**

Copy footer from `servicos.html` and paste before `</body>`.

- [ ] **Step 8: Add script tag**

```html
    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 9: Verify sobre.html renders correctly**

Open `sobre.html` in browser and verify:
- Hero section with title
- Mission, Vision, Values cards
- Statistics section
- History section
- Footer matches design

---

### Task 6: Create portfolio.html (Portfolio Page)

**Files:**
- Create: `portfolio.html`

**Interfaces:**
- Consumes: css/style.css, js/main.js

- [ ] **Step 1: Create portfolio.html with head section**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LinuXis - Portfólio</title>
    <meta name="description" content="Conheça os projetos da LinuXis. Cases de sucesso em web, mobile, IA e cloud.">
    <link rel="canonical" href="https://linuxis.tech/portfolio.html">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
```

- [ ] **Step 2: Add body with background effects and header**

Copy header and background effects from `sobre.html`, changing active link to `portfolio.html`.

- [ ] **Step 3: Add hero section**

```html
    <main class="page-hero">
        <div class="hero-subtitle-tag">Nossos Trabalhos</div>
        <h1>
            Nosso
            <span class="highlight-blue">Portfólio</span>
        </h1>
        <p class="hero-description">
            Conheça nossos projetos de sucesso e como ajudamos empresas a alcançar seus objetivos digitais.
        </p>
    </main>
```

- [ ] **Step 4: Add filter buttons and portfolio grid**

```html
    <section class="section">
        <div class="portfolio-filters">
            <button class="filter-btn active" data-filter="all">Todos</button>
            <button class="filter-btn" data-filter="web">Web</button>
            <button class="filter-btn" data-filter="mobile">Mobile</button>
            <button class="filter-btn" data-filter="ai">AI</button>
            <button class="filter-btn" data-filter="cloud">Cloud</button>
        </div>

        <div class="portfolio-grid">
            <div class="portfolio-card fade-in" data-category="web">
                <div class="portfolio-image">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div class="portfolio-info">
                    <div class="category">Web</div>
                    <h4>E-Commerce Platform</h4>
                    <p>Loja virtual completa com pagamento integrado e gestão de estoque.</p>
                </div>
            </div>

            <div class="portfolio-card fade-in" data-category="mobile">
                <div class="portfolio-image" style="background: linear-gradient(135deg, rgba(136, 0, 255, 0.2), rgba(240, 0, 255, 0.1));">
                    <i class="fa-solid fa-mobile-screen-button"></i>
                </div>
                <div class="portfolio-info">
                    <div class="category">Mobile</div>
                    <h4>Fitness Tracker App</h4>
                    <p>Aplicativo de monitoramento de saúde e fitness com IA.</p>
                </div>
            </div>

            <div class="portfolio-card fade-in" data-category="ai">
                <div class="portfolio-image" style="background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 240, 255, 0.1));">
                    <i class="fa-solid fa-brain"></i>
                </div>
                <div class="portfolio-info">
                    <div class="category">AI</div>
                    <h4>Chatbot Inteligente</h4>
                    <p>Assistente virtual com processamento de linguagem natural.</p>
                </div>
            </div>

            <div class="portfolio-card fade-in" data-category="cloud">
                <div class="portfolio-image" style="background: linear-gradient(135deg, rgba(255, 136, 0, 0.2), rgba(255, 200, 0, 0.1));">
                    <i class="fa-solid fa-cloud"></i>
                </div>
                <div class="portfolio-info">
                    <div class="category">Cloud</div>
                    <h4>Migration AWS</h4>
                    <p>Migração completa de infraestrutura para AWS com alta disponibilidade.</p>
                </div>
            </div>

            <div class="portfolio-card fade-in" data-category="web">
                <div class="portfolio-image">
                    <i class="fa-solid fa-building"></i>
                </div>
                <div class="portfolio-info">
                    <div class="category">Web</div>
                    <h4>Portal Corporativo</h4>
                    <p>Intranet completa com gestão de documentos e colaboração.</p>
                </div>
            </div>

            <div class="portfolio-card fade-in" data-category="mobile">
                <div class="portfolio-image" style="background: linear-gradient(135deg, rgba(136, 0, 255, 0.2), rgba(240, 0, 255, 0.1));">
                    <i class="fa-solid fa-utensils"></i>
                </div>
                <div class="portfolio-info">
                    <div class="category">Mobile</div>
                    <h4>Food Delivery App</h4>
                    <p>Aplicativo de delivery com rastreamento em tempo real.</p>
                </div>
            </div>
        </div>
    </section>
```

- [ ] **Step 5: Add footer and script**

Copy footer from `sobre.html` and add `<script src="js/main.js"></script>` before `</body>`.

- [ ] **Step 6: Verify portfolio.html renders correctly**

Open `portfolio.html` in browser and verify:
- Filter buttons work
- Cards filter correctly
- Animations work
- Footer displays correctly

---

### Task 7: Create contato.html (Contact Page)

**Files:**
- Create: `contato.html`

**Interfaces:**
- Consumes: css/style.css, js/main.js

- [ ] **Step 1: Create contato.html with head section**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LinuXis - Contato</title>
    <meta name="description" content="Entre em contato com a LinuXis. Solicite orçamento, tire dúvidas ou proponha uma parceria.">
    <link rel="canonical" href="https://linuxis.tech/contato.html">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
```

- [ ] **Step 2: Add body with background effects and header**

Copy header and background effects from `portfolio.html`, changing active link to `contato.html`.

- [ ] **Step 3: Add hero section**

```html
    <main class="page-hero">
        <div class="hero-subtitle-tag">Entre em Contato</div>
        <h1>
            Fale
            <span class="highlight-blue">Conosco</span>
        </h1>
        <p class="hero-description">
            Estamos prontos para ajudar. Solicite um orçamento ou tire suas dúvidas conosco.
        </p>
    </main>
```

- [ ] **Step 4: Add contact form and cards**

```html
    <section class="section">
        <div class="contact-container">
            <form id="contactForm" class="contact-form fade-in">
                <div class="form-group">
                    <label for="name">Nome Completo *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="company">Empresa</label>
                    <input type="text" id="company" name="company">
                </div>
                <div class="form-group">
                    <label for="phone">Telefone</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="form-group">
                    <label for="subject">Assunto *</label>
                    <select id="subject" name="subject" required>
                        <option value="">Selecione...</option>
                        <option value="orcamento">Orçamento</option>
                        <option value="duvida">Dúvida</option>
                        <option value="parceria">Parceria</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message">Mensagem *</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" class="btn-submit">
                    Enviar <i class="fa-solid fa-paper-plane"></i>
                </button>
            </form>

            <div class="contact-cards fade-in">
                <div class="contact-card">
                    <i class="fa-solid fa-envelope"></i>
                    <h4>Email</h4>
                    <p>contato@linuxis.tech</p>
                </div>
                <div class="contact-card">
                    <i class="fa-solid fa-phone"></i>
                    <h4>Telefone</h4>
                    <p>+55 (11) 99999-9999</p>
                </div>
                <div class="contact-card">
                    <i class="fa-solid fa-location-dot"></i>
                    <h4>Endereço</h4>
                    <p>São Paulo, SP - Brasil</p>
                </div>
            </div>
        </div>
    </section>
```

- [ ] **Step 5: Add footer and script**

Copy footer from `portfolio.html` and add `<script src="js/main.js"></script>` before `</body>`.

- [ ] **Step 6: Verify contato.html renders correctly**

Open `contato.html` in browser and verify:
- Form displays correctly
- Validation works (try submitting empty form)
- Contact cards display
- Footer matches design

---

### Task 8: Final Testing and Polish

**Files:**
- No new files (testing existing)

**Interfaces:**
- All tasks completed

- [ ] **Step 1: Test all pages in Chrome**

Open each page and verify:
- Header displays correctly
- Navigation works (click all links)
- Mobile menu works (resize to < 900px)
- Animations trigger on scroll
- Footer displays correctly
- No console errors

- [ ] **Step 2: Test all pages in Firefox**

Repeat Step 1 in Firefox.

- [ ] **Step 3: Test all pages in Safari**

Repeat Step 1 in Safari.

- [ ] **Step 4: Test all pages in Edge**

Repeat Step 1 in Edge.

- [ ] **Step 5: Test mobile responsiveness**

Test at these breakpoints:
- 1200px (desktop)
- 900px (tablet - hamburger appears)
- 600px (mobile - single column)
- 375px (small mobile)

- [ ] **Step 6: Test form validation on contato.html**

Test:
- Submit empty form → errors appear
- Enter invalid email → error appears
- Fill all fields correctly → form submits

- [ ] **Step 7: Test portfolio filters on portfolio.html**

Test:
- Click "Todos" → all cards show
- Click "Web" → only web cards show
- Click "Mobile" → only mobile cards show
- Click "AI" → only AI cards show
- Click "Cloud" → only cloud cards show

- [ ] **Step 8: Verify all links work**

Test all navigation links between pages.

- [ ] **Step 9: Clean up temporary files**

Remove `.superpowers/brainstorm/` directory if not needed.

---

## Success Criteria

1. All 5 pages render correctly with consistent design ✓
2. Navigation works across all pages ✓
3. Mobile responsive with hamburger menu ✓
4. Smooth animations and transitions ✓
5. Form validation works on contact page ✓
6. All pages load within 3 seconds ✓
7. Cross-browser compatibility ✓
