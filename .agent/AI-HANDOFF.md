# AI-HANDOFF.md — Context for Any AI Continuing This Project

> **Paste this entire file at the start of a new conversation.**
> You are continuing work on Dex Bennett's personal portfolio.
> Everything you need to know is here. Read it fully before doing anything.
>
> ⚠️ **ALSO READ: `.agent/Protocol.md` BEFORE doing any work.**
> Protocol.md contains known bugs, traps, and patterns from real sessions.
> Skipping it means repeating mistakes that already happened.

---

## 1. WHO YOU'RE WORKING WITH

**Dex Bennett** — 20 y.o., 6th-semester Information Systems student at UKDW, Yogyakarta, Indonesia. Online alias: **Style** / **Stylenecy**.

He is NOT a typical IT student. He self-identifies as a **Creative Technologist** — someone who designs systems, builds them, and gives them soul. His signature belief: *"I build systems that don't just function — but feel alive."*

**How he communicates:** Casual, enthusiastic, uses parenthetical emotional asides *(like this)*. Honest about his limitations. Ambitious ("maruk"). He does not need hand-holding — he needs a skilled collaborator.

**Technical reality:** He is a vibe-coder. He relies on AI to execute technical work. He has the vision but sometimes struggles to articulate it precisely. Be patient, ask clarifying questions if the request is vague.

**What he cares about most:** Soul, aesthetics, authenticity. He hates things that are "just functional." If it doesn't feel alive, it's not done.

**Full identity profile:** See `.agent/Dex.md` in the repo.

---

## 2. THE PROJECT

**Name:** Dex Bennett // System OS Portfolio
**Live:** dex.web-portofolio.com
**Repo:** `D:/AT Kuliah/All of Project/dex-portfolio/`
**Active working directory:** `taste-express/public/` (static site)

**Concept:** "The Operator" — the portfolio is a **System OS Dashboard**, directly inspired by the manhwa **Questism** by Park Taejoon. Dex IS the system. His life data is system data.

**4 Hubs (all content-complete):**
| Hub | Accent | Content |
|-----|--------|---------|
| // SYSTEM_CORE | Cyan `#64d2ff` | Skills, projects, contact |
| // OPERATIONS | Purple `#8b5cf6` | Leadership, certs, timeline |
| // OPERATOR_METRICS | Orange `#fb923c` | RPG stat block, bio, physical |
| // ARCHIVES | Green `#4ade80` | Posters, photos, YouTube, Instagram |

**Navigation:** Fixed left sidebar (desktop) + floating bottom dock. Hub switching via JS router (`js/router.js`).

---

## 3. FILE STRUCTURE

```
taste-express/
└── public/
    ├── index.html          ← Single-page dashboard (~2993 lines)
    ├── css/
    │   ├── main.css        ← Import manifest only (no styles here)
    │   ├── variables.css   ← ALL design tokens (edit here first)
    │   ├── reset.css
    │   ├── aurora.css      ← Ambient background blobs
    │   ├── glassmorphism.css ← Glass utility classes
    │   ├── layout-dashboard.css ← Sidebar, hub panels, bento grid
    │   ├── utilities.css   ← Scroll reveal, helpers
    │   ├── components/
    │   │   ├── sidebar.css
    │   │   ├── dock.css    ← Bottom navigation pill
    │   │   ├── stat-block.css ← RPG stat panel
    │   │   ├── cards.css   ← Arsenal cards, mission items, tags
    │   │   └── timeline.css
    │   └── hubs/
    │       ├── system-core.css
    │       ├── operations.css
    │       ├── operator-metrics.css
    │       └── archives.css
    └── js/
        ├── router.js       ← Hub switching engine
        └── modules/
            ├── gallery-lightbox.js
            └── stat-counter.js
```

**Rule:** Never add styles to `main.css`. It is a pure manifest. Add a new file and `@import` it there.

---

## 4. DESIGN SYSTEM — CRITICAL, READ THIS

### Fonts (Google Fonts, loaded in `<head>`)
```css
--font-sans: 'Inter', system-ui, sans-serif;   /* body, headings */
--font-mono: 'Geist Mono', monospace;          /* labels, tags, system text */
```
**Never** hardcode `Consolas`, `Courier New`, `Segoe UI`, or `Cascadia`. Always use `var(--font-mono)` or `var(--font-sans)`.

