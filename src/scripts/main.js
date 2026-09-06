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