# LinuXis — Redesign Cinematográfico (2026-09-06)

## Objetivo

Reconstruir a apresentação do site da LinuXis Tecnologia com estética cinematográfica inspirada na página SpaceX Starship (fundos pretos profundos, storytelling de scroll, seções full-bleed), preservando a identidade azul/ciano da marca. Cada serviço da empresa vira um módulo próprio do site, com fundo visual temático, e a página inclui animações GSAP/ScrollTrigger, formulário → WhatsApp, estrutura analítica pronta (GTM/GA4/Meta Pixel) e acessibilidade via `prefers-reduced-motion`.

## Referência

- Estética: https://www.spacex.com/vehicles/starship — fundos escuros, tipografia grande e uppercase, módulos de tela cheia, storytelling de scroll.
- Identidade: preto profundo + destaques em azul (#00a8ff) e ciano (#31d4ff), preservando o logo atual.

## Decisões confirmadas

1. **Vídeo hero:** não há vídeo disponível. O Hero será cinematográfico com parallax (imagem `hero-tech.png`), gradientes radiais, grade em perspectiva e partículas em canvas — com estrutura `<video>` pronta para substituição futura (elemento presente, desativado).
2. **Imagens dos módulos:** geradas como SVGs procedurais temáticos por serviço (sem banco de imagens externo).
3. **GSAP:** adicionar `gsap` via npm; usar ScrollTrigger para reveals, parallax, timeline do hero.
4. **Identidade visual:** preto + azul/ciano (mantém marca).

## Estrutura de arquivos

```
src/
├── assets/
│   ├── logo.png                    # logo existente
│   ├── hero-tech.png               # imagem do hero existente
│   └── services/                   # SVGs procedurais por serviço
│       ├── google.svg
│       ├── suporte.svg
│       ├── manutencao.svg
│       ├── software.svg
│       ├── aplicativos.svg
│       ├── empresas.svg
│       ├── consultoria.svg
│       └── shared/                 # (opcional) strokes, grid, glow
├── components/
│   ├── Header.astro                # nav fixa c/ blur, barra de progresso, menu mobile
│   ├── Hero.astro                  # hero cinematográfico + fallback visual
│   ├── MarqueeLogos.astro          # logos de tecnologias em movimento infinito
│   ├── ServiceModule.astro         # módulo genérico de serviço (fundo + split + gráfico)
│   ├── ServiceCard.astro           # card glassmorphism + tilt 3D (GSAP)
│   ├── AnimatedChart.astro         # gráficos SVG animados (draw via GSAP)
│   ├── Faq.astro                   # acordeão animado
│   ├── Sobre.astro                 # seção "missão" / CTA
│   ├── Contato.astro               # formulário → WhatsApp
│   └── Footer.astro
├── layouts/
│   └── Layout.astro                # head, analytics placeholders, gsap, scripts
├── scripts/
│   ├── analytics.js                # dataLayer + eventos de conversão
│   └── gsapSetup.js                # ScrollTrigger config global
├── pages/
│   └── index.astro                 # compõe os módulos em ordem
└── styles/
    └── global.css                  # tokens de cor, reset, utilitários
```

## Módulos do site (ordem na home)

Cada serviço corresponde a um módulo com fundo visual próprio e animações de scroll.

1. **Hero cinematográfico** — tela cheia: parallax da imagem, gradientes radiais ciano/azul, grid em perspectiva, partículas canvas, headline gigante uppercase, CTAs (`#servicos`, `#contato`). Elemento `<video>` embutido (desativado) como preparação para vídeo futuro.
2. **Marquee de tecnologias** — faixa de logos/texto (Linux, React, Python, Node, Docker, PostgreSQL, Arduino, etc.) em rotação horizontal infinita (CSS keyframes, pausa em `prefers-reduced-motion`).
3. **Módulo serviço: Google Meu Negócio & Leads** — fundo google.svg; gráfico SVG animado de crescimento de leads; card de anúncios; CTA WhatsApp.
4. **Módulo serviço: Informática & Suporte** — fundo suporte.svg (hardware); lista de sub-serviços em cards glass.
5. **Módulo serviço: Manutenção & Formatação** — fundo manutencao.svg; gráfico SVG animado de desempenho após otimização; cards de etapas (01/02/03).
6. **Módulo serviço: Software Sob Medida** — fundo software.svg; terminal animado (estilo atual mantido, reanimado com GSAP); bullet de features.
7. **Módulo serviço: Aplicativos** — fundo aplicativos.svg (mobile); cards de plataformas (web, iOS, Android, PWA).
8. **Módulo serviço: Soluções para Empresas** — fundo empresas.svg (painel/gestão); features de digitalização e integração.
9. **Módulo serviço: Consultoria em Tecnologia** — fundo consultoria.svg (roadmap); "estágios" 01/02/03 de diagnóstico/estratégia/solução.
10. **Sobre / Missão** — seção CTA: frase de missão, botão "Vamos conversar →".
11. **FAQ** — acordeão (4–6 perguntas) com animação suave de altura e `aria-expanded`.
12. **Contato** — formulário (nome, e-mail, serviço, mensagem) que compõe texto e abre `https://wa.me/5561996911526?text=...` sem sair da experiência; dispara evento `generate_lead`.

Footer fixo com marca, linha e copyright.

## Diagrama de dados / fluxo

- **Sem backend.** `index.astro` → `Layout` (head + analytics + scripts) → módulos.
- **Formulário → WhatsApp:** submit interceptado; monta `encodeURIComponent` da mensagem; `window.open(wa.me...)`; chama `window.dataLayer.push` com evento `generate_lead`.
- **Analytics:** arrays `window.dataLayer`; placeholders no `<head>` para Google Tag Manager, GA4 (`G-XXXXXXXXXX`) e Meta Pixel (`XXXXXXXXXXXXXXX`) lidos de env `PUBLIC_*`; helper `track(event, params)` em `scripts/analytics.js`.
- **GSAP:** `gsapSetup.js` registra `ScrollTrigger`; cada componente importa funções de animação; `prefers-reduced-motion` desativa.

## Tratamento de erros

- Se GSAP falhar ao carregar (rede/integridade), as animações não bloqueiam o render — conteúdo permanece visível via estado CSS inicial definido para "visível por padrão" e animação só aplica quando JS roda (progressiva). Classes de "escondido" só são adicionadas por JS.
- Se o WhatsApp não abrir (pop-up bloqueado / offline), formulário exibe feedback visual de fallback (texto para copiar + `mailto:linuxis.oficial@gmail.com`).
- Imagens SVG locais: nenhuma dependência externa de rede para assets.
- Canvas: try/catch no `getContext`; se falhar, partículas são ignoradas sem quebrar o hero.

## Acessibilidade

- `@media (prefers-reduced-motion: reduce)`: desativa marquee infinito, parallax, tilt 3D, animações GSAP de scroll — conteúdo visível estaticamente.
- FAQ: `button` com `aria-expanded`, `aria-controls`, `role="region"`.
- Menu mobile: `aria-expanded`, fecha ao clicar em link.
- Contraste: texto sobre fundos escuros com opacity controlada de gradientes; links de foco visível (`:focus-visible`).
- Imagens: `alt` descritivos; SVGs decorativos com `aria-hidden="true"`.

## Testes / verificação

- `npm run build` (astro build) deve completar sem erros.
- Inspeção do HTML gerado: 7 módulos de serviço + hero + marquee + sobre + faq + contato presentes.
- Verificação manual em `npm run dev`: animações de scroll ativas desktop; comportamento mobile (>900px e >620px quebras) sem overflow horizontal.
- Teste de envio do formulário (abre WhatsApp com mensagem montada).
- Reduzir movimento do SO (sistema) confirma que animações desativam.

## Dependências

- Adicionar: `gsap` (npm).
- Astro 7.x existente mantido.

## Fora de escopo

- Backend/CRM real; envio real via servidor; playlist de vídeos; criação de conta Google Ads/GA4 — apenas estrutura pronta.
- Migração de conteúdo além dos módulos descritos.