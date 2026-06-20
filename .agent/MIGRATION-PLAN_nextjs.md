# Portfolio Rebuild — Next.js Migration Plan
> Mulai: 2026-06-04 · Branch: `next-migration` · Driver: Claude (Opus 4.8, Max effort) + Dex
> Konteks penuh: `.agent/audits/PORTFOLIO-AUDIT_2026-06-04.md`
> **Status: 🟡 IN PROGRESS** — lihat checklist §6.

---

## 1. Keputusan (locked)

- **Migrasi ke Next.js**, bukan iterate vanilla. Alasan: benerin 3 masalah struktural yang vanilla nggak bisa (file 3000-baris, no SEO/deep-linking, perf) + Next.js = stack asli Dex (Sowan/Peran Gendis) = the medium IS the message.
- **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind v4 + pnpm. Lokasi: `web/` (subfolder, branch `next-migration`).
- **Bukan rebuild from scratch** — design system (token, shadow, hub accent, Questism stat block) di-**port verbatim**. Yang berubah = rumahnya (struktur), bukan jiwanya.
- **Safety:** kerja di branch `next-migration` → Vercel auto preview deploy → verify → merge ke `main` pas beres. Live site (`main`) nggak kesentuh sampai siap.

## 2. Arsitektur

### Routing — real routes (ini inti deep-linking)
Router lama = hash-swap client-side (`#system-core`), semua hub render sekaligus (display:none). Ganti ke **App Router real routes**:
- `/` → boot/landing overlay ("INITIALIZE SYSTEM") → masuk shell
- `/system-core` · `/operations` · `/operator-metrics` · `/archives` → tiap hub = route sendiri
- Shell (sidebar + dock + background) di `layout.tsx` → persist antar route, nggak re-render
- Transisi hub exit/enter pakai `template.tsx` + motion (preserve animasi OS feel)
- **Hasil:** tiap hub (nanti tiap project) punya URL share-able. Klaim "explorable OS" jadi nyata. SEO/OG per route.

### Content — data-driven (ini inti maintainability)
Berhenti hand-write tiap card di HTML. Definisikan data → render via komponen:
- `data/profile.ts` · `data/deployedModules.ts` (5 web app live) · `data/missions.ts` · `data/roles.ts` (command deployments) · `data/certs.ts` · `data/arena.ts` · `data/timeline.ts` · `data/gallery.ts` · `data/skills.ts`
- Update konten = edit 1 object, bukan nyari di 3000 baris. Showcase 5 app live = trivial.

### Styling
- Token system (`variables.css`) → `styles/tokens.css`, port **verbatim** (CSS custom properties, bukan dirombak ke Tailwind utilities — biar fidelity 100%).
- Component CSS (cards/dock/sidebar/stat-block/timeline/hubs) → CSS Modules per komponen ATAU global partials. Port faithful, improve pas port.
- Tailwind v4 tersedia buat layout util baru, tapi soul ada di CSS bespoke.
- Fonts via `next/font/google`: Inter + Geist Mono (self-hosted, no FOUT, no render-block).

## 3. Yang DIPRESERVE (jangan dibuang)
- Token registry (5-level bg, shadow multi-layer, hub accent cascade, easing `cubic-bezier(0.2,0.8,0.2,1)`)
- Questism RPG stat block (rank chips, 7-segment meters, AWAKENED glitch) — satu-satunya momen ber-soul
- Dock (glass pill, radar-pulse per-hub, magnification)
- Sidebar operator profile (brand, avatar corner-frame, phase tracker, stats, socials, signature)
- Boot overlay (massive name, "INITIALIZE SYSTEM")
- Accessibility (skip-link, aria, alt, reduced-motion)

## 4. Yang BERUBAH / DIPERBAIKI (saat port)
- **Konten realita:** +5 web app live (Quinn/EduFin/GroundsToGrow/KKN/Peran Gendis) sebagai "Deployed Modules" clickable · headline Sowan CTO+KSE Juara 1 · UKRIDA "Pending"→"Top 10 Finalist" · fix 2 link mati Retail · Mantle=Documentator jujur · Synapse link · KSE cert.
- **Fitur AI signature:** "Ask the Operator" — `app/api/chat/route.ts` native (no vercel.json hack). Dual persona (first/third person toggle). Persona curated (`lib/persona.ts`), Dex-Core.md NGGAK PERNAH masuk. Guardrail privasi §7/Angel/secret. Detail: audit §4.
- **Desain:** bunuh aurora blob → grain + precise type + motion-on-interaction (cara daveos) · berani-in tipografi (Geist Mono gede sebagai hero gesture, cara bohdan) · variasi layout antar hub (bukan cuma hue) · color-as-meaning.
- **Perf:** `next/image` buat 39 img (FIX gambar 6–9MB!) · code-split per route · lazy hub · kurangin backdrop-filter di elemen animasi.
- **SEO:** metadata per route + OG tags + sitemap.

## 5. Folder Structure (target)
```
web/
  app/
    layout.tsx              # root: fonts, OS shell (sidebar+dock+bg), metadata
    page.tsx                # boot/landing → entry
    template.tsx            # hub transition wrapper
    (hubs)/
      system-core/page.tsx
      operations/page.tsx
      operator-metrics/page.tsx
      archives/page.tsx
    api/chat/route.ts       # AI "Ask the Operator"
  components/
    shell/      # Sidebar, Dock, Background, BootOverlay
    hubs/       # SystemCore, Operations, OperatorMetrics, Archives sections
    cards/      # MissionCard, DeployedModuleCard, CommandCard, CertCard, ArenaCard, TimelineItem
    stat/       # StatBlock (Questism)
    console/    # AskTheOperator
  data/         # see §2
  lib/          # persona.ts, utils
  styles/       # tokens.css + component CSS (ported)
  public/images # OPTIMIZED (current 6-9MB → compress)
```