### Shadow System (multi-layer — this is what gives depth)
```css
--shadow-xs   /* chips, tags */
--shadow-sm   /* standard card */
--shadow-md   /* elevated panel */
--shadow-lg   /* modal/floating */
--shadow-hover-cyan   /* hover state — System Core */
--shadow-hover-purple /* hover state — Operations */
--shadow-hover-orange /* hover state — Operator Metrics */
--shadow-hover-green  /* hover state — Archives */
```
**Always use tokens.** Never write raw multi-line box-shadow from scratch.

### Hub Accent Cascade
Each hub sets these variables locally:
```css
--hub-accent        /* the hub's primary color */
--hub-accent-dim    /* 10% opacity fill */
--hub-accent-glow   /* 22% opacity glow */
--hub-accent-border /* border color */
--hub-shadow-hover  /* points to correct --shadow-hover-* */
```
Cards and bento cells automatically inherit these. You don't need to hardcode colors in component CSS — use `var(--hub-accent)` etc.

### Key Easing Curves
```css
--ease-out:        cubic-bezier(0.22, 1, 0.36, 1)   /* entrance animations */
--ease-responsive: cubic-bezier(0.2, 0.8, 0.2, 1)   /* hover interactions */
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1) /* bouncy/dock */
```

### Color Palette
```css
--bg-void:      #080810   /* page background */
--bg-surface:   #0d0f17   /* card backgrounds */
--text-primary: #eceef3   /* main text */
--text-secondary: #8b8fa8 /* subdued text */
--cyan:   #64d2ff  --purple: #8b5cf6
--orange: #fb923c  --green:  #4ade80
```

---

## 5. CURRENT STATE (as of 2026-04-16)

### What's done
- ✅ All 4 hubs: content complete
- ✅ Visual overhaul: Inter + Geist Mono fonts, multi-layer shadow system, hub-aware accent cascade
- ✅ All assets in `public/images/` and `public/certificates/` (incl. EURECA Top 15 Semifinalist cert)
- ✅ Aurora engine, glassmorphism system, dock, stat block, gallery lightbox

### What's NOT done yet (pending)
- ⬜ Projects need updating: **Sowan.id** (BPC EURECA 2026 semi-finalist) and **VR Inclusive Tourism** not in Mission Log yet
- ⬜ Each project needs the **Problem → Thinking → Decision → Result** framework
- ⬜ Stat counter animations (module ready, just needs `data-target` attrs in HTML)
- ⬜ Potential React/Next.js migration (if OS-feel needs to be snappier)

---

## 6. HOW TO APPROACH WORK ON THIS PROJECT

### DO:
- Read the relevant CSS file before editing. The token system is your friend.
- Check `variables.css` first when adding new visual elements.
- Use `var(--hub-accent)` etc. in component CSS — don't hardcode colors.
- Use `will-change: transform` on hover-animated cards.
- Keep transitions using `var(--duration-base) var(--ease-responsive)`.
- When adding new sections to HTML, follow the existing pattern: `bento-cell` wrapper, `hub__label` + `hub__title` pattern.

### DON'T:
- Never add hardcoded font families. Use `var(--font-mono)` or `var(--font-sans)`.
- Never write raw box-shadow — use `var(--shadow-sm)` etc.
- Never add styles to `main.css` (it's a manifest only).
- Never use `important!` unless truly necessary.
- Don't change the hub ID naming (e.g., `#hub-system-core`) — router.js depends on them.
- Don't remove the `data-hub` attributes from hub wrappers.

---

## 7. DEX'S PREFERENCES (things he's said explicitly)

- He wants the portfolio to feel like **exploring a secret system**, not reading a brochure
- Dark theme, always. Glassmorphism, techy, gamified
- "Chaos in a calm way" — sometimes clean, sometimes impressive
- He hates traditional scrolling websites
- Each project must show **WHY** it exists, not just what it is
- The word **"soul"** matters to him — if it doesn't feel alive, it's not done
- He is not chasing job applications — this is **authentic personal branding first**

---

## 8. REFERENCES (in `.agent/FE-idea-v2/`)

Three reference portfolios Dex loves:
- `daveos.html` — OS-themed portfolio (Framer). Multi-layer shadows, superellipse corners, noise texture
- `bohdan_design.html` — Dark theme, orange accent, Geist Mono + Inter Display
- `elsye-residence.html` — Luxury polish, glassmorphism, staggered animations

These are HTML exports of Framer/Webflow sites. Study them for design inspiration.

---

*This file should be pasted at the start of any new AI conversation continuing work on this portfolio.*
*For Dex's full identity: see `.agent/Dex.md`*
*For full project history: see `.agent/WALKTHROUGH.md`*
