# LinuXis Website - UI/UX Redesign & Multi-Page Creation

## Overview

Redesign the LinuXis website with improved UI/UX while maintaining the dark futuristic aesthetic, and create 4 additional pages to make the site fully navigable for B2B service sales.

## Goals

1. Improve UI/UX presentation while keeping the dark futuristic style
2. Create 4 new pages: Serviços, Sobre, Portfólio, Contato
3. Make the site fully navigable with consistent header/footer
4. Extract CSS to shared external file for maintainability
5. Add responsive mobile navigation (hamburger menu)
6. Add smooth animations and transitions

## Project Structure

```
Projeto_LinuXis/
├── index.html          (Home - improved)
├── servicos.html       (Services page)
├── sobre.html          (About page)
├── portfolio.html      (Portfolio page)
├── contato.html        (Contact page)
├── css/
│   └── style.css       (Shared styles)
├── js/
│   └── main.js         (Shared JavaScript)
├── images/
│   └── linuxis.png     (Existing logo)
└── docs/
```

## Shared Components

### Header/Navbar
- Logo LinuXis with arc effect on 'X'
- Navigation links: Home, Serviços, Sobre, Portfólio, Contato
- CTA button: "Começar Agora"
- Hamburger menu for mobile (< 900px)
- Active page indicator

### Footer
- Company info and logo
- Quick links (Home, Serviços, Sobre, Portfólio, Contato)
- Contact info (email, phone, address)
- Social media links (LinkedIn, GitHub, Instagram)
- Copyright notice

### Background Effects
- Glow circles (fixed position)
- Grid overlay
- Reused across all pages

## Page Designs

### 1. Home (index.html) - Improvements

**Current elements to keep:**
- Hero section with title + description + laptop mockup
- 4 service cards
- Statistics + CTA
- Glow effects and grid

**New improvements:**
- Add hamburger menu for mobile navigation
- Implement smooth scroll between sections
- Add fade-in animations on cards when entering viewport
- Add active section indicator in navbar
- Add complete footer

### 2. Serviços (servicos.html)

**Content:**
- Hero section: "Nossos Serviços" title + subtitle
- Expanded service grid (6-8 cards):
  - Design de Sites
  - SEO & Crescimento
  - E-Commerce
  - Suporte 24/7
  - Desenvolvimento de Apps
  - Inteligência Artificial
  - Cloud & Infraestrutura
  - Consultoria Digital
- Each card: Icon + title + short description
- CTA final: "Solicitar Orçamento" linking to contact

**Layout:** Responsive grid 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)

### 3. Sobre (sobre.html)

**Content:**
- Hero section: "Sobre a LinuXis" title + subtitle
- Mission, Vision, Values: 3 cards with icons
- Our History: Descriptive paragraph or timeline
- Numbers that Matter: Statistics (projects, clients, years)
- Team section: Optional team member cards
- CTA final: "Trabalhe Conosco" or "Fale Conosco"

**Layout:** Vertically stacked sections, responsive

### 4. Portfólio (portfolio.html)

**Content:**
- Hero section: "Nosso Portfólio" title + subtitle
- Filter buttons: Web, Mobile, AI, Cloud
- Project grid: Cards with:
  - Project image/mockup
  - Project title
  - Category
  - "Ver Mais" link
- Project details: Modal or dedicated page with:
  - Project description
  - Technologies used
  - Results/impact
  - Screenshots

**Layout:** Responsive grid 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)

### 5. Contato (contato.html)

**Content:**
- Hero section: "Fale Conosco" title + subtitle
- Contact form fields:
  - Full name
  - Email
  - Company (optional)
  - Phone (optional)
  - Subject select: Orçamento, Dúvida, Parceria, Outro
  - Message textarea
  - "Enviar" button
- Contact information:
  - Email: contato@linuxis.tech
  - Phone: +55 (11) 99999-9999
  - Address: São Paulo, SP
- Google Maps embed (optional)
- Social media links

**Layout:** 2-column grid (form + info) on desktop, stacked on mobile

## Technical Specifications

### CSS Architecture
- CSS custom properties (variables) for colors, fonts, spacing
- Mobile-first responsive design
- Breakpoints: 900px (tablet), 600px (mobile)
- Transitions and animations for hover effects

### JavaScript Features
- Hamburger menu toggle
- Smooth scroll navigation
- Intersection Observer for scroll animations
- Active section indicator
- Form validation (basic)

### SEO Considerations
- Unique meta tags per page
- Semantic HTML structure
- Schema.org markup where applicable
- Canonical URLs

## Success Criteria

1. All 5 pages render correctly with consistent design
2. Navigation works across all pages
3. Mobile responsive with hamburger menu
4. Smooth animations and transitions
5. Form validation works on contact page
6. All pages load within 3 seconds
7. Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
