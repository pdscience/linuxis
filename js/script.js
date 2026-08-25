const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const nav = $("#nav");
const progress = $("#progress");
const menu = $("#menu");
const navLinks = $("#navLinks");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 30);

  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.min(100, (y / max) * 100)}%`;

  document.querySelectorAll("[data-speed]").forEach(el => {
    const speed = parseFloat(el.dataset.speed || ".1");
    el.style.setProperty("--parallax", `${y * speed}px`);
    if(el.classList.contains("logo-stage")){
      el.style.setProperty("--logo-y", `${y * speed * -0.45}px`);
    }
  });
});

menu.addEventListener("click", () => navLinks.classList.toggle("open"));
$$(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

const cursor = $("#cursor");
window.addEventListener("pointermove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
window.addEventListener("pointerdown", () => cursor.style.transform = "translate(-50%,-50%) scale(.65)");
window.addEventListener("pointerup", () => cursor.style.transform = "translate(-50%,-50%) scale(1)");

/* Efeito sutil de circuito/pontos luminosos */
const canvas = document.createElement("canvas");
canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.25";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
let points = [];

function resize(){
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  points = Array.from({length: Math.min(42, Math.floor(innerWidth/28))}, () => ({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    vx:(Math.random()-.5)*.18,
    vy:(Math.random()-.5)*.18
  }));
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  points.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>innerWidth)p.vx*=-1;
    if(p.y<0||p.y>innerHeight)p.vy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,1.2,0,Math.PI*2);
    ctx.fillStyle="#00a8ff";ctx.fill();
  });
  for(let i=0;i<points.length;i++){
    for(let j=i+1;j<points.length;j++){
      const a=points[i],b=points[j];
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<125){
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=`rgba(0,168,255,${(1-d/125)*.22})`;
        ctx.lineWidth=1;ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
resize();draw();
addEventListener("resize",resize);