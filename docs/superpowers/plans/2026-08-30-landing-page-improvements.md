# Landing Page LinuXis — Melhorias Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing LinuXis landing page with cinematic hero, glassmorphism cards, GSAP animations, animated SVG charts, Google Ads dashboard, before/after slider, logo marquee, FAQ, WhatsApp form, and tracking infrastructure.

**Architecture:** All changes go into the existing 3-file structure: `index.html`, `css/style.css`, `js/script.js`. GSAP loaded via CDN. New HTML sections inserted into `<main>`. New CSS appended to existing stylesheet. New JS appended to existing script. No new files created except this plan.

**Tech Stack:** HTML5, CSS3 (custom properties, backdrop-filter, clip-path), Vanilla JS, GSAP 3 + ScrollTrigger (CDN), SVG

**Spec:** Design approved in chat conversation (2026-08-30)

## Global Constraints

- Existing file structure: `index.html`, `css/style.css`, `js/script.js` — no new source files
- GSAP loaded from cdnjs CDN
- WhatsApp number: 5561996911526
- All animations respect `prefers-reduced-motion: reduce`
- Responsive breakpoints: 900px (tablet), 620px (mobile)
- CSS variables: `--bg:#01040a`, `--blue:#00a8ff`, `--cyan:#31d4ff`, `--white:#f4f8ff`, `--muted:#8da2b9`
- No external image dependencies — all visuals are CSS/SVG
- Portuguese (pt-BR) content throughout

---

### Task 1: GSAP CDN + Hero Cinematic Animation

**Files:**
- Modify: `index.html` — add GSAP CDN scripts before closing `</body>`, add hero animation wrapper
- Modify: `css/style.css:72-166` — enhance hero section styles
- Modify: `js/script.js` — add GSAP hero entrance animation

**Interfaces:**
- Consumes: existing hero HTML structure (`.hero`, `.hero-content`, `.eyebrow`, `.hero h1`, `.hero p`, `.actions`, `.logo-stage`)
- Produces: GSAP timeline for hero entrance, animated gradient background

- [ ] **Step 1: Add GSAP CDN to index.html**

In `index.html`, before the closing `</body>` tag (before `<script src="js/script.js"></script>`), add:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

- [ ] **Step 2: Add cinematic gradient animation to hero CSS**

Append to `css/style.css` after the `.hero-light` styles (after line 166):

```css
.hero-bg::after{
  content:"";position:absolute;inset:0;
  background:
    radial-gradient(ellipse 600px 400px at var(--gx,70%) var(--gy,45%),rgba(0,168,255,.18),transparent),
    radial-gradient(ellipse 400px 300px at var(--gx2,20%) var(--gy2,60%),rgba(49,212,255,.1),transparent);
  animation:heroGlow 8s ease-in-out infinite alternate;
}
@keyframes heroGlow{
  0%{--gx:70%;--gy:45%;--gx2:20%;--gy2:60%}
  50%{--gx:40%;--gy:30%;--gx2:75%;--gy2:70%}
  100%{--gx:60%;--gy:55%;--gx2:30%;--gy2:40%}
}
@property --gx{syntax:"<percentage>";initial-value:70%;inherits:false}
@property --gy{syntax:"<percentage>";initial-value:45%;inherits:false}
@property --gx2{syntax:"<percentage>";initial-value:20%;inherits:false}
@property --gy2{syntax:"<percentage>";initial-value:60%;inherits:false}
```

- [ ] **Step 3: Add GSAP hero entrance animation to JS**

Append to `js/script.js` at the end of the file:

```javascript
/* ===== GSAP Hero Entrance ===== */
if(typeof gsap !== "undefined"){
  gsap.registerPlugin(ScrollTrigger);

  const heroTl = gsap.timeline({defaults:{ease:"power3.out"}});
  heroTl
    .from(".eyebrow",{opacity:0,y:30,duration:.8},.2)
    .from(".hero h1",{opacity:0,y:50,duration:1},.4)
    .from(".tagline",{opacity:0,y:25,duration:.7},.7)
    .from(".hero p",{opacity:0,y:25,duration:.7},.9)
    .from(".actions",{opacity:0,y:25,duration:.7},1.1)
    .from(".logo-stage",{opacity:0,scale:.9,duration:1.2},.5);
}
```

- [ ] **Step 4: Test in browser**

Open `index.html` in browser. Hero content should animate in sequentially on page load. Gradient should shift smoothly. Check mobile view at 375px width.

---

### Task 2: Cursor com Iluminação Dinâmica

**Files:**
- Modify: `css/style.css:347-351` — replace cursor styles with glow version
- Modify: `js/script.js:171-177` — enhance cursor logic with glow trail and interactive scaling

**Interfaces:**
- Consumes: existing `#cursor` element
- Produces: cursor with radial glow, scale on interactive elements, hidden on touch

- [ ] **Step 1: Replace cursor CSS**

Replace the existing `#cursor` block (lines 347-351) in `css/style.css`:

```css
#cursor{
  position:fixed;z-index:9998;width:18px;height:18px;
  border:1.5px solid var(--cyan);border-radius:50%;
  pointer-events:none;transform:translate(-50%,-50%);
  box-shadow:0 0 20px rgba(49,212,255,.5),0 0 60px rgba(0,168,255,.2);
  opacity:.7;transition:width .2s,height .2s,box-shadow .2s,border-color .2s;
  mix-blend-mode:screen;
}
#cursor.hovering{
  width:44px;height:44px;border-color:var(--blue);
  box-shadow:0 0 30px rgba(0,168,255,.6),0 0 80px rgba(0,168,255,.25);
}
#cursor-glow{
  position:fixed;z-index:9997;width:200px;height:200px;
  border-radius:50%;pointer-events:none;transform:translate(-50%,-50%);
  background:radial-gradient(circle,rgba(0,168,255,.08) 0%,transparent 70%);
  opacity:.5;transition:opacity .3s;
}
@media(pointer:coarse){
  #cursor,#cursor-glow{display:none!important}
}
```

