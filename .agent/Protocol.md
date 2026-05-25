# PROTOCOL.md — Mandatory Reading for Every AI Working on This Project

> **STOP. Read this entire file before doing ANYTHING.**
> This is not optional. This file exists because previous AI sessions made
> avoidable mistakes. Reading this takes 3 minutes. Ignoring it wastes hours.

---

## 0. WHAT THIS FILE IS

This is the living protocol for AI-assisted development on Dex Bennett's portfolio.
Every AI — Claude, Gemini, MiniMax, Qwen, GPT, anyone — must:

1. **Read this file first** before touching any code or file
2. **Read AI-HANDOFF.md** for full project context
3. **Read WALKTHROUGH.md** for current state + pending tasks
4. **Recap to this file** at the end of every session (see Section 5)

If you skip this, you will repeat mistakes that already happened.

---

## 1. MANDATORY PRE-WORK CHECKLIST

Before writing a single line of code, confirm you have done ALL of these:

- [ ] Read `AI-HANDOFF.md` fully — architecture, design system, hub structure
- [ ] Read `WALKTHROUGH.md` — current state, what's done, what's pending
- [ ] Read `.agent/Dex.md` — who Dex is, his preferences, his voice
- [ ] Read the SPECIFIC CSS/HTML files you're about to edit (don't assume)
- [ ] Checked Section 3 of THIS file (Known Bad Patterns) for relevant traps
- [ ] Understand what hub/component you're touching and its accent color cascade

**The #1 cause of bad AI output on this project: editing without reading first.**

---

## 2. PROJECT ESSENTIALS (QUICK REFERENCE)

