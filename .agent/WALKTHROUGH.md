# WALKTHROUGH — Dex Bennett // System OS Portfolio

> **Last Updated:** 2026-04-11 (ALL HUBS COMPLETE — Full content implementation done)
> **Current Phase:** Phase 4 — Polish & Refinement
> **Narrative Direction:** "The Operator" — Full Questism/System OS aesthetic
> **Status:** 🟢 All 4 Hubs Populated (optional polish items remaining)

---

## 📋 TABLE OF CONTENTS

1. [Vision & Narrative](#1--vision--narrative)
2. [Current Architecture](#2--current-architecture)
3. [Hub-by-Hub Content Plan](#3--hub-by-hub-content-plan)
4. [Certificate Registry (Bahan_Sertifikat)](#4--certificate-registry)
5. [External Links & Media](#5--external-links--media)
6. [Update Log](#6--update-log)
7. [Pending Tasks](#7--pending-tasks)

---

## 1. 🎯 VISION & NARRATIVE

### Core Concept: "The Operator"

The entire portfolio is framed as a **System OS Dashboard** — inspired by Webtoon's **Questism**. Dex isn't just showing a portfolio; he IS the system. Every piece of content is wrapped as system data:

| Real World | System OS Translation |
|------------|----------------------|
| Sertifikat | `Clearance Certificates` |
| Projects | `Deployed Modules` |
| Organizations | `System Affiliations` |
| Events | `Operations Logs` |
| Gallery (Photo/Video/Design) | `Archived Assets` |
| YouTube Channel | `Broadcast Uplink` |
| Instagram | `Visual Transmitter` |
| Skills | `Interface Modules` |
| Contact Info | `Signal Frequencies` |
| Leadership Roles | `Command Deployments` |
| Competitions | `Arena Records` |

### Tone
- **Immersive** — feels like you're looking at a real system interface
- **Gamified** — stats, ranks, levels, clearances
- **Authentic** — behind the system aesthetic, the real Dex shines through
- **Warm but nerdy** — not cold/robotic, but enthusiastically technical

### Color Coding Per Hub
Each hub has its own accent color for the cascade theme:
- **System Core** → Cyan `#64d2ff` (tech/code)
- **Operations** → Purple `#8b5cf6` (leadership/strategy)
- **Operator Metrics** → Orange `#fb923c` (physical/stats)
- **Archives** → Green `#4ade80` (history/gallery)

---

## 2. 🏗 CURRENT ARCHITECTURE

### Project Structure
```
dex-portfolio/
├── taste-express/              ← MAIN PROJECT (this walkthrough)
│   ├── index.js                ← Express 5 server
│   ├── package.json
│   └── public/
│       ├── index.html          ← Single-page dashboard (2200+ lines)
│       ├── css/
│       │   ├── main.css        ← Import manifest
│       │   ├── variables.css   ← Design tokens
│       │   ├── reset.css       ← Zero-state
│       │   ├── aurora.css      ← Ambient background
│       │   ├── glassmorphism.css
│       │   ├── layout-dashboard.css
│       │   ├── utilities.css
│       │   ├── components/     ← sidebar, dock, stat-block, cards, timeline
│       │   └── hubs/           ← system-core, operations, operator-metrics, archives
│       ├── js/
│       │   ├── router.js       ← Hub switching engine
│       │   └── modules/        ← gallery-lightbox.js, stat-counter.js
│       └── images/
├── .agent/
│   ├── Bahan_Sertifikat/       ← 37 certificate files (PDF + images)
│   └── FE-idea/                ← Reference project (Ryvyn Protocol)
└── README.md
```

### Completed Refactoring (2026-04-11)
- ✅ Deleted 1,660 lines of dead code (style.css, main.js)
- ✅ Extracted 35+ inline styles to proper CSS classes
- ✅ Fixed CSS duplication, scrollbar conflicts, dead classes
- ✅ Created SVG sprite sheet (15 icons defined)
- ✅ Fixed IntersectionObserver memory leak in router.js
- ✅ Added prefers-reduced-motion support throughout
- ✅ Added skip-to-content link (a11y)
- ✅ Fixed text-muted contrast for WCAG AA
- ✅ Server polish: env PORT, start/dev scripts, 404/error handlers
- ✅ Created gallery-lightbox.js and stat-counter.js modules

---

## 3. 📡 HUB-BY-HUB CONTENT PLAN

### HUB 1: // SYSTEM_CORE (Cyan)
**Current State:** Has arsenal grid (4 skill cards) + Mission Log (2 projects: Lumina.EDU, Retail Core) + Contact section

**What Needs Work:**
| Element | Current | Target |
|---------|---------|--------|
| Arsenal Grid | ✅ 4 cards with tech stacks | Keep, maybe add more detail |
| Mission Log | 2 projects (Lumina.EDU, Retail) | Add more projects if available |
| Contact Section | "Initialize Connection" — described as "kacau" | **REDESIGN NEEDED** — make it cleaner, more thematic |

**"Initialize Connection" Redesign Plan:**
- Replace current messy contact section with a clean "Signal Frequencies" panel
- Layout: glass card with rows for each contact method
- Each row: [icon] [label] [value] [copy/action button]
- Items: Email, GitHub, LinkedIn, Instagram
- Keep the "SIGNAL ACTIVE" blinking indicator — it fits the aesthetic
- Make the email CTA button clean and prominent

---

### HUB 2: // OPERATIONS (Purple)
**Current State:** Has featured role card (KFC Tournament), 3 event cards (FTI Mendengar #3, BPMFTI Aspirasi, DIBARSI), timeline (2026, 2025)

**What Needs Work — MAJOR CONTENT UPDATE:**

#### A. Achievement Showcase (Grouped by Category)

**GROUP 1: Command Deployments (Leadership Roles)**
| Certificate | Role | Organization | Year |
|-------------|------|-------------|------|
| Sekretaris ISCD | Secretary | ISCD | — |
| HMSI | Member/Role | Himpunan Mahasiswa Sistem Informasi | — |
| DIBARSI | Chairman | Diskusi Bareng Sistem Informasi | — |
| Koor Humas FTI-Camp | Public Relations Coordinator | FTI Camp | — |
| Anggota IMT | Member | IMT | — |

**GROUP 2: Operations Logs (Events & Participation)**
| Certificate | Event | Role | Year |
|-------------|-------|------|------|
| FTI Camp | FTI Camp | Coordinator | — |
| Berbagi Kasih | Berbagi Kasih | Participant | — |
| DILUSI | DILUSI Program | Participant | — |
| DLI / DLI_24 | DLI Program | Participant | 2024 |
| FTI FEST Typing Contest | FTI FEST Typing Contest | Competitor | — |
| Imlek IMT x BOSA | Chinese New Year Event | Participant/Staff | — |
| Imlek IMT x BOSA 2.0 | Chinese New Year Event v2 | Participant/Staff | — |
| Peh Cun | Peh Cun / Dragon Boat | Participant | — |
| PeDas APTIKOM | PeDas APTIKOM | Participant | — |
| PBTY | PBTY Program | Participant | — |
| SAP | SAP Program | Participant | — |
| SmartPath | SmartPath Program | Participant | — |
| Sui GTC | Sui GTC | Participant | — |
| Talk Show KaMu | Talk Show KaMu | Participant | — |
| WoW | WoW Program | Participant | — |
| ICE | ICE Event | Participant | — |
| FTI+ Coca Cola | FTI x Coca Cola | Participant | — |
| FTI+ DANA | FTI x DANA | Participant | — |

**GROUP 3: Arena Records (Competitions)**
| Certificate | Competition | Result | Year |
|-------------|-------------|--------|------|
| Juara Harapan III Victus Campus Heroes | Valorant Tournament Yogyakarta | **3rd Place** | — |
| Turnamen Valorant | Valorant Tournament | Participant | — |

#### B. Timeline Integration
The existing timeline needs to be EXPANDED to include ALL events from certificates, ordered chronologically where dates are known:

```
2026 (Upcoming) — Chairman KFC Tournament
2025 — Coordinator Aspirasi BPMFTI, FTI Mendengar #3
2024 — DLI_24, various events
— Add more as dates are identified
```

**Design Approach:**
- Top of Operations: Featured Role Card (keep KFC Tournament)
- Below: 3-column bento grid for the 3 groups
- Each group: scrollable card list with certificate preview thumbnails
- Bottom: Expanded timeline showing full journey

---

### HUB 3: // OPERATOR_METRICS (Orange)
**Current State:** Power Banner, RPG Stat Block, Bio Fragment, Physical Table, Endurance Grid, Activity Log

**Status:** ✅ **User loves this as-is.** Questism vibes achieved.

**Potential Future Enhancements (low priority):**
- Animate stat numbers with stat-counter.js module
- Add more activity log entries
- Add "System Affiliations" mini-panel showing org memberships
- Power score could be a fun calculated value

---

### HUB 4: // ARCHIVES (Green)
**Current State:** Empty placeholder "Coming Soon" cells

**What Needs Work — FULL BUILD:**

#### Media Gallery — Tabbed Layout

**TAB 1: Design Assets (Poster & Visual Works)**
- Display poster designs and visual creations
- Grid/masonry layout with lightbox preview
- Each item: thumbnail + title + date

**TAB 2: Photography (Lightroom Edits)**
- Before/after photo comparisons
- Masonry gallery with lightbox
- Edit details/camera info as captions

**TAB 3: Broadcast Uplink (YouTube)**
- Embedded YouTube videos from channel
- Channel link: `youtube.com/channel/UCJuSrzhIrZxb7qPOZwAvA8Q/featured`
- Featured videos with descriptions

**TAB 4: Visual Transmitter (Instagram)**
- Instagram grid preview
- Link: `instagram.com/dex.bennett`
- Maybe embed recent posts or link out

**Design Approach:**
- Replace current placeholder bento with tabbed gallery interface
- Tab buttons styled as system toggle pills
- Each tab has its own content type (images, embeds, links)
- Lightbox for image viewing (already built in gallery-lightbox.js)

---

## 4. 📜 CERTIFICATE REGISTRY

### Source: `.agent/Bahan_Sertifikat/`
**Total Files:** 37 (mix of .pdf, .png, .jpg)

### Categorized Inventory

#### 🎖️ LEADERSHIP / ROLES (Clearance Class: COMMAND)
| File | System Name | Category |
|------|------------|----------|
| Sekretaris ISCD.pdf + .png | ISCD Secretary Protocol | Command |
| HMSI.pdf + .png | HMSI System Affiliation | Command |
| DIBARSI.pdf | DIBARSI Command Log | Command |
| Koor Humas FTI-Camp.pdf + .png | FTI-Camp Comms Officer | Command |
| Anggota IMT.pdf + .jpg | IMT Clearance Badge | Command |

#### 📋 EVENTS / PARTICIPATION (Clearance Class: OPERATIONS)
| File | System Name | Category |
|------|------------|----------|
| Berbagi Kasih.pdf + .png | Operation: Berbagi Kasih | Operations |
| DILUSI.pdf + Sertif Peserta.pdf | DILUSI Protocol | Operations |
| DLI.pdf + DLI_24.pdf | DLI Uplink (2024) | Operations |
| FTI Camp.pdf | FTI Camp Deployment | Operations |
| FTI FEST Typing Contest.pdf + .png | Typing Arena | Operations |
| Imlek IMT x BOSA.pdf + .jpg + 2.0 | Lunar New Year Ops | Operations |
| Peh Cun.pdf + _comp.pdf | Peh Cun Protocol | Operations |
| PeDas APTIKOM.pdf | PeDas APTIKOM | Operations |
| PBTY.pdf + _comp.pdf | PBTY Protocol | Operations |
| SAP.pdf | SAP Clearance | Operations |
| SmartPath.pdf + .png | SmartPath Navigation | Operations |
| Sui GTC.pdf | Sui GTC Protocol | Operations |
| Talk Show KaMu.pdf | Talk Show KaMu | Operations |
| WoW.pdf | WoW Protocol | Operations |
| ICE.pdf | ICE Event | Operations |
| FTI+ Coca Cola.jpg | FTI × Coca Cola Link | Operations |
| FTI+ DANA.jpg | FTI × DANA Link | Operations |

#### 🏆 COMPETITIONS (Clearance Class: ARENA)
| File | System Name | Category |
|------|------------|----------|
| Juara Harapan III Victus Campus Heroes.pdf | Arena Record — 3rd Place Victus | Arena |
| Turnamen Valorant.png | Valorant Arena Log | Arena |

### File Type Legend
- `.pdf` = Primary certificate document (can't read content, but can use as download link)
- `.png` / `.jpg` = Image preview (can display as thumbnail/preview)

### Usage Strategy
- PDFs → linked as download/view targets ("View Certificate" → opens PDF)
- Images → used as card thumbnails/previews in the showcase
- Names derived from filenames → displayed as certificate titles

---

## 5. 🔗 EXTERNAL LINKS & MEDIA

| Platform | URL | System Name | Hub |
|----------|-----|-------------|-----|
| YouTube | `youtube.com/channel/UCJuSrzhIrZxb7qPOZwAvA8Q/featured` | Broadcast Uplink | Archives |
| Instagram | `instagram.com/dex.bennett` | Visual Transmitter | Archives |
| GitHub | (existing in sidebar) | Code Repository | System Core |
| LinkedIn | (existing in sidebar) | Professional Network | System Core |
| Email | dex.bennett28@gmail.com | Signal Frequency | System Core |
| Lumina.EDU Canva | (existing in Mission Log) | Concept Deck | System Core |

---

## 6. 📝 UPDATE LOG

### 2026-04-11 — Architecture Refactoring
**Author:** AI Assistant (Qwen Code)
**Scope:** Foundation cleanup & polish

**Changes:**
- Removed 1,660 lines of dead code
- Extracted 35+ inline styles to CSS classes
- Fixed CSS architecture (duplication, conflicts, dead code)
- Created SVG sprite sheet (15 icons)
- Fixed router.js memory leak + added reduced motion support
- Added accessibility features (skip link, contrast fix, motion guards)
- Polished Express server (env PORT, start/dev scripts, error handlers)
- Created gallery-lightbox.js and stat-counter.js modules
- Created this Walkthrough document

**Status:** ✅ Complete

### 2026-04-11 — Content Implementation: System Core + Operations *(COMPLETED)*
**Author:** AI Assistant (Qwen Code)
**Scope:** Contact redesign, full certificate showcase, expanded timeline

**Changes:**
- **System Core — "Signal Frequencies":** Replaced broken "Initialize Connection" with clean glass card. Frequency rows for Email, LinkedIn, GitHub, Instagram. YouTube + Canva as secondary links. New CSS throughout.
- **Operations — Certificate Showcase (3 groups):**
  - **Command Deployments (5):** Sekretaris ISCD, Koor Humas FTI-Camp, DIBARSI, HMSI, IMT
  - **Operations Logs (20):** FTI Camp, FTI FEST, SmartPath, DILUSI, Berbagi Kasih, DLI, Imlek IMT, Peh Cun, PeDas APTIKOM, PBTY, SAP, Talk Show KaMu, Sui GTC, WoW, ICE, FTI+ Coca Cola, FTI+ DANA, + more
  - **Arena Records (2):** Victus Campus Heroes 🏆 3rd Place, Turnamen Valorant
  - Collapsible "Show More Operations" toggle for additional 12 certs
- **Operations — Expanded Timeline:** 6 entries (2026→2023), updated impact metrics
- **Asset Copy:** 12 images + 25 PDFs copied to `public/images/certificates/` and `public/certificates/`

**Status:** ✅ Complete

### 2026-04-11 — Content Implementation: Archives Media Gallery *(COMPLETED)*
**Author:** AI Assistant (Qwen Code)
**Scope:** Full Archives hub — 4 tabbed categories populated

**Changes:**
- **Archives — Tabbed Media Gallery (4 tabs):**
  - **Design (12 posters):** 31 Jan, Banner IMT 2, Class IV Restoration, Cross Wallpaper, Daniel X Youth, Flyer GKKK, Hari Buruh, Hari Pendidikan, HNY, Poster 9 Agust, Poster Nyepi, Poster Profil Penelitian — all with hover overlay showing title + type
  - **Photo (7 Lightroom edits):** CSS masonry column layout with hover saturation/brightness effects
  - **Broadcast (3 YouTube embeds):** Featured video iframes (RIE0r-2pY5Q, _uqo7wyGrGY, 3G8zkGk9maQ) + channel link card to `/featured`
  - **Transmitter (Instagram):** Styled card with icon, description, handle `@dex.bennett`, and "Open Transmitter" CTA
- **New CSS:** `.archives-gallery`, `.archives-tabs`, `.poster-grid`, `.poster-card`, `.photo-masonry`, `.broadcast-grid`, `.broadcast-channel`, `.transmitter-card`
- **Tab Switching JS:** Click-to-switch with fade animation, ARIA roles
- **Asset Copy:** 7 photos + 12 posters copied to `public/images/gallery/`

**Status:** ✅ Complete

---

## 7. ⏳ PENDING TASKS

### ✅ ALL MAJOR CONTENT — COMPLETED
| # | Task | Hub | Status |
|---|------|-----|--------|
| 1 | ✅ "Signal Frequencies" contact redesign | System Core | Done |
| 2 | ✅ Certificate showcase (3 groups, 27 cards) | Operations | Done |
| 3 | ✅ Expanded timeline (6 entries) | Operations | Done |
| 4 | ✅ Archives tabbed media gallery (4 tabs, 22 items) | Archives | Done |
| 5 | ✅ All assets copied to public/ (44 images + 25 PDFs) | Assets | Done |
| 6 | ✅ All CSS written (contact, certificates, tabs, posters, photos, broadcast) | Styles | Done |
| 7 | ✅ Tab switching + collapsible sections JS | Scripts | Done |
| 8 | ✅ WALKTHROUGH.md updated | Docs | Done |

### 🟡 OPTIONAL POLISH (Not urgent)
| # | Task | Hub | Complexity | Notes |
|---|------|-----|-----------|-------|
| 9 | Replace inline SVGs with sprite `<use>` refs | All | Medium | 29 SVGs, performance thing |
| 10 | Stat counter animations on RPG numbers | Operator Metrics | Low | Add `data-target` attrs |
| 11 | Narrative language polish on hub headers | All | Low | More Questism-flavored text |
| 12 | Certificate dates on timeline | Operations | Low | After user uploads to LinkedIn |

### 📋 Future Enhancements (when needed)
- PDF viewer modal (currently opens in new tab)
- Video titles/descriptions for YouTube embeds
- Photo captions/names for Lightroom gallery
- Instagram embedded posts instead of link-out card
- Animated stat counters on RPG stats block

---

## 🎯 DECISIONS TO MAKE

All major content decisions have been implemented. Remaining items are optional polish:

1. **YouTube Titles** — Want real video titles on the embed cards instead of "Featured Video 1/2/3"?
2. **Photo Names** — Want captions on the Lightroom photos?
3. **Certificate Dates** — After LinkedIn upload, can provide dates for timeline refinement.
4. **Narrative Polish** — Want me to rephrase hub headers/descriptions deeper into Questism language?

---

*This document is a living walkthrough. Update it every time the portfolio changes.*
*Next update: After optional polish items or certificate date updates.*