- [ ] **Step 2: Add cursor-glow element to HTML**

In `index.html`, after `<div id="cursor"></div>` (line 13), add:

```html
<div id="cursor-glow"></div>
```

- [ ] **Step 3: Enhance cursor JS**

Replace the existing cursor JS block (lines 171-177) in `js/script.js`:

```javascript
/* ===== Cursor com iluminação dinâmica ===== */
const cursor = $("#cursor");
const cursorGlow = $("#cursor-glow");
let cursorX = 0, cursorY = 0, glowX = 0, glowY = 0;

window.addEventListener("pointermove", e => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
});

function animateGlow(){
  glowX += (cursorX - glowX) * .08;
  glowY += (cursorY - glowY) * .08;
  cursorGlow.style.left = glowX + "px";
  cursorGlow.style.top = glowY + "px";
  requestAnimationFrame(animateGlow);
}
animateGlow();

window.addEventListener("pointerdown", () => cursor.style.transform = "translate(-50%,-50%) scale(.65)");
window.addEventListener("pointerup", () => cursor.style.transform = "translate(-50%,-50%) scale(1)");

const interactives = "a,button,.card,.btn,[role='button']";
document.addEventListener("pointerover", e => {
  if(e.target.closest(interactives)) cursor.classList.add("hovering");
});
document.addEventListener("pointerout", e => {
  if(e.target.closest(interactives)) cursor.classList.remove("hovering");
});
```

- [ ] **Step 4: Test in browser**

Move cursor — should see glow trail following with slight lag. Hover over buttons/cards — cursor should expand. On mobile/touch device — cursor should be hidden.

---

### Task 3: Cards Glassmorphism + Tilt 3D

**Files:**
- Modify: `css/style.css:206-239` — upgrade `.card` styles to glassmorphism
- Modify: `js/script.js` — add tilt effect on `.card` elements

**Interfaces:**
- Consumes: existing `.card` elements in `.services` grid
- Produces: glassmorphism visual, 3D tilt on mousemove

- [ ] **Step 1: Replace card CSS with glassmorphism**

Replace the `.card` and `.card:hover` blocks (lines 206-221) in `css/style.css`:

```css
.card{
  min-height:270px;padding:28px;
  border:1px solid rgba(49,212,255,.12);
  border-radius:var(--radius);
  background:linear-gradient(145deg,rgba(9,24,42,.45),rgba(2,8,16,.4));
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  position:relative;overflow:hidden;transition:transform .35s,box-shadow .35s,border-color .35s;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 8px 32px rgba(0,0,0,.3);
  transform-style:preserve-3d;perspective:800px;
}
.card:before{
  content:"";position:absolute;width:130px;height:130px;right:-50px;top:-50px;
  border:1px solid rgba(49,212,255,.15);border-radius:50%;
  box-shadow:0 0 35px rgba(0,168,255,.05);
  transition:opacity .3s;opacity:.6;
}
.card:hover{
  border-color:rgba(49,212,255,.4);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 18px 55px rgba(0,0,0,.45),0 0 40px rgba(0,168,255,.08);
}
.card:hover:before{opacity:1}
```

- [ ] **Step 2: Add tilt JS**

Append to `js/script.js` before the closing of the file:

```javascript
/* ===== Cards 3D Tilt ===== */
if(!matchMedia("(pointer:coarse)").matches){
  $$(".card[data-service]").forEach(card => {
    card.addEventListener("pointermove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}
```

- [ ] **Step 3: Test in browser**

Cards should have frosted glass appearance. Hover/move mouse over cards — should see 3D tilt following cursor. On touch devices — no tilt, just glassmorphism.

---

### Task 4: Gráficos SVG Animados

**Files:**
- Modify: `index.html` — add new section before `#sobre` section
- Modify: `css/style.css` — add stats/chart section styles
- Modify: `js/script.js` — add SVG animation and counter logic

**Interfaces:**
- Consumes: GSAP + ScrollTrigger (from Task 1)
- Produces: animated SVG rings, counters, bar charts triggered on scroll

- [ ] **Step 1: Add HTML section**

In `index.html`, insert before the `<section class="cta" id="sobre">` line (before line 171):

