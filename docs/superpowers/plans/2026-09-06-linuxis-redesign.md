# LinuXis Cinematic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the LinuXis one-pager as a SpaceX-style cinematic single page — each of the 7 services as its own full-bleed module with a procedural SVG background, plus hero, marquee, FAQ, and WhatsApp form, driven by GSAP + ScrollTrigger.

**Architecture:** Astro static site. One orchestration script (`src/scripts/main.js`) imported once in `Layout.astro` wires all behaviors via data attributes and DOM classes — no per-component script duplication. Components are presentational; animation logic lives in one place.

**Tech Stack:** Astro 7, GSAP 3 + ScrollTrigger (npm), vanilla JS, plain CSS (single `global.css`), procedural inline SVGs for service backgrounds.

**Spec:** `docs/superpowers/specs/2026-09-06-linuxis-redesign-design.md`

## Global Constraints

- Brand palette: deep space black `#01040a`, panel `#030814`, accent blue `#00a8ff`, cyan `#31d4ff`, white `#f4f8ff`, muted `#8da2b9`. No red/orange.
- Language: site copy in pt-BR.
- All backgrounds for service modules are procedural inline SVGs in `src/assets/services/`. No external requests for assets.
- Analytics ready but inert: GTM/GA4/Meta Pixel tags are conditional on env vars `PUBLIC_GTM_ID`, `PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID`. Never hardcode real IDs.
- WhatsApp number for the form: `5561996911526`; email fallback: `linuxis.oficial@gmail.com`.
- `prefers-reduced-motion: reduce` must disable GSAP animations, tilt, marquee animation, parallax; content stays visible.
- Progressive enhancement: elements that GSAP animates are fully visible by default in CSS; opacity/transform "hidden" states are applied only via JS immediately before animating in.
- Verify each task with `npm run build` (must complete without errors) before committing.

---

### Task 1: Install GSAP and scaffold script modules

**Files:**
- Modify: `package.json` (add `gsap` dependency, `test` not needed — build is the gate)
- Create: `src/scripts/analytics.js`
- Create: `src/scripts/gsapSetup.js`
- Create: `src/scripts/main.js`

**Interfaces:**
- Produces: `window.track(eventName, params)` — pushes `{ event: eventName, ...params }` to `window.dataLayer`.
- Produces: `hasReducedMotion()` (`src/scripts/gsapSetup.js`) — returns `true` if `prefers-reduced-motion: reduce`.
- Produces: `registerScroll()`, `animateHero()`, `setupTilt()`, `animateCharts()`, `setupFaq()`, `setupContactForm()` exported from `main.js` (used internally in later tasks' scripts — keep names stable).
- Produces: `src/scripts/main.js` as the single script imported by `Layout.astro`.

- [ ] **Step 1: Install GSAP**

Run: `npm install gsap`
Expected: `package.json` contains `"gsap": "^3.12.5"` (or newer 3.x) in `dependencies`.

- [ ] **Step 2: Create `src/scripts/analytics.js`**

```js
export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function initDataLayer() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
}
```

- [ ] **Step 3: Create `src/scripts/gsapSetup.js`**

```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function hasReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 4: Create `src/scripts/main.js` (stub, filled in later tasks)**

```js
import { initDataLayer } from "./analytics.js";
import { hasReducedMotion } from "./gsapSetup.js";

export function animateHero() {}
export function registerScroll() {}
export function setupTilt() {}
export function animateCharts() {}
export function setupFaq() {}
export function setupContactForm() {}

initDataLayer();
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/scripts/analytics.js src/scripts/gsapSetup.js src/scripts/main.js
git commit -m "chore: add gsap and analytics/gsap script modules"
```

---

### Task 2: Rewrite global stylesheet

**Files:**
- Modify: `src/styles/global.css` (full rewrite)

**Interfaces:**
- Consumes: class names used by components in later tasks — defined in the CSS below.
- Produces: design tokens, glass cards, hero, marquee, modules, chart, faq, form, footer, responsive, reduced-motion.

- [ ] **Step 1: Replace `src/styles/global.css` with the full stylesheet**

```css
:root {
  --bg: #01040a;
  --bg2: #030814;
  --panel: rgba(7, 18, 32, 0.72);
  --panel2: rgba(10, 28, 48, 0.55);
  --blue: #00a8ff;
  --cyan: #31d4ff;
  --white: #f4f8ff;
  --muted: #8da2b9;
  --line: rgba(0, 168, 255, 0.22);
  --shadow: 0 0 40px rgba(0, 168, 255, 0.13);
  --radius: 22px;
  --max: 1200px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-padding-top: 90px; }
body {
  background: var(--bg);
  color: var(--white);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  overflow-x: hidden;
}
a { text-decoration: none; color: inherit; }
button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
img, svg { display: block; max-width: 100%; }
:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }

/* ---------- progress + cursor glow ---------- */
#progress {
  position: fixed; top: 0; left: 0; height: 2px; width: 0;
  background: linear-gradient(90deg, var(--blue), #fff, var(--cyan));
  z-index: 10000; box-shadow: 0 0 14px var(--blue);
}
#cursor-glow {
  position: fixed; z-index: 1; width: 460px; height: 460px; border-radius: 50%;
  pointer-events: none; transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(0, 168, 255, 0.16), transparent 65%);
  mix-blend-mode: screen;
}