| Thing | Value |
|-------|-------|
| Working dir | `taste-express/public/` |
| Entry point | `index.html` (single-page dashboard) |
| CSS entry | `css/main.css` (manifest only — never add styles here) |
| Design tokens | `css/variables.css` (always check here first) |
| Router | `js/router.js` (don't touch hub IDs — `#hub-system-core` etc.) |
| Font tokens | `var(--font-sans)`, `var(--font-mono)` — NEVER hardcode font names |
| Shadow tokens | `var(--shadow-sm)` etc. — NEVER write raw box-shadow |
| Hub accent | `var(--hub-accent)` etc. — NEVER hardcode hex in components |
| Live URL | `dex.web-portofolio.com` |
| Repo | `github.com/Stylenecy/dex-portfolio` |
| Deploy | Every `git push origin main` auto-deploys via Vercel |

---

## 3. KNOWN BAD PATTERNS — Read Before Coding

These are real mistakes made in past sessions. Do not repeat them.

---

### ❌ BAD-01 · `var()` inside `animation:` shorthand timing-function

**What happened:** Used `var(--ease-out)` as the timing function in animation shorthand.
Browser silently drops the entire animation. Everything appears static, no error shown.

```css
/* ❌ BROKEN — browser does NOT resolve var() in animation timing-fn slot */
animation: my-anim 0.9s var(--ease-out) 0.4s both;

/* ✅ CORRECT — hardcode the cubic-bezier */
animation: my-anim 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
```

**Easing values from variables.css (use these hardcoded in animations):**
- `--ease-out`        → `cubic-bezier(0.22, 1, 0.36, 1)`
- `--ease-in-out`     → `cubic-bezier(0.45, 0, 0.55, 1)`
- `--ease-spring`     → `cubic-bezier(0.34, 1.56, 0.64, 1)`
- `--ease-responsive` → `cubic-bezier(0.2, 0.8, 0.2, 1)`

> NOTE: `var()` IS fine in `transition:` properties and everywhere else in CSS.
> The only broken spot is inside the `animation:` shorthand timing-function position.

---

### ❌ BAD-02 · CSS `transition` for one-shot exit animations

**What happened:** Used `transition: transform 0.85s ...` on the landing overlay.
Clicking "INITIALIZE SYSTEM" caused an instant cut — no sweep animation.
CSS transitions are unreliable for one-shot effects on `position:fixed` elements.

```css
/* ❌ UNRELIABLE */
#lp-overlay { transition: transform 0.85s ...; }
#lp-overlay.lp-exit { transform: translateY(-100%); }

/* ✅ CORRECT — use @keyframes animation + animationend listener */
#lp-overlay.lp-exit {
  animation: exit-sweep 0.85s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}
```

Always pair with a `setTimeout` fallback in JS in case `animationend` misfires:
```js
overlay.addEventListener('animationend', cleanup, { once: true });
setTimeout(cleanup, 950); // fallback
```

---

### ❌ BAD-03 · `animation: none` in `prefers-reduced-motion` block

**What happened:** Used `animation: none` for reduced motion. Dex has Windows
"Animation effects" OFF, which triggers `prefers-reduced-motion: reduce` in all browsers.
Result: entire landing page was a static image — no animations, no movement, nothing.

**Rule for this portfolio:** Landing animations are gentle fades/slides (no strobing).
Do NOT add `animation: none` to the landing CSS reduced-motion block.
If reduced motion must be handled, use `animation-duration: 0.01ms` so elements
reach their final state instantly rather than being invisible/frozen.

---

### ❌ BAD-04 · Editing CSS/HTML without reading the file first

**Pattern:** AI assumes what's in a file and edits based on assumptions.
Always `Read` the file before editing. The codebase is complex and specific.

---

### ❌ BAD-05 · Adding styles directly to `main.css`

`main.css` is a **pure import manifest**. Never add styles there.
Always create a new CSS file and add a single `@import` line to `main.css`.

---

### ❌ BAD-06 · Hardcoding font names, hex colors, or raw box-shadows

```css
/* ❌ ALL OF THESE ARE WRONG */
font-family: 'Consolas', monospace;
color: #64d2ff;
box-shadow: 0 4px 12px rgba(0,0,0,0.3);

/* ✅ CORRECT */
font-family: var(--font-mono);
color: var(--hub-accent);       /* or var(--cyan) if outside a hub */
box-shadow: var(--shadow-sm);
```

---

### ❌ BAD-07 · Changing hub IDs or `data-hub` attributes

`router.js` uses `#hub-system-core`, `#hub-operations`, `#hub-operator-metrics`,
`#hub-archives` and `data-hub="..."` attributes to switch panels.
Renaming these breaks navigation. Do not touch them.

---

## 4. KNOWN GOOD PATTERNS — Do These

---

### ✅ GOOD-01 · Read → Understand → Plan → Edit

Never jump straight to editing. The workflow is:
1. `Read` the relevant file(s)
2. Check `variables.css` for tokens you need
3. Check Section 3 above for traps
4. Write the edit, reference tokens throughout

---

### ✅ GOOD-02 · Use `will-change` on animated elements

Elements with CSS animation or transform transitions should have:
```css
will-change: transform;          /* for transform-only animations */
will-change: transform, opacity; /* for combined animations */
```
This prevents jank on first render.

---

### ✅ GOOD-03 · Stagger animations with hardcoded delays

For sequential entrance animations, use increasing `animation-delay` values
directly on the selectors — don't use JS to add classes one by one.

```css
.item:nth-child(1) { animation: fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
.item:nth-child(2) { animation: fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
.item:nth-child(3) { animation: fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
```

---

### ✅ GOOD-04 · Exit animations: always use `animationend` + `setTimeout` fallback

```js
function exitOverlay(el) {
    el.classList.add('is-exiting');
    el.addEventListener('animationend', function(e) {
        if (e.animationName === 'your-exit-keyframe') { el.remove(); }
    }, { once: true });
    setTimeout(function() {
        if (el.parentNode) el.remove();
    }, 950); // animation duration + 100ms buffer
}
```

---

### ✅ GOOD-05 · Hub accent cascade — let variables do the work

When adding a new card or component inside a hub, just use:
```css
border-color: var(--hub-accent-border);
box-shadow: var(--hub-shadow-hover);
color: var(--hub-accent);
background: var(--hub-accent-dim);
```
Each hub sets these locally. You don't need to know the specific color.

---

### ✅ GOOD-06 · Commit only when work is complete

One commit = one complete, working unit. Don't commit half-done work.
Commit format:
```
type: short description of what changed

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
Types: `feat`, `fix`, `style`, `refactor`, `chore`

---

## 5. HOW TO ACTUALLY WORK WITH DEX — Read This Carefully

> This section was written by Claude Opus 4.6 after a successful session where
> Dex asked for a complex design synthesis task. It exists to teach ANY AI
> — MiniMax, Gemini, Qwen, GPT, Claude Haiku, whoever — how to understand
> what Dex needs and deliver at a high level. **This is the most important
> section in this file if you are not a frontier model.**

---

### 5.1 · Understanding How Dex Communicates

Dex does NOT give you a Jira ticket with acceptance criteria. He speaks naturally,
mixes Indonesian and English, and expects you to **infer the real intent** from
context. Here's how to decode his requests:

| What Dex says | What he actually means |
|---|---|
| "Combine these two references" | Extract the DESIGN LANGUAGE from both, don't copy-paste code. Synthesize the visual DNA into something new. |
| "Change the subject to Dex" | Use his real data from `Dex.md` — name, projects, competitions, links, colors, philosophy. Don't use placeholder "Lorem ipsum" content. |
| "Separated from the project's codes" | Create a standalone file that doesn't touch any existing CSS/HTML/JS. Self-contained, opens in a browser on its own. |
| "I find it hard for X to comprehend" | He's warning you about complexity. Don't promise you'll nail it. Focus on capturing the essence, not pixel-perfect replication. |
| "Make it more alive / give it soul" | Add motion, interactivity, scroll-driven reveals, hover states. Static = dead. But don't go overboard — elegant, not chaotic. |
| "I don't want a traditional scrolling website" | Think system interface, dashboard, game UI. NOT a corporate landing page or a resume template. |

**Golden rule:** When in doubt, read `Dex.md`. It tells you everything about who
he is, how he thinks, and what he considers "good." If your output could belong
to any generic developer's portfolio, you've failed.

---

### 5.2 · The Design Reference Workflow (Critical for Design Tasks)

Dex frequently provides HTML files as visual references (saved from Framer, Webflow,
Awwwards sites, etc.). These files are MASSIVE — 1MB+, 3000+ lines, full of
framework-specific code. **You cannot and should not copy this code.**

Here is the correct workflow:

#### Step 1: Extract the Design DNA (not the code)

For each reference file, identify:
1. **Color palette** — exact hex values, how they're used (bg, accent, text hierarchy)
2. **Typography** — fonts, sizes (especially hero headings), line-height, letter-spacing, weight
3. **Layout system** — grid columns, gap sizes, responsive approach
4. **Signature motifs** — what makes THIS design unique (e.g., corner brackets, clip-paths, specific border treatments)
5. **Animation patterns** — scroll-driven, entrance, hover, exit. What library (GSAP, CSS, Framer Motion)?
6. **Content structure** — how many sections, what order, what hierarchy

If the file is too large to read at once, **read it in chunks** (500 lines at a time)
or use a subagent/search to find the key structural parts. Focus on:
- The `<style>` blocks and CSS custom properties
- The `<body>` structure (section by section)
- The `<script>` blocks (animation logic)
- Skip font-face declarations, SVG paths, and framework boilerplate

#### Step 2: Identify what to take from each reference

Don't blend 50/50. Decide what each reference contributes:
- Reference A might have the better typography and layout grid
- Reference B might have the better animation system and scroll interactions
- Pick the strongest elements from each

#### Step 3: Adapt for Dex's identity

Replace the subject matter completely:
- Use Dex's color system: Cyan `#64d2ff`, Purple `#8b5cf6`, Orange `#fb923c`, Green `#4ade80`
- Use his "System OS / The Operator" language
- Use his real data (projects, competitions, org roles, contact)
- Use dark mode always — `#0a0a0b` or similar near-black
- Include monospace elements — Dex's aesthetic is techy

#### Step 4: Build self-contained

For design explorations (Build-Idea tasks), create a single HTML file with:
- All CSS inline (in `<style>` tags)
- Fonts loaded from Google Fonts or CDN
- Libraries (GSAP, etc.) loaded from CDN
- All content hardcoded — no external dependencies except CDN links
- Must open directly in a browser by double-clicking the file

---

### 5.3 · How to Handle Tasks Above Your Capability

Be honest. Dex respects honesty about limitations more than broken output.

**If you can't read a large file:**
Say "This file is too large for me to process at once. Let me read it in sections."
Then read 300-500 lines at a time and take notes.

**If you can't do complex GSAP/animation work:**
Focus on the static design first — layout, typography, colors, spacing.
Add simple CSS animations (fade-in, slide-up) instead of complex scroll-driven timelines.
Tell Dex: "I've built the structure and visual design. The scroll animations
would need a model with stronger JS capabilities to implement fully."

**If the task is genuinely beyond you:**
Say so. Dex would rather know upfront than waste time debugging bad output.
Offer what you CAN do — maybe the HTML structure, the CSS design tokens,
or a simpler version of the concept.

---

### 5.4 · Quality Signals — How Dex Judges Your Output

Dex will look at your work and instantly judge it. Here's what separates "good" from "mid":

| Good output | Mid output |
|---|---|
| Dark background, proper contrast hierarchy | White background or generic Bootstrap colors |
| Monospace labels + sans-serif body text | Single font throughout |
| Tight letter-spacing on headings (-0.03 to -0.06em) | Default browser letter-spacing |
| Hover states on interactive elements | No hover feedback |
| Scroll-driven motion (even simple opacity fades) | Completely static page |
| System OS language ("Deployed Modules", "Arena Records") | Generic language ("My Projects", "Contact Me") |
| Real data from Dex.md | Placeholder content |
| Consistent accent color usage (cyan for this project) | Random colors or too many colors |
| Proper text hierarchy (primary → secondary → muted → dim) | All text same color/weight |

---

## 6. TIPS FOR ANY AI (especially lower-capability models)

These tips exist because Dex sometimes uses Gemini, MiniMax, or Qwen.
If you are not Claude Sonnet 4.6+, these rules will help you not make mistakes.

---

### TIP-01 · Never assume — always read the actual file

Lower-capability models often hallucinate class names, variable names, or file
contents. Before editing anything, use your Read/file-reading tool on the
exact file. Do not guess what's inside it.

---

### TIP-02 · Work in small, testable steps

Don't write 200 lines of HTML + CSS in one shot. Write the HTML structure first,
verify it makes sense, then add CSS. Then test logic before the next step.

---

### TIP-03 · When adding CSS, start with variables.css

Open `css/variables.css` first. Every color, shadow, spacing value you need is
already defined there. Using tokens means your output will always match the
design system even if you've never seen the rest of the codebase.

---

### TIP-04 · If you're not sure what a class does — search for it

Use Grep or search the codebase before creating a new class. The class might
already exist. Duplicating classes causes specificity conflicts.

---

### TIP-05 · The `both` fill mode is your friend for entrance animations

```css
animation: slide-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both;
/*                                                     ↑    ↑
                                                    delay  fill-mode=both
                                                    
   "both" means: during the delay, apply the `from` keyframe values.
   This prevents the element from being visible before the animation starts.
*/
```
Without `both`, elements flash into view during their delay period.

---

### TIP-06 · Test the exit/transition with a real click, not just code review

CSS transitions and animations can look correct in code but fail at runtime
due to browser rendering context, stacking contexts, or z-index issues.
Always verify interactivity by actually clicking/triggering the element.

---

### TIP-07 · Don't add features Dex didn't ask for

Dex is very specific about what he wants. If he asks you to "add a new
certificate card," just add the certificate card. Don't also "improve" the
layout, add a tooltip, or refactor nearby code. Scope creep wastes time.

---

### TIP-08 · When touching JavaScript — don't break the router

`router.js` is the core engine. Hub switching, scroll reveal, and all navigation
depend on it. When adding new JavaScript functionality, always write it as a
separate module or isolated `<script>` block. Do not modify router.js unless
explicitly asked.

---

### TIP-09 · Dex's voice for copywriting

If you write any text that appears in the UI, match this voice:
- System-flavored: "Signal Frequency", "Operator Online", "Deploy Module"
- Dark, techy, Questism-inspired
- Never corporate, never generic ("Welcome to my portfolio" = wrong)
- The portfolio IS a System OS. Everything is data. Dex IS the Operator.

---

### TIP-10 · When something doesn't work — diagnose before replacing

If an animation doesn't run, don't rewrite it. Check:
1. Is the CSS actually loading? (check network tab)
2. Is `prefers-reduced-motion: reduce` active? (see BAD-03)
3. Is `var()` used in animation timing function? (see BAD-01)
4. Is the element inside `overflow:hidden` in a way that clips it?
5. Is a JS class being added correctly? (console.log the element)

---

### TIP-11 · Design references are for extraction, not replication

When Dex gives you reference HTML files (from Framer, Webflow, Awwwards, etc.),
your job is NOT to copy the code. Those files have 3000+ lines of framework-
specific garbage. Your job is to:
1. Read and extract the design language (see Section 5.2)
2. Identify what makes the reference visually impressive
3. Rebuild the essence using clean, modern HTML/CSS/JS
4. Adapt everything to Dex's identity and color system

If you try to copy-paste from reference files, you will produce broken output.

---

### TIP-12 · Dex's design references (`.agent/FE-idea-v2/`)

These are the key visual references Dex uses to communicate his taste:

- **`bohdan_design.html`** — Framer site. "Technical luxury" aesthetic.
  Key elements: massive typography (200px+ headings, -0.06em tracking),
  corner bracket motifs (4 L-shaped corners on cards/buttons in accent color),
  12-column grid, glassmorphism (backdrop-filter blur + tinted overlay),
  monospace labels (Geist Mono uppercase), dark canvas with single accent color,
  scroll-driven parallax. Fonts: Inter Display + Geist Mono.

- **`elsye-residence.html`** — Webflow site. "Luxury editorial" aesthetic.
  Key elements: GSAP ScrollTrigger scroll-driven reveals, fluid rem scaling
  (`calc(16px * (100vw / 1920))`), SplitText character/word animations,
  30-slice gradient mask reveals, sticky sections, parallax layering,
  editorial parenthesized labels `(About)`, counter animations. Libraries:
  GSAP + ScrollTrigger + SplitText + Splide.js.

When Dex says "use Bohdan and Elsye as reference," he means combine:
- Bohdan's visual chrome (brackets, typography, grid, mono labels)
- Elsye's motion language (scroll-driven, GSAP, parallax, text reveals)
- His own identity (cyan accent, System OS concept, real data)

---

### TIP-13 · For build-idea / design exploration tasks

These go in `.agent/Build-Idea/`. They are standalone prototypes, NOT part of
the main portfolio codebase. Rules:

- Single self-contained HTML file (all CSS and JS inline/CDN)
- Must open by double-clicking in a browser — no build step
- Use CDN for libraries: Google Fonts, GSAP, Splide, etc.
- Use Dex's real information (from `Dex.md`), not placeholders
- Dark mode always, near-black background
- Naming: `dex-landing-v1.html`, `dex-dashboard-v2.html`, etc.
- These are creative explorations — be ambitious, not conservative

---

## 7. SESSION LOG — Ongoing Recap

Each AI session should add a brief entry here after completing work.
Format: date, AI used, what was done, what was learned (good or bad).

---

### 2026-04-17 — Claude Opus 4.6

**Work done:**
- Created `dex-landing-v1.html` in `.agent/Build-Idea/` — a standalone landing page
  combining the design DNA of Bohdan (corner brackets, massive type, 12-col grid,
  glassmorphism, mono labels) and Elsye (GSAP ScrollTrigger, scroll-driven word
  reveals, sticky phrase sections, parallax, fluid rem scaling, editorial labels)
- Subject: Dex Bennett — Creative Technologist, using real data from `Dex.md`
- Sections: Hero (massive "DEX BENNETT"), Manifesto (word-by-word reveal), Identity
  (stats + cards), Sticky Phrase, Projects (row list), Spotlight (Sowan.id feature),
  Arena (competition cards), Signal (contact channels), Footer

**Key technique — design reference extraction:**
- Both reference files were too large to read at once (1MB+ Framer export, 3600-line Webflow export)
- Used parallel subagents to extract design DNA from each file independently
- Each subagent read the file in 500-line chunks and produced a comprehensive analysis
- Then synthesized the two analyses into a combined design, adapted for Dex's identity

**Updated Protocol.md with:**
- Section 5: "How to Actually Work with Dex" — teaching any AI model (MiniMax, Gemini, Qwen, etc.) how to understand Dex's communication style, handle design reference tasks, manage tasks above their capability, and what quality signals Dex looks for
- Section 5.2: The complete design reference extraction workflow
- Section 5.4: Quality comparison table (good vs mid output)
- TIP-11 through TIP-13: Design reference handling, Bohdan/Elsye summaries, build-idea task rules

**What future AI should know:**
- Dex communicates naturally (mixed ID/EN), expects you to infer real intent
- Design reference files are for extraction, NEVER for code copying
- "Give it soul" means motion + interactivity + authentic identity, not flashy effects
- Dark mode + monospace + tight tracking + system-OS language = Dex's aesthetic DNA
- If a task is above your capability, say so — Dex respects honesty over broken output

---

### 2026-04-16 — Claude Sonnet 4.6

**Work done:**
- Added EURECA Top 15 Semifinalist certificate to portfolio (Arena Records + Sowan.id card update)
- Built System Boot landing page overlay (`#lp-overlay`) — full-screen before dashboard
  - Elements: badge, massive DEX/BENNETT typography, descriptor, footer, scan beam, boot bar, aurora orbs
  - Design refs: `bohdan_design.html` (massive type, blur badge) + `elsye-residence.html` (slide-from-below, hero split)
- Fixed 3 animation bugs (see below)

**Bugs found and fixed:**
- BAD-01: `var(--ease-out)` in animation shorthand → silently drops animations
- BAD-02: CSS `transition` for exit → instant cut, unreliable on fixed elements
- BAD-03: `animation: none` in reduced-motion block → entire portfolio static for Dex (his Windows has Animation Effects OFF)

**Key diagnostic technique:**
Added `window.matchMedia('(prefers-reduced-motion: reduce)')` check in JS
with a console.warn — immediately revealed root cause without extensive debugging.

**Files created/modified:**
- `taste-express/public/css/landing.css` (new)
- `taste-express/public/index.html` (landing overlay HTML + script)
- `taste-express/public/css/main.css` (added @import landing.css)
- `.agent/WALKTHROUGH.md` (EURECA cert update + session log)
- `.agent/AI-HANDOFF.md` (date + cert note)
- Cert files: `public/certificates/` + `public/images/certificates/`

**Commits pushed:** `64cfe4b`, `3875f08`, `8c6ae40`, `ca137df`, `bdc7911`

---

*Add new session entries above this line, in reverse-chronological order.*
*Keep entries factual and brief. Focus on what future AI needs to know.*