```html
<section class="section" id="resultados">
  <div class="section-head reveal">
    <div class="kicker">03 / Resultados</div>
    <h2>Números que <em>comprovam</em> qualidade.</h2>
    <p>Cada projeto entregue com excelência. Resultados reais que transformam negócios.</p>
  </div>
  <div class="charts-grid">
    <div class="chart-card reveal">
      <svg class="ring-chart" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(0,168,255,.12)" stroke-width="8"/>
        <circle class="ring-fill" cx="60" cy="60" r="52" fill="none" stroke="url(#grad1)" stroke-width="8"
          stroke-dasharray="326.7" stroke-dashoffset="326.7" stroke-linecap="round"
          transform="rotate(-90 60 60)" data-target="98"/>
        <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00a8ff"/><stop offset="100%" stop-color="#31d4ff"/>
        </linearGradient></defs>
      </svg>
      <div class="chart-label"><span class="chart-num" data-count="98">0</span>%<br><small>Uptime</small></div>
    </div>
    <div class="chart-card reveal">
      <svg class="ring-chart" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(0,168,255,.12)" stroke-width="8"/>
        <circle class="ring-fill" cx="60" cy="60" r="52" fill="none" stroke="url(#grad2)" stroke-width="8"
          stroke-dasharray="326.7" stroke-dashoffset="326.7" stroke-linecap="round"
          transform="rotate(-90 60 60)" data-target="100"/>
        <defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#31d4ff"/><stop offset="100%" stop-color="#69d8ff"/>
        </linearGradient></defs>
      </svg>
      <div class="chart-label"><span class="chart-num" data-count="500">0</span>+<br><small>Projetos</small></div>
    </div>
    <div class="chart-card reveal">
      <div class="bar-chart">
        <div class="bar-row"><span class="bar-label">Satisfação</span><div class="bar-track"><div class="bar-fill" data-width="96"></div></div><span class="bar-val">96%</span></div>
        <div class="bar-row"><span class="bar-label">Entrega no prazo</span><div class="bar-track"><div class="bar-fill" data-width="94"></div></div><span class="bar-val">94%</span></div>
        <div class="bar-row"><span class="bar-label">Suporte ativo</span><div class="bar-track"><div class="bar-fill" data-width="99"></div></div><span class="bar-val">99%</span></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add chart CSS**

Append to `css/style.css`:

```css
.charts-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:22px;
}
.chart-card{
  padding:32px;border:1px solid rgba(49,212,255,.12);border-radius:var(--radius);
  background:linear-gradient(145deg,rgba(9,24,42,.4),rgba(2,8,16,.35));
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  display:flex;flex-direction:column;align-items:center;gap:18px;
  text-align:center;
}
.ring-chart{width:120px;height:120px}
.ring-fill{transition:stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)}
.chart-label{color:var(--white);font-size:1.5rem;font-weight:800;line-height:1.3}
.chart-label small{font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:.12em;font-weight:400}
.chart-num{color:var(--cyan)}
.bar-chart{width:100%;display:grid;gap:16px}
.bar-row{display:grid;grid-template-columns:110px 1fr 40px;align-items:center;gap:12px}
.bar-label{font-size:.78rem;color:var(--muted);text-align:right}
.bar-track{height:8px;border-radius:99px;background:rgba(0,168,255,.1);overflow:hidden}
.bar-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--blue),var(--cyan));width:0%;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
.bar-val{font-size:.78rem;color:var(--cyan);font-weight:700}
@media(max-width:900px){.charts-grid{grid-template-columns:1fr 1fr}}
@media(max-width:620px){.charts-grid{grid-template-columns:1fr}}
```

- [ ] **Step 3: Add SVG animation and counter JS**

Append to `js/script.js`:

```javascript
/* ===== SVG Charts Animation ===== */
if(typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined"){
  $$(".ring-fill").forEach(circle => {
    const target = parseFloat(circle.dataset.target);
    const circumference = 326.7;
    const offset = circumference - (circumference * target / 100);
    ScrollTrigger.create({
      trigger: circle.closest(".chart-card"),
      start:"top 80%",
      onEnter: () => circle.style.strokeDashoffset = offset,
      once:true
    });
  });

  $$(".chart-num").forEach(el => {
    const target = parseInt(el.dataset.count);
    ScrollTrigger.create({
      trigger: el.closest(".chart-card"),
      start:"top 80%",
      onEnter: () => {
        gsap.to({val:0},{
          val:target,duration:1.5,ease:"power2.out",
          onUpdate:function(){el.textContent = Math.round(this.targets()[0].val)}
        });
      },
      once:true
    });
  });

  $$(".bar-fill").forEach(bar => {
    const w = bar.dataset.width;
    ScrollTrigger.create({
      trigger: bar.closest(".chart-card"),
      start:"top 80%",
      onEnter: () => bar.style.width = w + "%",
      once:true
    });
  });
}
```

- [ ] **Step 4: Update section numbering**

In `index.html`, update the section numbers to account for the new section:
- `<div class="kicker">03 / LinuXis</div>` → `<div class="kicker">04 / LinuXis</div>` (in `#sobre` section)
- `<div class="kicker">04 / Contato</div>` → `<div class="kicker">05 / Contato</div>` (in `#contato` section)

- [ ] **Step 5: Test in browser**

Scroll to new section. Ring charts should animate from 0 to target. Numbers should count up. Bars should fill. All triggered on scroll.

---

### Task 5: Dashboard Google Ads Simulado

**Files:**
- Modify: `index.html` — add dashboard section
- Modify: `css/style.css` — add dashboard styles
- Modify: `js/script.js` — add simulated real-time data updates

**Interfaces:**
- Consumes: GSAP (for entrance animation)
- Produces: simulated dashboard with updating metrics

- [ ] **Step 1: Add dashboard HTML**

In `index.html`, insert after the `#resultados` section (after the closing `</section>` from Task 4):

