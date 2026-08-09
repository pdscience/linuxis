# LinuXis Website Redesign - Design Spec

## Overview

Redesign the LinuXis website with improved UI/UX while maintaining the dark futuristic aesthetic, and create 4 additional pages for B2B service sales.

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

## Design Decisions

### 1. Navigation

**Choice:** Fixed navbar + hamburger for mobile

- Navbar fixed at top with `backdrop-filter: blur(16px)`
- Hamburger menu appears at `< 900px`
- Active page indicator with color highlight
- CTA button: "Começar Agora"

### 2. Services Grid

**Choice:** 3-column responsive grid

- Desktop: 3 columns
- Tablet (≤900px): 2 columns
- Mobile (≤600px): 1 column
- 8 service cards with icon, title, short description

Services:
1. Design de Sites
2. SEO & Crescimento
3. E-Commerce
4. Suporte 24/7
5. Desenvolvimento de Apps
6. Inteligência Artificial
7. Cloud & Infraestrutura
8. Consultoria Digital

### 3. Footer

**Choice:** 4-column layout

- Column 1: Logo + company description
- Column 2: Quick links (Home, Serviços, Sobre, Portfólio, Contato)
- Column 3: Contact info (email, phone, address)
- Column 4: Social media links (LinkedIn, GitHub, Instagram)
- Copyright notice at bottom

### 4. Contact Page

**Choice:** Form + stacked contact cards

- Left: Contact form (name, email, company, phone, subject select, message, submit)
- Right: Stacked cards with icons for email, phone, address
- 2-column on desktop, stacked on mobile

### 5. Portfolio Page

**Choice:** Grid with filter buttons

- Filter buttons: Todos, Web, Mobile, AI, Cloud
- Grid of cards with image area, title, category
- 3 columns desktop → 2 tablet → 1 mobile

### 6. About Page

**Choice:** Stacked sections

1. Hero section with title + subtitle
2. Mission, Vision, Values: 3 cards with icons
3. Numbers that matter: Statistics (500+ projects, 200+ clients, 8+ years, 50+ team)
4. Our History: Descriptive paragraph
5. CTA: "Fale Conosco"

### 7. Animations

**Choice:** Scale + Fade

- Elements scale from 0.95 to 1.0
- Opacity from 0 to 1
- Triggered by Intersection Observer when entering viewport
- Duration: ~0.5s ease-out

### 8. Mobile Menu

**Choice:** Slide-down with blur

- Menu slides down from header
- `backdrop-filter: blur(16px)` for glassmorphism
- Dark overlay background
- Links stacked vertically
- CTA button at bottom

### 9. Form Validation

**Choice:** Borders + inline messages

- Error: red border + red message below field
- Success: green border + green message below field
- Real-time validation on blur
- Submit blocked until all required fields valid

## Shared Components

### Header/Navbar
- Logo LinuXis with arc effect on 'X'
- Navigation links: Home, Serviços, Sobre, Portfólio, Contato
- CTA button: "Começar Agora"
- Hamburger menu for mobile (< 900px)
- Active page indicator

### Footer
- Company info and logo
- Quick links
- Contact info
- Social media links
- Copyright notice

### Background Effects
- Glow circles (fixed position)
- Grid overlay
- Reused across all pages

## CSS Architecture

- CSS custom properties (variables) for colors, fonts, spacing
- Mobile-first responsive design
- Breakpoints: 900px (tablet), 600px (mobile)
- Transitions and animations for hover effects

## JavaScript Features

- Hamburger menu toggle
- Smooth scroll navigation
- Intersection Observer for scroll animations
- Active section indicator
- Form validation (basic)
- Portfolio filter functionality

## SEO Considerations

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
