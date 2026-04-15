# QUICK-START — Dex Portfolio (Paste ini ke AI manapun)

Kamu lagi bantu Dex Bennett ngerjain personal portfolio-nya. Baca ini dulu sebelum ngapa-ngapain.

## Project
Static site — `taste-express/public/`. Single HTML file (~2993 baris), CSS modular, Vanilla JS.
Konsep: **System OS Dashboard** (terinspirasi manhwa Questism). 4 hub: System Core (cyan), Operations (purple), Operator Metrics (orange), Archives (green).

## Aturan CSS yang wajib diikuti
- Font: selalu `var(--font-sans)` atau `var(--font-mono)` — jangan hardcode Consolas/Inter/dll
- Shadow: selalu pakai token — `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-hover-cyan)` dll
- Warna: `var(--hub-accent)`, `var(--hub-accent-dim)`, `var(--hub-accent-border)` — jangan hardcode hex di component CSS
- Jangan tambah style ke `main.css` (itu pure manifest)
- Jangan ubah ID hub (`#hub-system-core` dll) — router.js bergantung padanya
- Easing: `var(--ease-responsive)` untuk hover, `var(--ease-out)` untuk entrance

## File penting
- `css/variables.css` → semua design token (cek ini dulu sebelum tambah apapun)
- `css/layout-dashboard.css` → sidebar, hub headers, bento grid
- `css/components/cards.css` → arsenal cards, mission items
- `css/hubs/[nama].css` → per-hub styles
- `.agent/WALKTHROUGH.md` → full history & pending tasks
- `.agent/Dex.md` → siapa Dex (baca ini kalau perlu nulis konten)

## State terakhir (2026-04-15)
Semua 4 hub content-complete. Visual overhaul selesai (Inter + Geist Mono fonts, multi-layer shadow system). Yang belum: tambah project Sowan.id & VR Inclusive Tourism ke Mission Log, stat counter animations.

## Dex
Creative Technologist, bukan coder biasa. Vibe-coder yang rely on AI. Dia punya visi, kadang susah ngartikulasiin. Dia mau portfolionya berasa kayak "explore secret system", bukan brosur. Soul > functional.

---
Setelah baca ini, tanya Dex apa yang mau dikerjain hari ini.