```html
<section class="section" id="dashboard">
  <div class="section-head reveal">
    <div class="kicker">Marketing Digital</div>
    <h2>Monitoramento em <em>tempo real.</em></h2>
    <p>Acompanhe o desempenho das suas campanhas com dados atualizados e métricas que importam.</p>
  </div>
  <div class="dash-panel reveal">
    <div class="dash-top">
      <div class="dash-live"><span class="live-dot"></span> AO VIVO</div>
      <div class="dash-time" id="dashTime">--:--:--</div>
    </div>
    <div class="dash-metrics">
      <div class="dash-metric">
        <div class="dash-metric-label">Impressões</div>
        <div class="dash-metric-val" id="metricImpressions">0</div>
        <div class="dash-metric-change up">+12.4%</div>
      </div>
      <div class="dash-metric">
        <div class="dash-metric-label">Cliques</div>
        <div class="dash-metric-val" id="metricClicks">0</div>
        <div class="dash-metric-change up">+8.7%</div>
      </div>
      <div class="dash-metric">
        <div class="dash-metric-label">CTR</div>
        <div class="dash-metric-val" id="metricCTR">0%</div>
        <div class="dash-metric-change up">+2.1%</div>
      </div>
      <div class="dash-metric">
        <div class="dash-metric-label">CPC</div>
        <div class="dash-metric-val" id="metricCPC">R$0</div>
        <div class="dash-metric-change down">-5.3%</div>
      </div>
    </div>
    <div class="dash-sparklines">
      <svg class="sparkline" id="sparkImpressions" viewBox="0 0 200 50" preserveAspectRatio="none"></svg>
      <svg class="sparkline" id="sparkClicks" viewBox="0 0 200 50" preserveAspectRatio="none"></svg>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add dashboard CSS**

Append to `css/style.css`:

```css
.dash-panel{
  border:1px solid rgba(49,212,255,.15);border-radius:var(--radius);
  background:linear-gradient(145deg,rgba(9,24,42,.5),rgba(2,8,16,.45));
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  padding:30px;overflow:hidden;
}
.dash-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.dash-live{
  display:flex;align-items:center;gap:8px;font-size:.72rem;
  letter-spacing:.15em;text-transform:uppercase;color:#6bffa7;font-weight:700;
}
.live-dot{
  width:8px;height:8px;border-radius:50%;background:#6bffa7;
  box-shadow:0 0 10px #6bffa7;animation:pulse 1.5s ease-in-out infinite;
}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.dash-time{color:var(--muted);font-size:.82rem;font-family:ui-monospace,SFMono-Regular,monospace}
.dash-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.dash-metric{
  padding:20px;border:1px solid rgba(0,168,255,.1);border-radius:14px;
  background:rgba(0,168,255,.025);text-align:center;
}
.dash-metric-label{font-size:.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px}
.dash-metric-val{font-size:1.6rem;font-weight:800;color:var(--white);font-family:ui-monospace,monospace}
.dash-metric-change{font-size:.72rem;margin-top:6px;font-weight:700}
.dash-metric-change.up{color:#6bffa7}
.dash-metric-change.down{color:#ff6b6b}
.dash-sparklines{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.sparkline{
  width:100%;height:50px;border:1px solid rgba(0,168,255,.08);border-radius:10px;
  background:rgba(0,168,255,.02);
}
.sparkline polyline{fill:none;stroke:var(--cyan);stroke-width:1.5}
@media(max-width:900px){.dash-metrics{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.dash-metrics{grid-template-columns:1fr 1fr}.dash-sparklines{grid-template-columns:1fr}}
```

- [ ] **Step 3: Add dashboard simulation JS**

Append to `js/script.js`:

```javascript
/* ===== Dashboard Simulado ===== */
function updateClock(){
  const now = new Date();
  const h = String(now.getHours()).padStart(2,"0");
  const m = String(now.getMinutes()).padStart(2,"0");
  const s = String(now.getSeconds()).padStart(2,"0");
  const el = document.getElementById("dashTime");
  if(el) el.textContent = h + ":" + m + ":" + s;
}
setInterval(updateClock,1000);
updateClock();

const dashData = {
  impressions: [], clicks: [],
  baseImpressions: 12400, baseClicks: 890
};

function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}

function updateDash(){
  const imp = dashData.baseImpressions + rand(-300,500);
  const cli = dashData.baseClicks + rand(-30,60);
  const ctr = ((cli/imp)*100).toFixed(2);
  const cpc = (rand(12,28)/10).toFixed(2);

  const impEl = document.getElementById("metricImpressions");
  const cliEl = document.getElementById("metricClicks");
  const ctrEl = document.getElementById("metricCTR");
  const cpcEl = document.getElementById("metricCPC");

  if(impEl) impEl.textContent = imp.toLocaleString("pt-BR");
  if(cliEl) cliEl.textContent = cli.toLocaleString("pt-BR");
  if(ctrEl) ctrEl.textContent = ctr + "%";
  if(cpcEl) cpcEl.textContent = "R$" + cpc;

  dashData.impressions.push(imp);
  dashData.clicks.push(cli);
  if(dashData.impressions.length > 30) dashData.impressions.shift();
  if(dashData.clicks.length > 30) dashData.clicks.shift();

  drawSparkline("sparkImpressions", dashData.impressions, "#00a8ff");
  drawSparkline("sparkClicks", dashData.clicks, "#31d4ff");

  dashData.baseImpressions += rand(-50,80);
  dashData.baseClicks += rand(-8,12);
}

function drawSparkline(id, data, color){
  const svg = document.getElementById(id);
  if(!svg || data.length < 2) return;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 200, h = 50;
  const points = data.map((v,i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 10) - 5;
    return x + "," + y;
  }).join(" ");
  svg.innerHTML = '<polyline points="' + points + '"/>';
}

setInterval(updateDash, 2500);
updateDash();
```

- [ ] **Step 4: Test in browser**

Dashboard should show live-updating metrics every 2.5 seconds. Clock should tick. Sparklines should animate. "AO VIVO" badge should pulse green.

---

### Task 6: Comparador Antes/Depois

**Files:**
- Modify: `index.html` — add comparison section
- Modify: `css/style.css` — add slider styles
- Modify: `js/script.js` — add drag slider logic

**Interfaces:**
- Consumes: none (standalone)
- Produces: draggable before/after comparison slider

- [ ] **Step 1: Add comparison HTML**

In `index.html`, insert before the `#resultados` section (before the section from Task 4):

```html
<section class="section" id="comparador">
  <div class="section-head reveal">
    <div class="kicker">Transformação</div>
    <h2>Veja a <em>diferença.</em></h2>
    <p>Arraste o slider para comparar os resultados antes e depois da LinuXis.</p>
  </div>
  <div class="compare-container reveal">
    <div class="compare-side before">
      <div class="compare-content">
        <div class="compare-badge">ANTES</div>
        <div class="compare-stat"><span class="compare-num">0</span> avaliações no Google</div>
        <div class="compare-stat">Sem presença digital</div>
        <div class="compare-stat">Zero visibilidade online</div>
        <div class="compare-stat">Processos 100% manuais</div>
      </div>
    </div>
    <div class="compare-side after">
      <div class="compare-content">
        <div class="compare-badge">DEPOIS</div>
        <div class="compare-stat"><span class="compare-num">127</span> avaliações no Google</div>
        <div class="compare-stat">Site profissional ativo</div>
        <div class="compare-stat">Top 3 nas buscas locais</div>
        <div class="compare-stat">Automação de processos</div>
      </div>
    </div>
    <div class="compare-slider" id="compareSlider">
      <div class="compare-line"></div>
      <div class="compare-handle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 5l-5 7 5 7M16 5l5 7-5 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add comparison CSS**

Append to `css/style.css`:

```css
.compare-container{
  position:relative;width:100%;max-width:800px;margin:0 auto;
  height:380px;border-radius:var(--radius);overflow:hidden;
  border:1px solid rgba(49,212,255,.15);
}
.compare-side{
  position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  padding:40px;
}
.compare-side.before{
  background:linear-gradient(135deg,#0a0e18,#111827);
  clip-path:inset(0 50% 0 0);
}
.compare-side.after{
  background:linear-gradient(135deg,rgba(0,168,255,.12),rgba(49,212,255,.08));
}
.compare-content{max-width:320px;text-align:center}
.compare-badge{
  display:inline-block;padding:6px 16px;border-radius:99px;font-size:.7rem;
  letter-spacing:.2em;font-weight:800;margin-bottom:20px;
}
.compare-side.before .compare-badge{background:rgba(255,107,107,.15);color:#ff6b6b;border:1px solid rgba(255,107,107,.3)}
.compare-side.after .compare-badge{background:rgba(107,255,167,.15);color:#6bffa7;border:1px solid rgba(107,255,167,.3)}
.compare-stat{
  color:var(--muted);font-size:.95rem;padding:8px 0;
  border-bottom:1px solid rgba(255,255,255,.04);
}
.compare-stat:last-child{border:none}
.compare-num{color:var(--white);font-weight:800}
.compare-slider{
  position:absolute;top:0;bottom:0;left:50%;width:4px;
  cursor:ew-resize;z-index:10;transform:translateX(-50%);
}
.compare-line{
  position:absolute;inset:0;background:var(--cyan);
  box-shadow:0 0 15px rgba(49,212,255,.5);
}
.compare-handle{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:44px;height:44px;border-radius:50%;
  background:rgba(0,168,255,.2);border:2px solid var(--cyan);
  display:grid;place-items:center;color:var(--cyan);
  box-shadow:0 0 20px rgba(49,212,255,.4);
  transition:transform .15s;
}
.compare-handle:hover{transform:translate(-50%,-50%) scale(1.15)}
@media(max-width:620px){
  .compare-container{height:440px}
  .compare-side{padding:24px}
  .compare-stat{font-size:.85rem}
}
```

- [ ] **Step 3: Add slider drag JS**

Append to `js/script.js`:

```javascript
/* ===== Comparador Antes/Depois ===== */
(function(){
  const slider = document.getElementById("compareSlider");
  const container = slider?.closest(".compare-container");
  if(!slider || !container) return;

  const beforeSide = container.querySelector(".compare-side.before");
  let isDragging = false;

  function updatePosition(x){
    const rect = container.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(5, Math.min(95, pct));
    slider.style.left = pct + "%";
    beforeSide.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
  }

  slider.addEventListener("pointerdown", e => {
    isDragging = true;
    slider.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  window.addEventListener("pointermove", e => {
    if(!isDragging) return;
    updatePosition(e.clientX);
  });

  slider.addEventListener("pointerup", () => isDragging = false);

  let touchX = 0;
  slider.addEventListener("touchstart", e => {
    isDragging = true;
    touchX = e.touches[0].clientX;
  }, {passive:true});

  slider.addEventListener("touchmove", e => {
    if(!isDragging) return;
    updatePosition(e.touches[0].clientX);
  }, {passive:true});

  slider.addEventListener("touchend", () => isDragging = false);
})();
```

- [ ] **Step 4: Test in browser**

Slider should be draggable left/right. Before side clips to reveal after side. Works on touch too.

---

### Task 7: Logos em Movimento Infinito

**Files:**
- Modify: `index.html` — add marquee section
- Modify: `css/style.css` — add marquee animation styles

**Interfaces:**
- Consumes: none (standalone CSS animation)
- Produces: infinite scrolling logo strip

- [ ] **Step 1: Add marquee HTML**

In `index.html`, insert before the `#comparador` section:

```html
<div class="marquee-section">
  <div class="marquee">
    <div class="marquee-track">
      <div class="marquee-item">⬡ HTML5</div>
      <div class="marquee-item">◆ CSS3</div>
      <div class="marquee-item">★ JavaScript</div>
      <div class="marquee-item">⬢ React</div>
      <div class="marquee-item">◎ Node.js</div>
      <div class="marquee-item">◇ Python</div>
      <div class="marquee-item">△ Google Ads</div>
      <div class="marquee-item">☐ Figma</div>
      <div class="marquee-item">▽ WordPress</div>
      <div class="marquee-item">● MySQL</div>
      <div class="marquee-item">⬡ HTML5</div>
      <div class="marquee-item">◆ CSS3</div>
      <div class="marquee-item">★ JavaScript</div>
      <div class="marquee-item">⬢ React</div>
      <div class="marquee-item">◎ Node.js</div>
      <div class="marquee-item">◇ Python</div>
      <div class="marquee-item">△ Google Ads</div>
      <div class="marquee-item">☐ Figma</div>
      <div class="marquee-item">▽ WordPress</div>
      <div class="marquee-item">● MySQL</div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add marquee CSS**

Append to `css/style.css`:

```css
.marquee-section{
  padding:30px 0;overflow:hidden;
  border-top:1px solid rgba(0,168,255,.08);
  border-bottom:1px solid rgba(0,168,255,.08);
  background:rgba(0,168,255,.015);
}
.marquee{overflow:hidden;position:relative}
.marquee-track{
  display:flex;gap:50px;width:max-content;
  animation:marqueeScroll 30s linear infinite;
}
.marquee-track:hover{animation-play-state:paused}
.marquee-item{
  flex-shrink:0;padding:14px 28px;
  border:1px solid rgba(49,212,255,.1);border-radius:12px;
  background:rgba(0,168,255,.03);color:var(--muted);
  font-size:.82rem;letter-spacing:.1em;font-weight:600;
  white-space:nowrap;transition:border-color .2s,color .2s;
}
.marquee-item:hover{border-color:rgba(49,212,255,.35);color:var(--cyan)}
@keyframes marqueeScroll{
  0%{transform:translateX(0)}
  100%{transform:translateX(-50%)}
}
```

- [ ] **Step 3: Test in browser**

Logos should scroll infinitely left. Pause on hover. Seamless loop (no jump).

---

### Task 8: FAQ com Animações

**Files:**
- Modify: `index.html` — add FAQ section
- Modify: `css/style.css` — add FAQ styles
- Modify: `js/script.js` — add accordion toggle with GSAP

**Interfaces:**
- Consumes: GSAP (from Task 1)
- Produces: animated accordion FAQ

- [ ] **Step 1: Add FAQ HTML**

In `index.html`, insert before the `#contato` section:

```html
<section class="section" id="faq">
  <div class="section-head reveal">
    <div class="kicker">Perguntas Frequentes</div>
    <h2>Tire suas <em>dúvidas.</em></h2>
  </div>
  <div class="faq-list">
    <div class="faq-item reveal">
      <button class="faq-question" aria-expanded="false">
        <span>Quais serviços a LinuXis oferece?</span>
        <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
      </button>
      <div class="faq-answer"><div class="faq-answer-inner">
        Oferecemos informática e suporte, manutenção e formatação, software sob medida, desenvolvimento de aplicativos, soluções para empresas, consultoria em tecnologia e marketing digital.
      </div></div>
    </div>
    <div class="faq-item reveal">
      <button class="faq-question" aria-expanded="false">
        <span>Como funciona o processo de desenvolvimento?</span>
        <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
      </button>
      <div class="faq-answer"><div class="faq-answer-inner">
        Começamos com diagnóstico e planejamento, seguimos com arquitetura e desenvolvimento, e entregamos com validação e suporte contínuo. Cada etapa é alinhada com o cliente.
      </div></div>
    </div>
    <div class="faq-item reveal">
      <button class="faq-question" aria-expanded="false">
        <span>Vocês atendem empresas de qualquer porte?</span>
        <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
      </button>
      <div class="faq-answer"><div class="faq-answer-inner">
        Sim. Atendemos desde profissionais autônomos até empresas de médio e grande porte. Nossas soluções são personalizadas para cada necessidade e orçamento.
      </div></div>
    </div>
    <div class="faq-item reveal">
      <button class="faq-question" aria-expanded="false">
        <span>Qual o prazo médio de entrega de um projeto?</span>
        <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
      </button>
      <div class="faq-answer"><div class="faq-answer-inner">
        Projetos simples podem levar de 2 a 4 semanas. Sistemas mais complexos podem levar de 1 a 3 meses. O prazo é definido após o diagnóstico inicial.
      </div></div>
    </div>
    <div class="faq-item reveal">
      <button class="faq-question" aria-expanded="false">
        <span>Vocês oferecem suporte após a entrega?</span>
        <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
      </button>
      <div class="faq-answer"><div class="faq-answer-inner">
        Sim. Oferecemos suporte técnico contínuo, manutenção, atualizações e acompanhamento para garantir que tudo funcione perfeitamente.
      </div></div>
    </div>
    <div class="faq-item reveal">
      <button class="faq-question" aria-expanded="false">
        <span>Como solicitar um orçamento?</span>
        <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
      </button>
      <div class="faq-answer"><div class="faq-answer-inner">
        Entre em contato pelo formulário abaixo, por e-mail ou WhatsApp. Descreva sua necessidade e retornamos com uma proposta personalizada.
      </div></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add FAQ CSS**

Append to `css/style.css`:

```css
.faq-list{max-width:760px;display:grid;gap:10px}
.faq-item{
  border:1px solid rgba(49,212,255,.1);border-radius:14px;
  background:rgba(9,24,42,.35);backdrop-filter:blur(8px);overflow:hidden;
  transition:border-color .25s;
}
.faq-item:hover{border-color:rgba(49,212,255,.25)}
.faq-question{
  width:100%;display:flex;justify-content:space-between;align-items:center;
  padding:20px 24px;background:none;border:none;color:var(--white);
  font-size:1rem;font-weight:600;cursor:pointer;text-align:left;gap:12px;
}
.faq-icon{
  flex-shrink:0;color:var(--cyan);transition:transform .3s;
}
.faq-item.open .faq-icon{transform:rotate(180deg)}
.faq-answer{
  height:0;overflow:hidden;
}
.faq-answer-inner{
  padding:0 24px 20px;color:var(--muted);line-height:1.75;font-size:.94rem;
}
```

- [ ] **Step 3: Add FAQ accordion JS**

Append to `js/script.js`:

```javascript
/* ===== FAQ Accordion ===== */
$$(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");
    const isOpen = item.classList.contains("open");

    $$(".faq-item.open").forEach(openItem => {
      if(openItem !== item){
        openItem.classList.remove("open");
        openItem.querySelector(".faq-question").setAttribute("aria-expanded","false");
        const openAnswer = openItem.querySelector(".faq-answer");
        if(typeof gsap !== "undefined"){
          gsap.to(openAnswer,{height:0,duration:.3,ease:"power2.inOut"});
        } else {
          openAnswer.style.height = "0";
        }
      }
    });

    if(isOpen){
      item.classList.remove("open");
      btn.setAttribute("aria-expanded","false");
      if(typeof gsap !== "undefined"){
        gsap.to(answer,{height:0,duration:.35,ease:"power2.inOut"});
      } else {
        answer.style.height = "0";
      }
    } else {
      item.classList.add("open");
      btn.setAttribute("aria-expanded","true");
      if(typeof gsap !== "undefined"){
        gsap.set(answer,{height:"auto"});
        const h = answer.offsetHeight;
        gsap.fromTo(answer,{height:0},{height:h,duration:.4,ease:"power2.out"});
      } else {
        answer.style.height = answer.scrollHeight + "px";
      }
    }
  });
});
```

- [ ] **Step 4: Test in browser**

Click FAQ questions — should animate open/close smoothly. Only one open at a time. Arrow rotates.

---

### Task 9: Formulário → WhatsApp

**Files:**
- Modify: `index.html` — replace contact section with form
- Modify: `css/style.css` — add form styles
- Modify: `js/script.js` — add form validation and WhatsApp redirect

**Interfaces:**
- Consumes: WhatsApp number 5561996911526
- Produces: validated form that opens WhatsApp with pre-filled message

- [ ] **Step 1: Replace contact section HTML**

Replace the `#contato` section (lines 178-188) in `index.html`:

```html
<section class="section" id="contato" style="padding-top:90px;padding-bottom:90px">
  <div class="section-head reveal">
    <div class="kicker">05 / Contato</div>
    <h2>Vamos criar o próximo <em>projeto.</em></h2>
    <p>Preencha o formulário abaixo e entraremos em contato pelo WhatsApp.</p>
  </div>
  <form class="contact-form reveal" id="contactForm">
    <div class="form-group">
      <label for="formName">Nome</label>
      <input type="text" id="formName" name="name" placeholder="Seu nome completo" required autocomplete="name">
    </div>
    <div class="form-group">
      <label for="formService">Serviço</label>
      <select id="formService" name="service" required>
        <option value="" disabled selected>Selecione um serviço</option>
        <option value="Informática & Suporte">Informática & Suporte</option>
        <option value="Manutenção & Formatação">Manutenção & Formatação</option>
        <option value="Software Sob Medida">Software Sob Medida</option>
        <option value="Aplicativos">Aplicativos</option>
        <option value="Soluções para Empresas">Soluções para Empresas</option>
        <option value="Consultoria em Tecnologia">Consultoria em Tecnologia</option>
        <option value="Marketing Digital">Marketing Digital</option>
        <option value="Outro">Outro</option>
      </select>
    </div>
    <div class="form-group">
      <label for="formMessage">Mensagem</label>
      <textarea id="formMessage" name="message" rows="4" placeholder="Descreva sua necessidade..." required></textarea>
    </div>
    <button type="submit" class="btn btn-primary form-submit">
      Enviar pelo WhatsApp →
    </button>
  </form>
</section>
```

- [ ] **Step 2: Add form CSS**

Append to `css/style.css`:

```css
.contact-form{
  max-width:560px;display:grid;gap:20px;
}
.form-group{display:grid;gap:7px}
.form-group label{
  font-size:.74rem;color:var(--muted);text-transform:uppercase;
  letter-spacing:.15em;font-weight:700;
}
.form-group input,.form-group select,.form-group textarea{
  padding:14px 18px;border:1px solid rgba(49,212,255,.15);border-radius:12px;
  background:rgba(9,24,42,.5);backdrop-filter:blur(8px);
  color:var(--white);font-size:.95rem;font-family:inherit;
  transition:border-color .25s,box-shadow .25s;outline:none;
}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{
  border-color:var(--blue);box-shadow:0 0 20px rgba(0,168,255,.15);
}
.form-group input::placeholder,.form-group textarea::placeholder{color:rgba(141,162,185,.5)}
.form-group select{cursor:pointer;appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2300a8ff' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 16px center;
}
.form-group select option{background:#0a1828;color:var(--white)}
.form-group textarea{resize:vertical;min-height:100px}
.form-submit{width:100%;justify-content:center;margin-top:6px}
```

- [ ] **Step 3: Add form JS**

Append to `js/script.js`:

```javascript
/* ===== Formulário → WhatsApp ===== */
const contactForm = document.getElementById("contactForm");
if(contactForm){
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("formName").value.trim();
    const service = document.getElementById("formService").value;
    const message = document.getElementById("formMessage").value.trim();

    if(!name || !service || !message){
      [document.getElementById("formName"),
       document.getElementById("formService"),
       document.getElementById("formMessage")].forEach(el => {
        if(!el.value.trim()){
          el.style.borderColor = "#ff6b6b";
          el.addEventListener("input", () => el.style.borderColor = "", {once:true});
        }
      });
      return;
    }

    const text = encodeURIComponent(
      "Olá! Meu nome é " + name + ".\n\n" +
      "Tenho interesse no serviço: " + service + "\n\n" +
      "Mensagem: " + message
    );
    window.open("https://wa.me/5561996911526?text=" + text, "_blank");
  });
}
```

- [ ] **Step 4: Update footer numbering**

In `index.html` footer, no changes needed — footer is independent.

- [ ] **Step 5: Test in browser**

Fill form → submit → WhatsApp opens with pre-filled message. Empty fields show red border. All fields required.

---

### Task 10: Tracking Infrastructure (GTM, GA4, Meta Pixel)

**Files:**
- Modify: `index.html` — add tracking scripts and dataLayer
- Modify: `js/script.js` — add event tracking hooks

**Interfaces:**
- Consumes: none (standalone)
- Produces: dataLayer, tracking script placeholders, event hooks

- [ ] **Step 1: Add tracking to index.html**

In `index.html`, add in `<head>` section (after `<meta name="description" ...>`, before `<title>`):

```html
<!-- Google Tag Manager -->
<script>dataLayer = [];</script>
<!-- End Google Tag Manager -->
<!-- Meta Pixel -->
<!-- <script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','YOUR_PIXEL_ID');fbq('track','PageView');</script> -->
<!-- End Meta Pixel -->
```

In `index.html`, add right after `<body>` (after line 11):

```html
<!-- Google Tag Manager (noscript) -->
<!-- <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> -->
<!-- End Google Tag Manager (noscript) -->
```

- [ ] **Step 2: Add tracking event hooks to JS**

Append to `js/script.js`:

```javascript
/* ===== Tracking Events ===== */
function trackEvent(eventName, params){
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event: eventName, ...params});
  if(typeof fbq === "function") fbq("trackCustom", eventName, params);
}

$$(".btn-primary, .nav-cta").forEach(btn => {
  btn.addEventListener("click", () => {
    trackEvent("cta_click", {element: btn.textContent.trim(), section: btn.closest("section")?.id || "nav"});
  });
});

$$(".card[data-service]").forEach(card => {
  card.addEventListener("click", () => {
    trackEvent("service_view", {service: card.dataset.service});
  });
});

const contactForm2 = document.getElementById("contactForm");
if(contactForm2){
  contactForm2.addEventListener("submit", () => {
    trackEvent("form_submit", {service: document.getElementById("formService")?.value});
  });
}

let maxScroll = 0;
window.addEventListener("scroll", () => {
  const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100);
  if(pct > maxScroll && pct % 25 === 0){
    maxScroll = pct;
    trackEvent("scroll_depth", {percent: pct});
  }
});
```

- [ ] **Step 3: Verify in browser**

Open browser console → type `dataLayer` → should show array. Click CTAs → events appear in dataLayer. Scroll → scroll_depth events fire.

---

### Task 11: prefers-reduced-motion Accessibility

**Files:**
- Modify: `css/style.css` — add reduced-motion media query
- Modify: `js/script.js` — disable JS animations when reduced motion preferred

**Interfaces:**
- Consumes: all animation code from previous tasks
- Produces: accessible fallback when user prefers reduced motion

- [ ] **Step 1: Add CSS reduced-motion rules**

Append to `css/style.css` at the very end:

```css
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{
    animation-duration:0.01ms!important;
    animation-iteration-count:1!important;
    transition-duration:0.01ms!important;
    scroll-behavior:auto!important;
  }
  .hero-bg::after{animation:none}
  .scan{animation:none;display:none}
  .grid{transform:none}
  #cursor,#cursor-glow{display:none!important}
  .marquee-track{animation:none}
  .live-dot{animation:none}
  .reveal{opacity:1;transform:none}
  .compare-slider{cursor:default}
}
```

- [ ] **Step 2: Add JS reduced-motion check**

At the top of `js/script.js` (after line 1), add:

```javascript
const prefersReducedMotion = matchMedia("(prefers-reduced-motion:reduce)").matches;
```

Then wrap the following blocks with the check:

For the parallax scroll handler (line 16), wrap the `forEach` body:
```javascript
if(!prefersReducedMotion){
  document.querySelectorAll("[data-speed]").forEach(el => {
    // ... existing code
  });
}
```

For the cursor code, wrap the entire cursor section:
```javascript
if(!prefersReducedMotion){
  // ... cursor code from Task 2
}
```

For the tilt code, wrap with both checks:
```javascript
if(!prefersReducedMotion && !matchMedia("(pointer:coarse)").matches){
  // ... tilt code from Task 3
}
```

- [ ] **Step 3: Test in browser**

Enable "Reduce motion" in OS settings. All animations should stop. Page should still be fully functional. Cursor should be hidden.

---

### Task 12: Responsive Polish & Section Numbering

**Files:**
- Modify: `css/style.css` — add responsive rules for new sections
- Modify: `index.html` — verify section numbering consistency

**Interfaces:**
- Consumes: all previous tasks
- Produces: polished responsive layout at all breakpoints

- [ ] **Step 1: Add responsive CSS for new sections**

Append to `css/style.css` inside the existing `@media(max-width:900px)` block (or add new rules):

```css
@media(max-width:900px){
  .charts-grid{grid-template-columns:1fr 1fr}
  .dash-metrics{grid-template-columns:repeat(2,1fr)}
  .dash-sparklines{grid-template-columns:1fr}
  .compare-container{height:320px}
  .faq-list{max-width:100%}
}

@media(max-width:620px){
  .charts-grid{grid-template-columns:1fr}
  .chart-card{padding:24px}
  .bar-row{grid-template-columns:80px 1fr 36px}
  .dash-panel{padding:20px}
  .compare-container{height:400px}
  .compare-side{padding:20px}
  .compare-stat{font-size:.82rem}
  .faq-question{padding:16px 18px;font-size:.92rem}
  .contact-form{max-width:100%}
}
```

- [ ] **Step 2: Verify section numbering**

In `index.html`, ensure numbering is consistent:
- Hero: no number
- Serviços: `01`
- Tecnologia: `02`
- Resultados: `03`
- Sobre: `04`
- Contato: `05`

- [ ] **Step 3: Test responsive**

Open at 375px, 768px, 1024px, 1440px. All sections should stack properly. No horizontal overflow. Touch interactions work.

---

### Task 13: Final Cleanup & Verification

**Files:**
- Verify: `index.html` — all sections present, no broken HTML
- Verify: `css/style.css` — no syntax errors
- Verify: `js/script.js` — no console errors

**Interfaces:**
- Consumes: all previous tasks
- Produces: clean, working final build

- [ ] **Step 1: Validate HTML**

Open `index.html` in browser → check Console for errors. All sections should render. No 404s.

- [ ] **Step 2: Validate CSS**

Check browser DevTools → no CSS parsing errors. All custom properties resolve.

- [ ] **Step 3: Validate JS**

Check browser Console → no errors. All features work:
- Hero animation ✓
- Cursor glow ✓
- Glassmorphism cards + tilt ✓
- SVG charts animate on scroll ✓
- Dashboard updates live ✓
- Before/after slider drags ✓
- Logo marquee scrolls ✓
- FAQ accordion opens/closes ✓
- Form submits to WhatsApp ✓
- Tracking events fire ✓
- Reduced motion stops animations ✓

- [ ] **Step 4: Test on mobile**

Chrome DevTools device toolbar → test at iPhone SE, iPad, Desktop. All responsive.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: landing page cinematic improvements — GSAP, glassmorphism, dashboard, FAQ, form, tracking"
```
