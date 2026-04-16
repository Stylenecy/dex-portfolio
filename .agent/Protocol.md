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

## 5. TIPS FOR ANY AI (especially lower-capability models)

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

## 6. SESSION LOG — Ongoing Recap

Each AI session should add a brief entry here after completing work.
Format: date, AI used, what was done, what was learned (good or bad).

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