## 6. Phased Checklist
- [x] **F0.0** Branch `next-migration` + scaffold Next.js di `web/` (Next 16.2.7, React 19.2.4, Tailwind v4, pnpm)
- [x] **F0.1** Design system ported + **verified live (HTTP 200)** — `styles/*` (whole CSS copied), `globals.css` flat-import manifest, Inter+Geist Mono via next/font, image url() paths → `/images/`. Dev runs `pnpm --dir web dev`.
- [x] **F0.2** Root layout = OS shell (Sidebar + Dock + Background grain) + boot overlay + hub routing + transitions
- [x] **F1.0** Data layer (`data/*.ts`) — extract + correct semua konten (realita, bukan stale)
- [x] **F1.1** Hub: System Core (skills + Mission Log + **Deployed Modules grid** 5 app live)
- [x] **F1.2** Hub: Operations (command deployments + certs + arena + timeline) — fix UKRIDA/KSE/Mantle
- [x] **F1.3** Hub: Operator Metrics (Questism stat block + bio)
- [ ] **F1.4** Hub: Archives (gallery + posters + YouTube + IG) — next/image  ← stub, images pending compress
- [x] **F2.0** AI "Ask the Operator" — persona curate + privacy audit + api/chat + UI console
- [x] **F3.0** Design overhaul — Phase 1+1b DONE (warm graphite material, de-glass, hero codename, vignette/grain). Arah: Quiet×Awakened hybrid. Detail: `.agent/audits/F3-DESIGN-DIRECTIONS_2026-06-10.md`.
- [x] **F4.0** MASTERPIECE PASS (20 Jun, effort MAX) — full detail: `.agent/changelogs/SESSION_CHANGELOG_2026-06-20.md`:
  - Konten truth (data/*.ts): purge "CTO"→Platform Builder; buang fabrikasi (Data Lab Indonesia→Dialog Lintas Iman, Bahasa Mama, 183K, physical 182/60); Sowan→cross-gen EduTech; +UKRIDA Top10 +HAKI; stats (SPEED B, +VISION=S); +3D/Spatial skill; +RA/TA/BPM; +MLBB. (flags `// TODO(dex)` utk yg unverified)
  - Motion+3D: `components/fx/TiltLayer.tsx` (cursor-tilt engine, delegated, reduced-motion+coarse-pointer guard) + `styles/fx.css` (sheen, FLARE edge); tilt di arsenal/mission/cert/role card.
  - Transitions: `PageTransition.tsx` (route cross-dissolve) + RevealObserver stagger + reveal pakai translate/scale/filter (tilt-safe) + fade/blur/expo.
  - **Preloader sinematik** `Preloader.tsx`+`preloader.css` (Moneta lineage → cyan/void: rings/core/dashed-orbit/hex-emblem/number-arc 0-100/dots/corner-brackets/boot-log, chunked progress, INITIALIZE@100, click-skip, reduced-motion). Ganti BootOverlay di `/`.
  - **WebGL** `AmbientField.tsx` — R3F Points field behind hubs (1800 pts, dpr≤1.5, hub-accent tint, parallax, reduced-motion unmount).
  - Craft: ::selection per-hub + custom scrollbar. Deps +framer-motion +three +@react-three/fiber +drei.
  - VERIFIED: tsc clean, 5 route 200, screenshots OK. Motion butuh browser asli (Dex eyeball pending).
- [ ] **F1.4** Archives — masih stub, BLOCKED 209MB PNG (kompres dulu).
- [ ] **F3.1** SEO/OG/metadata + image optimization pass
- [ ] **F4.1** Deploy: Vercel root dir = web, GEMINI_KEY env, sharp:true + `pnpm install --force`, preview verify → merge main

## 7. Deploy plan
- Vercel project existing → set **Root Directory = `web`** (dashboard) saat siap. ATAU restructure ke root di akhir.
- `GEMINI_KEY` (BARU, jangan reuse KKN) di Vercel env Prod+Preview.
- Branch push → preview URL → verify → merge `main` (auto prod deploy).
- Old `taste-express/` = arsip referensi sampai merge, lalu archive (jangan hapus — Protocol §8).

## 7b. Build traps hit (jangan diulang)
- **pnpm 11.3 build gate:** `next dev` gagal exit 1 karena native builds (`sharp`,`unrs-resolver`) "ignored". Fix di `web/pnpm-workspace.yaml` → `allowBuilds: { sharp: false, unrs-resolver: false }` (boolean, BUKAN placeholder string — pnpm re-inject stub kalau bukan bool). Sebelum deploy: `sharp: true` + `pnpm install --force` buat next/image.
- **CSS @import order:** globals.css harus PURE `@import` (no trailing rule) + string-form (`@import "../styles/x.css"`, BUKAN nested `@import url()` di main.css) — kalau enggak Lightning CSS error "@import must precede all rules". Font override taruh di file `font-bridge.css` di-import terakhir.
- **CSS image paths:** url() di CSS lama `../images/...` → ganti `/images/...` (Next serve `public/` dari root). Cuma landing.css kena.
- **Turbopack HMR stale:** ubah file dalam rantai @import kadang ga invalidate — touch `globals.css` buat force re-eval.

## 8. Open items / decisions Dex
- Case-study penuh: 3 max v1 → GroundsToGrow + Quinn + Sowan (sisanya grid clickable). [default, bisa diubah]
- Image optimization: compress 6-9MB sources sebelum commit (next/image tetap perlu source waras).
- Domain: tetap dex-portfolio.vercel.app / custom?