/* ---------- nav ---------- */
.nav {
  position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
  padding: 18px 4%; display: flex; align-items: center; justify-content: space-between;
  transition: 0.35s ease;
}
.nav.scrolled {
  background: rgba(1, 4, 10, 0.78);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(0, 168, 255, 0.12);
}
.nav-logo { width: 150px; height: 72px; object-fit: cover; border-radius: 5px; mix-blend-mode: screen; }
.nav-links { display: flex; gap: 28px; align-items: center; }
.nav-links a { color: #b9c9d9; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; transition: 0.25s; font-weight: 600; }
.nav-links a:hover { color: #fff; text-shadow: 0 0 15px var(--blue); }
.nav-cta {
  padding: 11px 19px; border: 1px solid rgba(0, 168, 255, 0.55); border-radius: 999px;
  color: #fff !important; background: rgba(0, 168, 255, 0.07);
}
.menu { display: none; color: white; font-size: 25px; }
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
  .menu { display: block; }
  .nav-links.open {
    display: flex; position: absolute; top: 70px; left: 4%; right: 4%; padding: 18px;
    flex-direction: column; background: rgba(2, 8, 16, 0.97); border: 1px solid var(--line);
    border-radius: 15px; gap: 18px;
  }
}

/* ---------- hero ---------- */
.hero {
  min-height: 100vh; position: relative; display: flex; align-items: center; gap: clamp(20px, 4vw, 56px);
  padding: 140px 7% 80px; overflow: hidden;
}
.hero-media {
  position: absolute; inset: 0; z-index: 0; overflow: hidden;
}
.hero-media img, .hero-media video { width: 100%; height: 100%; object-fit: cover; }
.hero-media video { display: none; }
.hero-media.playing video { display: block; }
.hero-media.playing img { display: none; }
.hero::before {
  content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(circle at 70% 40%, rgba(0, 136, 255, 0.22), transparent 30%),
    radial-gradient(circle at 15% 70%, rgba(0, 80, 160, 0.12), transparent 28%),
    linear-gradient(180deg, #01030a, #020711 60%, #01040a);
}
.hero-grid {
  position: absolute; inset: -20%; z-index: 1; opacity: 0.32;
  background-image:
    linear-gradient(rgba(0, 168, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 168, 255, 0.07) 1px, transparent 1px);
  background-size: 58px 58px;
  transform: perspective(700px) rotateX(58deg) translateY(25%);
  transform-origin: center bottom;
  mask-image: linear-gradient(to top, black, transparent 75%);
}
.hero-content { position: relative; z-index: 3; flex: 1 1 55%; max-width: min(60vw, 760px); }
.eyebrow {
  display: inline-flex; align-items: center; gap: 10px; border: 1px solid rgba(0, 168, 255, 0.25);
  background: rgba(0, 168, 255, 0.045); padding: 8px 13px; border-radius: 999px; color: #9ddfff;
  font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 24px;
}
.eyebrow i { width: 7px; height: 7px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 14px var(--blue); }
.hero h1 {
  font-size: clamp(2.8rem, 7.6vw, 6.8rem); line-height: 0.85; letter-spacing: -0.06em;
  text-transform: uppercase; margin-bottom: 28px; position: relative;
}
.hero h1 span { color: transparent; -webkit-text-stroke: 1px rgba(255, 255, 255, 0.78); }
.hero h1 strong {
  display: block;
  background: linear-gradient(110deg, #fff 15%, #b9eaff 50%, var(--blue) 85%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.hero p { max-width: 680px; color: #9cafc2; font-size: 1.08rem; line-height: 1.8; margin-bottom: 34px; }
.actions { display: flex; gap: 14px; flex-wrap: wrap; }
.btn {
  padding: 15px 24px; border-radius: 10px; display: inline-flex; align-items: center; gap: 9px;
  font-weight: 700; letter-spacing: 0.03em; transition: 0.25s; cursor: pointer;
}
.btn-primary { color: #00111d; background: linear-gradient(100deg, #fff, #a8e7ff); box-shadow: 0 0 28px rgba(0, 168, 255, 0.25); }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 0 42px rgba(0, 168, 255, 0.4); }
.btn-ghost { border: 1px solid rgba(0, 168, 255, 0.35); background: rgba(0, 168, 255, 0.05); color: #dff6ff; }
.btn-ghost:hover { border-color: var(--blue); background: rgba(0, 168, 255, 0.1); }
.hero-scroll {
  position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 3;
  color: var(--muted); font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.hero-scroll::after { content: ""; width: 1px; height: 46px; background: linear-gradient(var(--blue), transparent); }
@media (max-width: 900px) {
  .hero { min-height: 92vh; }
  .hero-content { max-width: 100%; flex-basis: 100%; }
}

/* ---------- marquee ---------- */
.marquee {
  padding: 30px 0; border-top: 1px solid rgba(0, 168, 255, 0.1); border-bottom: 1px solid rgba(0, 168, 255, 0.1);
  overflow: hidden; position: relative; z-index: 2;
}
.marquee-track {
  display: flex; gap: 54px; width: max-content; animation: marquee 26s linear infinite;
}
.marquee-track span {
  white-space: nowrap; font-size: 1rem; letter-spacing: 0.24em; text-transform: uppercase;
  color: rgba(244, 248, 255, 0.5); display: flex; align-items: center; gap: 14px;
}
.marquee-track span::after { content: "✦"; color: var(--blue); font-size: 0.7rem; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ---------- module section ---------- */
.module {
  position: relative; padding: 130px 7%; overflow: hidden;
}
.module-bg { position: absolute; inset: 0; z-index: 0; opacity: 0.32; }
.module-bg img { width: 100%; height: 100%; object-fit: cover; }
.module-bg::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(1, 4, 10, 0.92), rgba(1, 4, 10, 0.55) 45%, rgba(1, 4, 10, 0.96));
}
.module-body { position: relative; z-index: 2; max-width: var(--max); margin: 0 auto; }
.module-head { max-width: 760px; margin-bottom: 48px; }
.kicker { color: var(--blue); font-size: 0.74rem; font-weight: 800; letter-spacing: 0.28em; text-transform: uppercase; margin-bottom: 14px; }
.module h2 { font-size: clamp(2.1rem, 4.4vw, 4.2rem); line-height: 1.04; letter-spacing: -0.04em; }
.module h2 em { font-style: normal; color: #69d8ff; }
.module-head p { margin-top: 18px; color: var(--muted); line-height: 1.75; max-width: 640px; }
.module-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 44px; align-items: center; }
@media (max-width: 900px) { .module-grid { grid-template-columns: 1fr; } .module { padding: 90px 6%; } }

/* ---------- glass card ---------- */
.glass {
  position: relative; border-radius: var(--radius); padding: 30px;
  border: 1px solid rgba(0, 168, 255, 0.16);
  background: linear-gradient(145deg, rgba(9, 24, 42, 0.6), rgba(2, 8, 16, 0.55));
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 18px 45px rgba(0, 0, 0, 0.35);
  transform-style: preserve-3d; will-change: transform;
}
.glass .icon {
  width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center;
  border: 1px solid rgba(0, 168, 255, 0.35); background: rgba(0, 168, 255, 0.06);
  color: #7ddfff; font-size: 22px; margin-bottom: 20px; transform: translateZ(30px);
}
.glass h3 { font-size: 1.16rem; margin-bottom: 12px; transform: translateZ(22px); }
.glass p { color: #8298ae; line-height: 1.7; font-size: 0.93rem; transform: translateZ(14px); }
.tilt-stack { perspective: 1100px; display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.feature-list { list-style: none; display: grid; gap: 14px; }
.feature-list li {
  display: flex; gap: 12px; align-items: flex-start; color: #b9c9d9; line-height: 1.65; font-size: 0.98rem;
}
.feature-list li::before { content: "▸"; color: var(--blue); }

/* ---------- chart ---------- */
.chart-panel {
  border: 1px solid rgba(0, 168, 255, 0.16); border-radius: var(--radius); padding: 28px;
  background: rgba(4, 13, 24, 0.7); box-shadow: var(--shadow);
}
.chart-panel h4 { font-size: 0.78rem; color: var(--muted); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 18px; }
.chart-svg { width: 100%; height: auto; }
.chart-line { stroke: var(--blue); stroke-width: 2.5; fill: none; stroke-linecap: round; }
.chart-fill { fill: url(#chartGrad); }
.chart-dot { fill: #fff; stroke: var(--blue); stroke-width: 2; }

/* ---------- terminal ---------- */
.terminal {
  background: #01050b; border: 1px solid rgba(0, 168, 255, 0.17); border-radius: 14px;
  overflow: hidden; box-shadow: 0 0 40px rgba(0, 168, 255, 0.07);
}
.term-top { height: 38px; display: flex; align-items: center; gap: 7px; padding: 0 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
.term-top i { width: 8px; height: 8px; border-radius: 50%; background: #355064; }
.terminal pre { padding: 26px; color: #72d8ff; font: 13px/1.9 ui-monospace, SFMono-Regular, Menlo, monospace; white-space: pre-wrap; }
.highlight { color: #fff; }
.green { color: #6bffa7; }

/* ---------- stages ---------- */
.stages { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
@media (max-width: 900px) { .stages { grid-template-columns: 1fr; } }
.stage { padding: 24px; border: 1px solid rgba(0, 168, 255, 0.13); border-radius: 14px; background: rgba(0, 168, 255, 0.025); }
.stage b { display: block; font-size: 1.7rem; color: #fff; margin-bottom: 8px; }
.stage span { font-size: 0.78rem; color: #7890a7; text-transform: uppercase; letter-spacing: 0.12em; line-height: 1.7; }

/* ---------- mission (sobre) ---------- */
.mission {
  position: relative; text-align: center; padding: 130px 7%;
  background: radial-gradient(circle at center, rgba(0, 132, 255, 0.12), transparent 50%), var(--bg);
}
.mission h2 { font-size: clamp(2.2rem, 5vw, 5rem); letter-spacing: -0.055em; max-width: 920px; margin: 0 auto; }
.mission p { color: #91a5b9; max-width: 650px; margin: 22px auto 30px; line-height: 1.7; }

/* ---------- faq ---------- */
.faq { max-width: 820px; margin: 0 auto; display: grid; gap: 14px; }
.faq-item { border: 1px solid rgba(0, 168, 255, 0.14); border-radius: 14px; background: rgba(4, 13, 24, 0.5); overflow: hidden; }
.faq-q {
  width: 100%; text-align: left; padding: 20px 22px; display: flex; justify-content: space-between;
  align-items: center; gap: 16px; font-size: 1.02rem; font-weight: 600; color: #dff6ff;
}
.faq-q .fx { font-size: 1.3rem; color: var(--blue); transition: transform 0.3s; }
.faq-item.open .fx { transform: rotate(45deg); }
.faq-a { max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.4s ease; padding: 0 22px; }
.faq-item.open .faq-a { padding: 0 22px 22px; }
.faq-a p { color: #8298ae; line-height: 1.7; font-size: 0.95rem; }

/* ---------- contact ---------- */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; align-items: start; }
@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
.form { display: grid; gap: 16px; }
.form label { font-size: 0.74rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.form input, .form select, .form textarea {
  width: 100%; padding: 14px 16px; border-radius: 10px; color: #fff; font: inherit;
  border: 1px solid rgba(0, 168, 255, 0.22); background: rgba(2, 8, 16, 0.7); transition: 0.25s;
}
.form textarea { min-height: 130px; resize: vertical; }
.form input:focus, .form select:focus, .form textarea:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(0, 168, 255, 0.15); }
.form select option { background: #020711; }
.form-note { color: var(--muted); font-size: 0.82rem; line-height: 1.6; }
.form-fallback { display: none; margin-top: 8px; }
.form-fallback.show { display: block; }
.form-fallback textarea { font-size: 0.85rem; }
.contact-info { display: grid; gap: 18px; }
.contact-info .glass p { color: #b9c9d9; }

/* ---------- footer ---------- */
footer {
  padding: 34px 7%; border-top: 1px solid rgba(0, 168, 255, 0.12);
  display: flex; justify-content: space-between; gap: 20px; align-items: center;
  color: #62778d; background: #01040a; font-size: 0.82rem;
}
footer strong { color: #dceeff; }
.footer-line { width: 100px; height: 1px; background: var(--blue); box-shadow: 0 0 10px var(--blue); }
@media (max-width: 620px) { footer { flex-direction: column; text-align: center; } }

/* ---------- reveal (JS-driven only) ---------- */
.js-anim .reveal { opacity: 0; transform: translateY(38px); }
.js-anim .reveal.is-in { opacity: 1; transform: none; }

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .marquee-track { animation: none; }
  .tilt-stack { perspective: none; }
  .glass { transform: none !important; }
  * { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
}
```

- [ ] **Step 2: Verify build still passes**

Run: `npm run build`
Expected: completes without errors (components currently reference old classes; this task is CSS-only, hover build failures expected if stale class refs — if so, note them for Task 4+).

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: cinematic design system, glass cards, marquee, faq, form"
```

---

### Task 3: Procedural SVG service backgrounds

**Files:**
- Create: `src/assets/services/google.svg`
- Create: `src/assets/services/suporte.svg`
- Create: `src/assets/services/manutencao.svg`
- Create: `src/assets/services/software.svg`
- Create: `src/assets/services/aplicativos.svg`
- Create: `src/assets/services/empresas.svg`
- Create: `src/assets/services/consultoria.svg`

**Interfaces:**
- Produces: 7 SVGs with `viewBox="0 0 1200 800"`, `preserveAspectRatio="xMidYMid slice"`, `aria-hidden` semantics, width/height 100% — used as `module-bg` images.

- [ ] **Step 1: Create `src/assets/services/google.svg`** (map pin + leads line + magnifier theme)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" width="1200" height="800" role="img" aria-hidden="true">
  <defs>
    <radialGradient id="g-bg" cx="40%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#06203a"/>
      <stop offset="60%" stop-color="#030814"/>
      <stop offset="100%" stop-color="#01040a"/>
    </radialGradient>
    <linearGradient id="g-cyan" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#00a8ff"/>
      <stop offset="100%" stop-color="#31d4ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g-bg)"/>
  <path d="M0 200H900V80" stroke="#00a8ff" stroke-width="1.2" fill="none" opacity="0.5"/>
  <path d="M0 600H1200" stroke="#00a8ff" stroke-width="1.2" fill="none" opacity="0.5"/>
  <g transform="translate(760 250)" opacity="0.85">
    <circle cx="70" cy="70" r="46" fill="none" stroke="#31d4ff" stroke-width="2.5"/>
    <path d="M70 26v14M70 100v14M26 70h14M100 70h14" stroke="#00a8ff" stroke-width="2.5"/>
    <path d="M45 45l18 18M95 95l-18-18" stroke="#00a8ff" stroke-width="2.5"/>
    <path d="M70 150l30 40M70 150l-30 40M100 190h-60" stroke="url(#g-cyan)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <polyline points="70,150 100,160 130,150 165,140 195,148 235,120" fill="none" stroke="#6bffa7" stroke-width="3" stroke-linecap="round"/>
  </g>
  <g opacity="0.4" font-family="monospace" fill="#8da2b9" font-size="16">
    <text x="120" y="620">map_pin = loc(55.7, -37.5)</text>
    <text x="120" y="652">leads += ad_optimize()</text>
    <text x="120" y="684">reach *= 1.8</text>
  </g>
</svg>
```

- [ ] **Step 2: Create `src/assets/services/suporte.svg`** (chip + wrench + diagnostic nodes theme)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" width="1200" height="800" role="img" aria-hidden="true">
  <defs>
    <radialGradient id="s-bg" cx="60%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#06203a"/>
      <stop offset="60%" stop-color="#030814"/>
      <stop offset="100%" stop-color="#01040a"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#s-bg)"/>
  <g opacity="0.5">
    <line x1="120" y1="80" x2="1080" y2="80" stroke="#00a8ff" stroke-width="1"/> 
    <line x1="120" y1="720" x2="1080" y2="720" stroke="#00a8ff" stroke-width="1"/>
  </g>
  <g transform="translate(760 240)" opacity="0.9">
    <rect x="0" y="0" width="230" height="230" rx="18" fill="rgba(0,168,255,0.05)" stroke="#00a8ff" stroke-width="2"/>
    <path d="M0 34h230M74 0v230M154 0v230M0 96h230M0 156h230" stroke="#31d4ff" stroke-width="1.5" opacity="0.6"/>
    <circle cx="37" cy="37" r="14" fill="none" stroke="#31d4ff" stroke-width="2"/>
    <path d="M115 115l20 20M135 115l-20 20" stroke="#6bffa7" stroke-width="2.5"/>
    <circle cx="115" cy="115" r="6" fill="#00a8ff"/>
    <circle cx="190" cy="60" r="5" fill="#31d4ff"/>
    <circle cx="60" cy="200" r="5" fill="#31d4ff"/>
  </g>
  <g opacity="0.45" font-family="monospace" fill="#8da2b9" font-size="16">
    <text x="120" y="600">diag: hw_status = OK</text>
    <text x="120" y="632">net: ping → 12ms</text>
    <text x="120" y="664">peripherals: linked</text>
  </g>
</svg>
```

- [ ] **Step 3: Create `src/assets/services/manutencao.svg`** (gauge/performance + sparkline theme)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" width="1200" height="800" role="img" aria-hidden="true">
  <defs>
    <radialGradient id="m-bg" cx="45%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#06203a"/>
      <stop offset="60%" stop-color="#030814"/>
      <stop offset="100%" stop-color="#01040a"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#m-bg)"/>
  <g transform="translate(700 240)" opacity="0.9">
    <path d="M0 200a160 160 0 0 1 320 0Z" fill="none" stroke="#00a8ff" stroke-width="2.5"/>
    <path d="M160 200a100 100 0 0 1 90 55" fill="none" stroke="#6bffa7" stroke-width="3"/>
    <line x1="160" y1="200" x2="238" y2="124" stroke="#31d4ff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="160" cy="200" r="7" fill="#fff"/>
    <text x="160" y="262" text-anchor="middle" fill="#dff6ff" font-family="monospace" font-size="22">84%</text>
  </g>
  <polyline points="120,520 220,500 320,515 420,470 520,480 620,430 720,445 820,400 920,410 1020,360" fill="none" stroke="#31d4ff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  <polyline points="120,620 220,610 320,618 420,580 520,590 620,545 720,560 820,510 920,520 1020,470" fill="none" stroke="#00a8ff" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
</svg>
```

- [ ] **Step 4: Create `src/assets/services/software.svg`** (code brackets + flow nodes + terminal lines theme)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" width="1200" height="800" role="img" aria-hidden="true">
  <defs>
    <radialGradient id="sw-bg" cx="58%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#06203a"/>
      <stop offset="60%" stop-color="#030814"/>
      <stop offset="100%" stop-color="#01040a"/>
    </radialGradient>
    <linearGradient id="sw-deco" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#00a8ff"/>
      <stop offset="100%" stop-color="#31d4ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#sw-bg)"/>
  <g transform="translate(720 260)" opacity="0.9">
    <text x="0" y="0" font-family="monospace" font-size="220" fill="none" stroke="url(#sw-deco)" stroke-width="7">&lt;/&gt;</text>
  </g>
  <g opacity="0.5" font-family="monospace" fill="#8da2b9" font-size="16">
    <text x="120" y="520">def automate(process):</text>
    <text x="140" y="556">return workflow.optimize()</text>
    <text x="120" y="592">system.build() → 0 errors</text>
    <text x="120" y="628">✓ deploy pipeline = green</text>
  </g>
  <g opacity="0.6">
    <circle cx="150" cy="480" r="5" fill="#00a8ff"/>
    <circle cx="1050" cy="300" r="5" fill="#31d4ff"/>
  </g>
</svg>
```

- [ ] **Step 5: Create `src/assets/services/aplicativos.svg`** (phone mockups + app tiles theme)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" width="1200" height="800" role="img" aria-hidden="true">
  <defs>
    <radialGradient id="ap-bg" cx="32%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#06203a"/>
      <stop offset="60%" stop-color="#030814"/>
      <stop offset="100%" stop-color="#01040a"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#ap-bg)"/>
  <g transform="translate(760 240)" opacity="0.9">
    <rect x="0" y="0" width="200" height="340" rx="30" fill="none" stroke="#00a8ff" stroke-width="2.5"/>
    <line x1="80" y1="0" x2="120" y2="0" stroke="#00a8ff" stroke-width="3"/>
    <g transform="translate(24 40)">
      <rect x="0" y="0" width="56" height="68" rx="8" fill="rgba(0,168,255,0.12)" stroke="#31d4ff" stroke-width="1.5"/>
      <rect x="0" y="88" width="56" height="68" rx="8" fill="rgba(0,168,255,0.12)" stroke="#31d4ff" stroke-width="1.5"/>
      <rect x="76" y="0" width="56" height="68" rx="8" fill="rgba(0,168,255,0.12)" stroke="#31d4ff" stroke-width="1.5"/>
      <rect x="76" y="88" width="56" height="68" rx="8" fill="rgba(0,168,255,0.12)" stroke="#31d4ff" stroke-width="1.5"/>
    </g>
    <line x1="60" y1="300" x2="140" y2="300" stroke="#00a8ff" stroke-width="6" stroke-linecap="round"/>
  </g>
  <g opacity="0.45" font-family="monospace" fill="#8da2b9" font-size="16">
    <text x="120" y="600">platform: web® | ios | android | pwa</text>
    <text x="120" y="632">responsive: 100% devices</text>
    <text x="120" y="664">core_vitals: 95+</text>
  </g>
</svg>
```

- [ ] **Step 6: Create `src/assets/services/empresas.svg`** (dashboard panels + KPI cards theme)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" width="1200" height="800" role="img" aria-hidden="true">
  <defs>
    <radialGradient id="e-bg" cx="38%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#06203a"/>
      <stop offset="60%" stop-color="#030814"/>
      <stop offset="100%" stop-color="#01040a"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#e-bg)"/>
  <g transform="translate(700 210)" opacity="0.9">
    <rect x="0" y="0" width="360" height="300" rx="16" fill="rgba(0,168,255,0.05)" stroke="#00a8ff" stroke-width="2"/>
    <rect x="20" y="20" width="100" height="18" rx="4" fill="rgba(49,212,255,0.35)"/>
    <rect x="20" y="60" width="150" height="60" rx="8" fill="rgba(0,168,255,0.14)" stroke="#31d4ff" stroke-width="1.5"/>
    <rect x="190" y="60" width="150" height="60" rx="8" fill="rgba(0,168,255,0.14)" stroke="#31d4ff" stroke-width="1.5"/>
    <polyline points="20,220 60,200 100,205 140,180 180,185 220,155 260,160 340,120" fill="none" stroke="#6bffa7" stroke-width="3" stroke-linecap="round"/>
    <line x1="20" y1="250" x2="340" y2="250" stroke="#00a8ff" stroke-width="1.5" opacity="0.6"/>
    <rect x="20" y="220" width="7" height="30" fill="#00a8ff"/>
    <rect x="80" y="200" width="7" height="50" fill="#31d4ff"/>
    <rect x="300" y="160" width="7" height="90" fill="#00a8ff"/>
  </g>
  <g opacity="0.45" font-family="monospace" fill="#8da2b9" font-size="16">
    <text x="120" y="600">kpi.leads: +38%</text>
    <text x="120" y="632">integrations: erp, crm, api</text>
    <text x="120" y="664">uptime: 99.9%</text>
  </g>
</svg>
```

- [ ] **Step 7: Create `src/assets/services/consultoria.svg`** (roadmap/compass + milestones theme)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" width="1200" height="800" role="img" aria-hidden="true">
  <defs>
    <radialGradient id="c-bg" cx="62%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#06203a"/>
      <stop offset="60%" stop-color="#030814"/>
      <stop offset="100%" stop-color="#01040a"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#c-bg)"/>
  <g transform="translate(730 260)" opacity="0.9">
    <circle cx="150" cy="150" r="120" fill="none" stroke="#00a8ff" stroke-width="2.5"/>
    <circle cx="150" cy="150" r="66" fill="none" stroke="#31d4ff" stroke-width="1.5" opacity="0.7"/>
    <line x1="150" y1="150" x2="150" y2="30" stroke="#6bffa7" stroke-width="3" stroke-linecap="round"/>
    <line x1="150" y1="150" x2="240" y2="190" stroke="#31d4ff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="150" cy="150" r="7" fill="#fff"/>
  </g>
  <g opacity="0.6">
    <circle cx="200" cy="520" r="5" fill="#00a8ff"/><line x1="200" y1="530" x2="200" y2="580" stroke="#00a8ff" stroke-width="1.5"/>
    <circle cx="560" cy="520" r="5" fill="#31d4ff"/><line x1="560" y1="530" x2="560" y2="580" stroke="#31d4ff" stroke-width="1.5"/>
    <circle cx="920" cy="520" r="5" fill="#00a8ff"/><line x1="920" y1="530" x2="920" y2="580" stroke="#00a8ff" stroke-width="1.5"/>
    <path d="M200 520h360M560 520h360" stroke="#00a8ff" stroke-width="1.5" stroke-dasharray="4 8"/>
  </g>
  <g opacity="0.45" font-family="monospace" fill="#8da2b9" font-size="16">
    <text x="120" y="640">phase.01 diagnose</text>
    <text x="120" y="672">phase.02 strategy</text>
    <text x="120" y="704">phase.03 deliver</text>
  </g>
</svg>
```

- [ ] **Step 8: Verify**

Run: `ls src/assets/services`
Expected: 7 `.svg` files present.

- [ ] **Step 9: Commit**

```bash
git add src/assets/services/
git commit -m "feat: procedural svg backgrounds for service modules"
```

---

### Task 4: Layout, Header, Footer

**Files:**
- Modify: `src/layouts/Layout.astro` (rewrite)
- Modify: `src/components/Header.astro` (rewrite)
- Modify: `src/components/Footer.astro` (rewrite)

**Interfaces:**
- Consumes: `src/styles/global.css`, `../scripts/main.js`, `src/scripts/analytics.js`.
- Produces: Layout component API `title`, `description` props; `<slot />` in `<main>`; Header with `id="nav"`, links to `#inicio`, `#servicos`, `#empresas`, `#faq`, `#contato`; body elements `#progress`, `#cursor-glow`.

- [ ] **Step 1: Rewrite `src/layouts/Layout.astro`**

```astro
---
import "../styles/global.css";

const { title = "LinuXis Tecnologia", description = "LinuXis Tecnologia — informática, manutenção, software, desenvolvimento de sistemas e aplicativos." } = Astro.props;

const gtmId = import.meta.env.PUBLIC_GTM_ID;
const ga4Id = import.meta.env.PUBLIC_GA4_ID;
const metaPixelId = import.meta.env.PUBLIC_META_PIXEL_ID;

// Snippets built as raw strings to avoid Astro `{}` parsing in inline scripts.
const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
const ga4Script = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${ga4Id}');`;
const pixelScript = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`;
---

<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>

    {gtmId && (
      <>
        <script is:inline set:html={gtmScript}></script>
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      </>
    )}

    {ga4Id && (
      <script is:inline set:html={ga4Script}></script>
    )}

    {metaPixelId && (
      <script is:inline set:html={pixelScript}></script>
    )}
  </head>

  <body>
    <div id="progress"></div>
    <div id="cursor-glow"></div>

    <slot />

    <script>
      import "../scripts/main.js";
    </script>
  </body>
</html>
```

Note: `track` is imported and wired in `main.js` (Task 17), not in Layout — keep this file free of unused imports.

- [ ] **Step 2: Rewrite `src/components/Header.astro`**

```astro
---
import logo from "../assets/logo.png";
---

<nav class="nav" id="nav">
  <a href="#inicio" aria-label="LinuXis — início">
    <img src={logo.src} alt="LinuXis" class="nav-logo" width="150" height="72" />
  </a>
  <button class="menu" id="menuToggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="navLinks">☰</button>
  <div class="nav-links" id="navLinks">
    <a href="#inicio">Início</a>
    <a href="#servicos">Serviços</a>
    <a href="#empresas">Empresas</a>
    <a href="#faq">FAQ</a>
    <a class="nav-cta" href="#contato">Fale conosco</a>
  </div>
</nav>
```

- [ ] **Step 3: Rewrite `src/components/Footer.astro`**

```astro
<footer>
  <strong>LinuXis</strong>
  <span class="footer-line"></span>
  <span>TECNOLOGIA QUE IMPULSIONA O FUTURO © 2026</span>
</footer>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: completes without errors. (index.astro still references old components — build may fail until Task 13; if it fails, that is expected and noted; continue.)

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro src/components/Header.astro src/components/Footer.astro
git commit -m "feat: redesigned layout shell with analytics placeholders, header, footer"
```

---

### Task 5: Hero module

**Files:**
- Modify: `src/components/Hero.astro` (rewrite)

**Interfaces:**
- Consumes: `src/assets/hero-tech.png`.
- Produces: section `id="inicio"`; `.hero`, `.hero-media` with `<video>` (no source, `display:none`) + `<img>` fallback; `.hero-grid`, `.hero-content`, `.hero-scroll`. Exposes `data-hero` flag used by `animateHero()`.

- [ ] **Step 1: Rewrite `src/components/Hero.astro`**

```astro
---
import heroTech from "../assets/hero-tech.png";
---

<section class="hero" id="inicio" data-hero>
  <div class="hero-media">
    <video muted playsinline loop aria-hidden="true" tabindex="-1"></video>
    <img src={heroTech.src} alt="" aria-hidden="true" />
  </div>
  <div class="hero-grid" aria-hidden="true"></div>

  <div class="hero-content">
    <div class="eyebrow"><i></i> Tecnologia • Suporte • Desenvolvimento</div>
    <h1>
      <span>PROJETOS</span>
      <strong>EM ÓRBITA</strong>
      <span>DE LANÇAMENTO</span>
    </h1>
    <p>
      Soluções completas em informática, manutenção, software, aplicativos e
      marketing digital — com tecnologia moderna, segurança e foco no resultado.
    </p>
    <div class="actions">
      <a class="btn btn-primary" href="#contato">Lançar projeto →</a>
      <a class="btn btn-ghost" href="#servicos">Explorar serviços</a>
    </div>
  </div>

  <div class="hero-scroll">scroll</div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: cinematic hero with video-ready media and visual fallback"
```

---

### Task 6: Marquee logos module

**Files:**
- Create: `src/components/MarqueeLogos.astro`

**Interfaces:**
- Produces: `<section class="marquee">` with `.marquee-track` — twin identical spans for seamless loop; used between hero and first service.

- [ ] **Step 1: Create `src/components/MarqueeLogos.astro`**

```astro
---
const techs = [
  "Linux", "React", "Python", "Node.js", "PostgreSQL",
  "Docker", "Arduino", "TypeScript", "GTM", "GA4", "WhatsApp API",
];
---

<section class="marquee" aria-label="Tecnologias utilizadas">
  <div class="marquee-track">
    {[...techs, ...techs].map((t) => (
      <span key={t}>{t}</span>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/MarqueeLogos.astro
git commit -m "feat: infinite marquee logo strip"
```

---

### Task 7: ServiceCard (glass + tilt) and AnimatedChart

**Files:**
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/AnimatedChart.astro`

**Interfaces:**
- Consumes: `data-tilt` attribute on cards (wired by `setupTilt()`), `data-chart` attribute + `data-chart-data` JSON on chart wrappers (wired by `animateCharts()`).
- Produces: `<ServiceCard title icon>` with `<slot/>`; `<AnimatedChart data kind label>`.

- [ ] **Step 1: Create `src/components/ServiceCard.astro`**

```astro
---
const { title = "", icon = "" } = Astro.props;
---

<article class="glass" data-tilt>
  {icon && <div class="icon" aria-hidden="true">{icon}</div>}
  <h3>{title}</h3>
  <div>
    <slot />
  </div>
</article>
```

- [ ] **Step 2: Create `src/components/AnimatedChart.astro`**

```astro
---
const { data = [40, 55, 62, 78, 90, 110], label = "crescimento" } = Astro.props;
const pts = data.map((v, i) => {
  const x = 40 + i * 92;
  const y = 220 - (v / Math.max(...data)) * 170;
  return { x: Math.round(x), y: Math.round(y) };
});
const line = pts
  .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
  .join(" ");
const area = `${line} L${pts[pts.length - 1].x} 250 L${pts[0].x} 250 Z`;
---

<div class="chart-panel" data-chart data-chart-data={JSON.stringify(data)}>
  <h4>{label}</h4>
  <svg class="chart-svg" viewBox="0 0 540 260" role="img" aria-label={`Gráfico: ${label}`}>
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#00a8ff" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#00a8ff" stop-opacity="0" />
      </linearGradient>
    </defs>
    {[50, 120, 190].map((gy) => (
      <line x1="40" y1={gy} x2="520" y2={gy} stroke="rgba(0,168,255,0.12)" stroke-width="1" />
    ))}
    <path class="chart-fill" id="chartFill" d={area} />
    <path class="chart-line" id="chartLine" d={line} pathLength="1" />
    {pts.map((p, i) => (
      <circle class="chart-dot" id={`dot-${i}`} cx={p.x} cy={p.y} r="4" />
    ))}
  </svg>
</div>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ServiceCard.astro src/components/AnimatedChart.astro
git commit -m "feat: glass tilt card and animated svg chart components"
```

---

### Task 8: ServiceModule shell

**Files:**
- Create: `src/components/ServiceModule.astro`

**Interfaces:**
- Consumes: `Astro.props` `{ id, kicker, titleHtml, description, bg }`; optional named `<Fragment slot="aside">`.
- Produces: `.module > .module-bg (img) + .module-body (.module-head + .module-grid)`, heading rendered with `set:html={titleHtml}`.

- [ ] **Step 1: Create `src/components/ServiceModule.astro`**

```astro
---
const { id = "", kicker = "", titleHtml = "", description = "", bg = "" } = Astro.props;
---

<section class="module" id={id}>
  {bg && (
    <div class="module-bg" aria-hidden="true">
      <img src={bg} alt="" loading="lazy" width="1200" height="800" />
    </div>
  )}
  <div class="module-body">
    <div class="module-head reveal">
      <div class="kicker">{kicker}</div>
      <h2 set:html={titleHtml}></h2>
      {description && <p>{description}</p>}
    </div>
    <div class="module-grid">
      <div class="reveal">
        <slot />
      </div>
      <div class="reveal">
        <slot name="aside" />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ServiceModule.astro
git commit -m "feat: generic service module shell with bg and split layout"
```

---

### Task 9: Google Meu Negócio & Leads module

**Files:**
- Create: `src/components/modules/GoogleLeads.astro`

**Interfaces:**
- Consumes: `ServiceModule`, `ServiceCard`, `AnimatedChart`, `google.svg`.
- Produces: section `id="servicos"` (nav landing target), module heading, glass cards, chart aside.

- [ ] **Step 1: Create `src/components/modules/GoogleLeads.astro`**

```astro
---
import ServiceModule from "../ServiceModule.astro";
import ServiceCard from "../ServiceCard.astro";
import AnimatedChart from "../AnimatedChart.astro";
import googleBg from "../../assets/services/google.svg";
---

<ServiceModule
  id="servicos"
  kicker="01 / Google Meu Negócio & Leads"
  titleHtml="Seu negócio <em>visível</em> e gerando clientes."
  description="Criação e otimização de anúncios no Google Meu Negócio, captação de leads qualificados e estratégias para aumentar o desempenho dos seus serviços e presença digital."
  bg={googleBg.src}
>
  <div class="tilt-stack">
    <ServiceCard title="Anúncios no Google" icon="◎">
      <p>Configuração e gestão de campanhas no Google Meu Negócio com foco em conversão local.</p>
    </ServiceCard>
    <ServiceCard title="Captação de Leads" icon="⌁">
      <p>Estratégias de formulário, WhatsApp e rastreio para transformar visitas em contatos.</p>
    </ServiceCard>
  </div>
  <Fragment slot="aside">
    <AnimatedChart label="leads qualificados / mês" data={[24, 38, 41, 63, 78, 95]} />
  </Fragment>
</ServiceModule>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/modules/GoogleLeads.astro
git commit -m "feat: google meu negocio & leads module"
```

---

### Task 10: Informática & Suporte module

**Files:**
- Create: `src/components/modules/Suporte.astro`

**Interfaces:**
- Consumes: `ServiceModule`, `ServiceCard`, `suporte.svg`.
- Produces: section `id="suporte"`, feature-list aside.

- [ ] **Step 1: Create `src/components/modules/Suporte.astro`**

```astro
---
import ServiceModule from "../ServiceModule.astro";
import ServiceCard from "../ServiceCard.astro";
import suporteBg from "../../assets/services/suporte.svg";
---

<ServiceModule
  id="suporte"
  kicker="02 / Informática & Suporte"
  titleHtml="Diagnóstico rápido, <em>operação</em> no ar."
  description="Configuração, diagnóstico, instalação de sistemas, redes, periféricos e suporte técnico para manter sua operação funcionando."
  bg={suporteBg.src}
>
  <div class="tilt-stack">
    <ServiceCard title="Suporte Técnico" icon="⌘">
      <p>Atendimento remoto e presencial para resolver o que travou — rápido.</p>
    </ServiceCard>
    <ServiceCard title="Redes & Periféricos" icon="⇆">
      <p>Estrutura de rede, impressoras, roteadores e conectividade de ponta a ponta.</p>
    </ServiceCard>
  </div>
  <Fragment slot="aside">
    <ul class="feature-list">
      <li>Diagnóstico de hardware e software</li>
      <li>Instalação e configuração de sistemas</li>
      <li>Suporte para equipes e home office</li>
      <li>Manutenção preventiva agendada</li>
    </ul>
  </Fragment>
</ServiceModule>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/modules/Suporte.astro
git commit -m "feat: informatica e suporte module"
```

---

### Task 11: Manutenção & Formatação module

**Files:**
- Create: `src/components/modules/Manutencao.astro`

**Interfaces:**
- Consumes: `ServiceModule`, `AnimatedChart`, `manutencao.svg`.
- Produces: section `id="manutencao"`, stages aside (01/02/03).

- [ ] **Step 1: Create `src/components/modules/Manutencao.astro`**

```astro
---
import ServiceModule from "../ServiceModule.astro";
import AnimatedChart from "../AnimatedChart.astro";
import manutencaoBg from "../../assets/services/manutencao.svg";
---

<ServiceModule
  id="manutencao"
  kicker="03 / Manutenção & Formatação"
  titleHtml="De volta ao <em>desempenho</em> máximo."
  description="Otimização, limpeza lógica, formatação, recuperação de desempenho e preparação de computadores para uso profissional."
  bg={manutencaoBg.src}
>
  <div class="stages">
    <div class="stage"><b>01</b><span>Diagnóstico de performance</span></div>
    <div class="stage"><b>02</b><span>Limpeza lógica & otimização</span></div>
    <div class="stage"><b>03</b><span>Formatação com perfil profissional</span></div>
  </div>
  <Fragment slot="aside">
    <AnimatedChart label="performance após otimização" data={[30, 38, 45, 58, 72, 84]} />
  </Fragment>
</ServiceModule>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/modules/Manutencao.astro
git commit -m "feat: manutencao e formatacao module"
```

---

### Task 12: Software Sob Medida module

**Files:**
- Create: `src/components/modules/Software.astro`

**Interfaces:**
- Consumes: `ServiceModule`, `ServiceCard`, `software.svg`.
- Produces: section `id="software"`, terminal aside.

- [ ] **Step 1: Create `src/components/modules/Software.astro`**

```astro
---
import ServiceModule from "../ServiceModule.astro";
import ServiceCard from "../ServiceCard.astro";
import softwareBg from "../../assets/services/software.svg";
---

<ServiceModule
  id="software"
  kicker="04 / Software Sob Medida"
  titleHtml="Sistemas que automatizam o que <em>cansa</em>."
  description="Sistemas personalizados para automatizar processos, organizar dados, reduzir tarefas manuais e aumentar produtividade."
  bg={softwareBg.src}
>
  <div class="tilt-stack">
    <ServiceCard title="Automação de Processos" icon="▣">
      <p>Fluxos manuais viram pipelines digitais com menos erro e mais velocidade.</p>
    </ServiceCard>
    <ServiceCard title="Organização de Dados" icon="▤">
      <p>Bancos de dados, relatórios e painéis para decidir com informação.</p>
    </ServiceCard>
  </div>
  <Fragment slot="aside">
    <div class="terminal" aria-hidden="true">
      <div class="term-top"><i></i><i></i><i></i></div>
      <pre><span class="green">linuxis@tech</span>:~$ iniciar-projeto

<span class="highlight">[01]</span> Analisando necessidade...
<span class="highlight">[02]</span> Arquitetando solução...
<span class="highlight">[03]</span> Desenvolvendo interface...
<span class="highlight">[04]</span> Integrando tecnologia...
<span class="highlight">[05]</span> Validando performance...

<span class="green">✓ Sistema pronto para impulsionar seu negócio.</span>

<span class="green">linuxis@tech</span>:~$ <span class="highlight">_</span></pre>
    </div>
  </Fragment>
</ServiceModule>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/modules/Software.astro
git commit -m "feat: software sob medida module with terminal"
```

---

### Task 13: Aplicativos module

**Files:**
- Create: `src/components/modules/Aplicativos.astro`

**Interfaces:**
- Consumes: `ServiceModule`, `ServiceCard`, `aplicativos.svg`.
- Produces: section `id="aplicativos"`, platform cards aside.

- [ ] **Step 1: Create `src/components/modules/Aplicativos.astro`**

```astro
---
import ServiceModule from "../ServiceModule.astro";
import ServiceCard from "../ServiceCard.astro";
import aplicativosBg from "../../assets/services/aplicativos.svg";
---

<ServiceModule
  id="aplicativos"
  kicker="05 / Aplicativos"
  titleHtml="Sua ideia em <em>todo lugar.</em>"
  description="Desenvolvimento de aplicações web e mobile com interfaces modernas, responsivas e pensadas para uma excelente experiência."
  bg={aplicativosBg.src}
>
  <div class="tilt-stack">
    <ServiceCard title="Web e PWA" icon="⌬">
      <p>Apps que rodam em qualquer navegador, com instalação e modo offline.</p>
    </ServiceCard>
    <ServiceCard title="iOS & Android" icon="▤">
      <p>Aplicativos nativos e híbridos com app stores e atualizações gerenciadas.</p>
    </ServiceCard>
  </div>
  <Fragment slot="aside">
    <ul class="feature-list">
      <li>Interfaces modernas e responsivas</li>
      <li>Experiência pensada no usuário</li>
      <li>Performance e core vitals otimizados</li>
      <li>Integração com APIs e bancos de dados</li>
    </ul>
  </Fragment>
</ServiceModule>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/modules/Aplicativos.astro
git commit -m "feat: aplicativos module"
```

---

### Task 14: Soluções para Empresas module

**Files:**
- Create: `src/components/modules/Empresas.astro`

**Interfaces:**
- Consumes: `ServiceModule`, `ServiceCard`, `empresas.svg`.
- Produces: section `id="empresas"` (nav landing target), KPI feature-list aside.

- [ ] **Step 1: Create `src/components/modules/Empresas.astro`**

```astro
---
import ServiceModule from "../ServiceModule.astro";
import ServiceCard from "../ServiceCard.astro";
import empresasBg from "../../assets/services/empresas.svg";
---

<ServiceModule
  id="empresas"
  kicker="06 / Soluções para Empresas"
  titleHtml="Digitalização que <em>escala.</em>"
  description="Digitalização de processos, painéis administrativos, integrações, bancos de dados e ferramentas para gestão."
  bg={empresasBg.src}
>
  <div class="tilt-stack">
    <ServiceCard title="Painéis Administrativos" icon="◈">
      <p>Dashboards com métricas do seu negócio em tempo real.</p>
    </ServiceCard>
    <ServiceCard title="Integrações & Gestão" icon="⇆">
      <p>ERP, CRM e APIs conectados para dados fluindo sem duplicação.</p>
    </ServiceCard>
  </div>
  <Fragment slot="aside">
    <ul class="feature-list">
      <li>Digitalização de processos operacionais</li>
      <li>Bancos de dados seguros e organizados</li>
      <li>Automação de relatórios e rotinas</li>
      <li>Suporte a múltiplos usuários e marcas</li>
    </ul>
  </Fragment>
</ServiceModule>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/modules/Empresas.astro
git commit -m "feat: solucoes para empresas module"
```

---

### Task 15: Consultoria em Tecnologia module

**Files:**
- Create: `src/components/modules/Consultoria.astro`

**Interfaces:**
- Consumes: `ServiceModule`, `ServiceCard`, `consultoria.svg`.
- Produces: section `id="consultoria"`, feature-list aside.

- [ ] **Step 1: Create `src/components/modules/Consultoria.astro`**

```astro
---
import ServiceModule from "../ServiceModule.astro";
import ServiceCard from "../ServiceCard.astro";
import consultoriaBg from "../../assets/services/consultoria.svg";
---

<ServiceModule
  id="consultoria"
  kicker="07 / Consultoria em Tecnologia"
  titleHtml="Decisões técnicas com <em>clareza.</em>"
  description="Orientação para escolher tecnologias, estruturar projetos e transformar uma necessidade em uma solução digital viável."
  bg={consultoriaBg.src}
>
  <div class="tilt-stack">
    <ServiceCard title="Diagnóstico" icon="⟐">
      <p>Mapeamento de necessidades e pontos de dor antes de qualquer solução.</p>
    </ServiceCard>
    <ServiceCard title="Estratégia & Roadmap" icon="◎">
      <p>Plano de curto, médio e longo prazo alinhado ao objetivo do negócio.</p>
    </ServiceCard>
  </div>
  <Fragment slot="aside">
    <ul class="feature-list">
      <li>Escolha da stack certa para o projeto</li>
      <li>Viabilidade técnica e de custo</li>
      <li>Estruturação de escopo e entregas</li>
      <li>Acompanhamento após o lançamento</li>
    </ul>
  </Fragment>
</ServiceModule>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/modules/Consultoria.astro
git commit -m "feat: consultoria em tecnologia module"
```

---

### Task 16: Sobre / Missão, FAQ, Contato, index composition

**Files:**
- Modify: `src/components/Sobre.astro` (rewrite)
- Modify: `src/components/Faq.astro` → create `src/components/Faq.astro` (rewrite existing if present; create new)
- Modify: `src/components/Contato.astro` (rewrite)
- Modify: `src/pages/index.astro` (rewrite)

**Interfaces:**
- Consumes: all modules, `Faq` data model `{ q, a }[]` with `.faq-item.open` toggle (wired in Task 17 `setupFaq()`).
- Produces: `#sobre` mission section, `#faq` accordion, `#contato` form (fields: nome, email, servico, mensagem), and final `index.astro` composing: Layout → Hero, MarqueeLogos, GoogleLeads, Suporte, Manutencao, Software, Aplicativos, Empresas, Consultoria, Sobre, Faq, Contato.

- [ ] **Step 1: Rewrite `src/components/Sobre.astro`**

```astro
<section class="mission" id="sobre">
  <div class="kicker">LinuXis</div>
  <h2 class="reveal">
    Seu problema pode virar uma <em>solução digital.</em>
  </h2>
  <p class="reveal">
    Conte o que você precisa. A LinuXis transforma ideias, necessidades e
    processos em tecnologia.
  </p>
  <a class="btn btn-primary reveal" href="#contato">Vamos conversar →</a>
</section>
```

- [ ] **Step 2: Create `src/components/Faq.astro`**

```astro
---
const questions = [
  { q: "Quanto tempo leva para desenvolver um sistema?", a: "Depende da complexidade. Projetos pequenos saem em semanas; sistemas corporativos levam alguns meses. No primeiro contato definimos um cronograma realista." },
  { q: "Vocês atendem suporte remoto?", a: "Sim. A maioria dos chamados de suporte e manutenção é resolvida remotamente, com diagnóstico rápido e, quando necessário, atendimento presencial." },
  { q: "Como funcionam os anúncios no Google Meu Negócio?", a: "Criamos e gerenciamos suas campanhas, otimizando palavras-chave e acompanhando leads. Você acompanha os resultados e o retorno investido." },
  { q: "Preciso de um aplicativo ou de um site?", a: "Depende do seu objetivo. A consultoria avalia seu caso e indica a solução mais econômica e eficaz — sem vender tecnologia desnecessária." },
  { q: "Vocês oferecem manutenção preventiva?", a: "Sim, com planos agendados de limpeza lógica, atualizações e monitoramento para manter equipamentos e sistemas sempre operando." },
];
---

<section class="module" id="faq">
  <div class="module-body">
    <div class="module-head reveal">
      <div class="kicker">FAQ</div>
      <h2>Perguntas <em>frequentes.</em></h2>
    </div>
    <div class="faq">
      {questions.map((item, i) => (
        <div class="faq-item">
          <button
            class="faq-q"
            aria-expanded="false"
            aria-controls={`faq-a-${i}`}
            data-faq-q
          >
            {item.q}
            <span class="fx" aria-hidden="true">+</span>
          </button>
          <div class="faq-a" id={`faq-a-${i}`} role="region">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Rewrite `src/components/Contato.astro`**

```astro
---
import { WHATSAPP_PHONE, EMAIL } from "../constants.js";
import ServiceCard from "./ServiceCard.astro";
---

<section class="module" id="contato">
  <div class="module-body">
    <div class="module-head reveal">
      <div class="kicker">Contato</div>
      <h2>Vamos criar o próximo <em>projeto.</em></h2>
      <p>Preencha o formulário — sua mensagem abre no WhatsApp pronta para enviar.</p>
    </div>

    <div class="contact-grid">
      <form class="form reveal" id="contact-form" novalidate>
        <label>
          Nome
          <input type="text" name="nome" required placeholder="Seu nome" autocomplete="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" required placeholder="voce@email.com" autocomplete="email" />
        </label>
        <label>
          Serviço
          <select name="servico" required>
            <option value="">Selecione...</option>
            <option value="Google Meu Negócio & Leads">Google Meu Negócio & Leads</option>
            <option value="Informática & Suporte">Informática & Suporte</option>
            <option value="Manutenção & Formatação">Manutenção & Formatação</option>
            <option value="Software Sob Medida">Software Sob Medida</option>
            <option value="Aplicativos">Aplicativos</option>
            <option value="Soluções para Empresas">Soluções para Empresas</option>
            <option value="Consultoria em Tecnologia">Consultoria em Tecnologia</option>
          </select>
        </label>
        <label>
          Mensagem
          <textarea name="mensagem" required placeholder="Conte o que você precisa..."></textarea>
        </label>
        <button class="btn btn-primary" type="submit">Enviar pelo WhatsApp →</button>
        <p class="form-note">
          Seu navegador abrirá o WhatsApp com a mensagem pronta. Nada é enviado
          sem a sua confirmação.
        </p>

        <div class="form-fallback" id="form-fallback">
          <p class="form-note">Não conseguimos abrir o WhatsApp. Copie a mensagem abaixo ou envie por email:</p>
          <textarea id="fallback-text" readonly rows="4"></textarea>
          <a class="btn btn-ghost" href={`mailto:${EMAIL}`}>Enviar por email →</a>
        </div>
      </form>

      <div class="contact-info">
        <ServiceCard title="WhatsApp direto" icon="◎">
          <p>
            Prefere conversar agora?
            <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noopener" style="color:#69d8ff">Iniciar conversa →</a>
          </p>
        </ServiceCard>
        <ServiceCard title="Email" icon="✉">
          <p><a href={`mailto:${EMAIL}`} style="color:#69d8ff">{EMAIL}</a></p>
        </ServiceCard>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create `src/constants.js`**

```js
export const WHATSAPP_PHONE = "5561996911526";
export const WHATSAPP_NUMBER = "55 61 99691-1526";
export const EMAIL = "linuxis.oficial@gmail.com";
```

Note: `src/constants.js` must be created before `Contato.astro` (Step 4 creates it; do Step 4 first if running steps out of order). Astro allows the unused `WHATSAPP_NUMBER` export without breaking the build — it is exported for future use.

- [ ] **Step 5: Rewrite `src/pages/index.astro`**

```astro
---
import Layout from "../layouts/Layout.astro";
import Hero from "../components/Hero.astro";
import MarqueeLogos from "../components/MarqueeLogos.astro";
import GoogleLeads from "../components/modules/GoogleLeads.astro";
import Suporte from "../components/modules/Suporte.astro";
import Manutencao from "../components/modules/Manutencao.astro";
import Software from "../components/modules/Software.astro";
import Aplicativos from "../components/modules/Aplicativos.astro";
import Empresas from "../components/modules/Empresas.astro";
import Consultoria from "../components/modules/Consultoria.astro";
import Sobre from "../components/Sobre.astro";
import Faq from "../components/Faq.astro";
import Contato from "../components/Contato.astro";
---

<Layout
  title="LinuXis Tecnologia | Tecnologia que impulsiona o futuro"
  description="LinuXis Tecnologia — informática, manutenção, software, desenvolvimento de sistemas, aplicativos e Google Meu Negócio."
>
  <Hero />
  <MarqueeLogos />
  <GoogleLeads />
  <Suporte />
  <Manutencao />
  <Software />
  <Aplicativos />
  <Empresas />
  <Consultoria />
  <Sobre />
  <Faq />
  <Contato />
</Layout>
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: completes without errors and generates `dist/index.html` with all 12 sections.

- [ ] **Step 7: Commit**

```bash
git add src/components/Sobre.astro src/components/Faq.astro src/components/Contato.astro src/constants.js src/pages/index.astro
git commit -m "feat: mission, faq, whatsapp contact form and home composition"
```

---

### Task 17: Orchestration script (main.js) — animations, tilt, charts, FAQ, form, analytics

**Files:**
- Modify: `src/scripts/main.js` (full implementation)

**Interfaces:**
- Consumes: `analytics.js` (`track`), `gsapSetup.js` (`gsap`, `ScrollTrigger`, `hasReducedMotion`).
- Produces: `window.track` exposed globally (assign in `initDataLayer` path); behaviors: nav scroll state + progress + cursor glow, `animateHero`, `registerScroll` (module reveals), `setupTilt`, `animateCharts`, `setupFaq`, `setupContactForm`.

- [ ] **Step 1: Implement `src/scripts/main.js`**

```js
import { track } from "./analytics.js";
import { gsap, ScrollTrigger, hasReducedMotion } from "./gsapSetup.js";

window.track = track;

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function setupNav() {
  const nav = $("#nav");
  const progress = $("#progress");
  const menu = $("#menuToggle");
  const navLinks = $("#navLinks");

  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("scrolled", y > 30);
    if (progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = `${Math.min(100, (y / Math.max(1, max)) * 100)}%`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  menu?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(!!open));
  });
  $$("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks?.classList.remove("open");
      menu?.setAttribute("aria-expanded", "false");
      track("nav_click", { link: a.getAttribute("href") });
    })
  );
}

function setupCursorGlow() {
  const cursor = $("#cursor-glow");
  if (!cursor) return;
  window.addEventListener("pointermove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }, { passive: true });
}

export function animateHero() {
  if (hasReducedMotion()) return;
  const hero = $("[data-hero]");
  if (!hero) return;
  gsap.from(hero.querySelectorAll(".hero-content > *"), {
    y: 60, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.15,
  });
  gsap.to(".hero-media img, .hero-media", {
    yPercent: 12, ease: "none",
    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
  });
}

export function registerScroll() {
  document.body.classList.add("js-anim");
  ScrollTrigger.batch(".reveal", {
    start: "top 82%",
    onEnter: (els) => {
      els.forEach((el) => {
        el.classList.add("is-in");
        track("view_module", { module: el.closest("section")?.id || "" });
      });
    },
  });
  ScrollTrigger.refresh();
}

export function setupTilt() {
  if (hasReducedMotion() || !window.matchMedia("(hover:hover)").matches) return;
  $$("[data-tilt]").forEach((card) => {
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 10, rotateX: -py * 10, transformPerspective: 1100, duration: 0.4, ease: "power2.out" });
    };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" }));
  });
}

export function animateCharts() {
  $$("[data-chart]").forEach((panel) => {
    const svg = panel.querySelector("svg");
    if (!svg) return;
    const line = svg.querySelector(".chart-line");
    const fill = svg.querySelector(".chart-fill");
    const tween = () => {
      if (line) {
        gsap.fromTo(line, { strokeDashoffset: 1 }, {
          strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut",
        });
      }
      if (fill) {
        gsap.fromTo(fill, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power1.inOut" });
      }
      gsap.from(svg.querySelectorAll(".chart-dot"), {
        scale: 0, transformOrigin: "center", duration: 0.5, stagger: 0.15, delay: 0.8,
      });
    };
    if (hasReducedMotion()) {
      if (line) line.style.strokeDashoffset = "0";
      if (fill) fill.style.opacity = "1";
      return;
    }
    ScrollTrigger.create({ trigger: panel, start: "top 82%", once: true, onEnter: tween });
  });
}

export function setupFaq() {
  $$("[data-faq-q]").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      const answer = q.nextElementSibling;
      const isOpen = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(isOpen));
      if (answer) answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : "0px";
      track("faq_toggle", { question: q.textContent.trim(), open: isOpen });
    });
  });
}

export function setupContactForm() {
  const form = $("#contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const msg = [
      `Olá, LinuXis! 👋`,
      ``,
      `*Nome:* ${data.nome}`,
      `*Email:* ${data.email}`,
      `*Serviço:* ${data.servico}`,
      ``,
      `${data.mensagem}`,
    ].join("\n");
    const waUrl = `https://wa.me/5561996911526?text=${encodeURIComponent(msg)}`;
    const opened = window.open(waUrl, "_blank");
    track("generate_lead", { servico: data.servico, hasName: !!data.nome, opened: !!opened });

    const fallback = $("#form-fallback");
    const fbText = $("#fallback-text");
    if (!opened) {
      fallback?.classList.add("show");
      if (fbText) fbText.value = `${msg}\n\n— Enviado de linuxis.tec.br`;
    }
  });
}

function init() {
  setupNav();
  setupCursorGlow();
  animateHero();
  registerScroll();
  setupTilt();
  animateCharts();
  setupFaq();
  setupContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
```

Important: the `.chart-line` uses `pathLength="1"` (set in AnimatedChart), so `strokeDasharray` is set by CSS as `1` and animated from offset 1→0. Add to `global.css` (Task 2) — if not present, patch it in this task:

```css
.chart-line { stroke-dasharray: 1; }
```

- [ ] **Step 2: Patch `src/styles/global.css` (add dasharray rule if missing)**

Edit after the `.chart-line` rule:

```css
.chart-line { stroke: var(--blue); stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-dasharray: 1; }
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: completes without errors; `dist/index.html` contains the orchestration script (bundled inline or as `/@vite` module).

- [ ] **Step 4: Manual smoke test with dev server**

Run: `npm run dev` then open http://localhost:4321/
Check:
- Hero title animates in.
- Scroll reveals modules with `is-in`.
- Cards tilt on hover (desktop).
- Charts draw stroke on scroll into view.
- FAQ opens/closes with aria-expanded.
- Form submit opens a WhatsApp tab with prefilled message; fallback appears when popup blocked.

- [ ] **Step 5: Commit**

```bash
git add src/scripts/main.js src/styles/global.css
git commit -m "feat: gsap orchestration for reveals, tilt, charts, faq and whatsapp form"
```

---

### Task 18: Final verification & reduced-motion audit

**Files:**
- Verify only (no new code unless a gap is found).

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: `1 page(s) built`, no errors, `dist/index.html` written.

- [ ] **Step 2: Section presence in output**

Run: `grep -oE 'id="(inicio|servicos|suporte|manutencao|software|aplicativos|empresas|consultoria|sobre|faq|contato)"' dist/index.html`
Expected: all 11 ids present.

- [ ] **Step 3: Reduced-motion audit**

Manually enable OS-level "reduce motion"; reload dev server.
Expected: no GSAP intro animations, marquee static, charts drawn statically (via `hasReducedMotion` branch), tilt disabled — content fully visible.

- [ ] **Step 4: Mobile audit**

Resize to 375px width. Check: nav menu toggles, module grids stack, `.stages`/`.tilt-stack` single column, no horizontal scrollbar.

- [ ] **Step 5: Final commit of any fixes**

```bash
git add -A
git commit -m "fix: reduced-motion and responsive audit fixes"
```

(Only commit if Step 3/4 produced fixes; otherwise skip this commit.)

---

## Self-Review notes

- Spec requires "estrutura pronta para GTM, GA4, Meta Pixel": Task 4 Layout injects each conditionally on `PUBLIC_*` env vars; Task 17 fires `track()` events (`generate_lead`, `view_module`, `nav_click`, `faq_toggle`).
- Spec "prefers-reduced-motion": handled in Task 2 CSS + Task 17 `hasReducedMotion()` branches.
- Spec "7 modules, cada um com fundo temático": Tasks 9–15 create seven `ServiceModule` sections with the SVGs from Task 3.
- Spec "formulário → WhatsApp sem sair da experiência": Task 17 `setupContactForm` opens wa.me, tracks, and shows copy fallback.
- Spec "cards glassmorphism com tilt 3D": Task 2 `.glass`/`.tilt-stack` CSS + Task 7 card + Task 17 tilt.
- Spec "gráficos SVG animados": Tasks 7/11/9 charts + Task 17 `animateCharts`.
- Spec "logos em movimento infinito": Task 6 marquee (CSS), disabled under reduced-motion (Task 2).
- Spec "FAQ com animações": Task 16 Faq + Task 17 setupFaq.
- Spec "responsive desktop/mobile": Task 2 media queries; Task 18 mobile audit.
- Spec "cursor com iluminação dinâmica": Task 17 `setupCursorGlow` + Task 2 `#cursor-glow`.