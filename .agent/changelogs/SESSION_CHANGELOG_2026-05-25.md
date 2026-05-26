# Session Changelog — 2026-05-25
**AI:** Claude Sonnet 4.6
**Proyek:** Dex Bennett // System OS Portfolio

## Apa yang Berubah

### Protocol & System
- **Universal-Project-Protocol.md Section 5** (baru) — Rule wajib Session Changelog setelah setiap sesi restrukturisasi besar
- **Portfolio Protocol.md Section 7** (baru) — Rule yang sama, spesifik untuk portofolio. Old Section 7 (Session Log) → Section 8.
- **`.agent/changelogs/`** — Folder baru dibuat. File ini adalah changelog pertama.

### Konten Portfolio (index.html)
- **Sowan.id Mission Log** — Rewrite total. Lama: "bridging local businesses and digital markets" (tidak akurat). Baru: EduTech sesepuh platform, CTO role, Next.js 16 + TypeScript + Tailwind v4 + Vercel, hasil KSE Juara 1 + EURECA Top 15.
- **Command Deployments** — +4 cards baru (semua placeholder SVG, belum ada cert image):
  - CTO Sowan.id (Apr 2026 – Active)
  - Fullstack Dev Intern — Synapse Labs · AFED × BPD HIPMI DIY (Feb–May 2026)
  - Tim Desain & IT — Peran Gendis · SriKandi UGM (2026 – Active)
  - Student Staff — PPB UKDW (Sep 2025 – Active)
- **Arena Records** — +2 cards baru:
  - KSE JUARA 2026 🥇 1st Place Champion (placeholder, cert pending dari panitia)
  - UKRIDA Solve-It 2026 ⏳ Pending Result (Sowan: Bahasa Mama, submitted malam ini)
- **Timeline** — +3 entries baru:
  - 2026: CTO Sowan.id + KSE JUARA 1st Place
  - 2026: Synapse Labs Fullstack Intern
  - 2025: Research Assistant Kaprodi SI UKDW (VR Inclusive Tourism)
- **Metrics row** — Command Clearances 5 → 9, Organizations "BPMFTI·HMSI·ISCD·IMT·GKKK" → 9+ (list diupdate ke Sowan/Synapse/Peran Gendis/PPB/BPMFTI)
- **Archives posters** — +Wallpaper.png (dari `.agent/Bahan_Poster/`, dicopy ke `public/images/gallery/posters/`)

### Commits
- `af529d2` — docs+fix: Protocol.md Section 5 (Dex workstyle guide) + Victus label fix
- `d698ad6` — docs: add Session Changelog rule + first changelog file
- `7c6a478` — feat: major portfolio content update — new roles, projects, arena records

## File Dimodifikasi
- `taste-express/public/index.html` — dimodifikasi (Sowan.id + 4 command cards + 2 arena cards + 3 timeline entries + metrics + Wallpaper gallery)
- `taste-express/public/images/gallery/posters/Wallpaper.png` — **dibuat** (dicopy dari .agent/Bahan_Poster/)
- `.agent/Protocol.md` — dimodifikasi (Section 5 Dex workstyle + Section 7 changelog rule + session log entry 2026-05-25)
- `.agent/changelogs/SESSION_CHANGELOG_2026-05-25.md` — **dibuat** (file ini)
- `D:\AT Kuliah\All of Project\_Dex-Brain\Universal-Project-Protocol.md` — dimodifikasi (Section 5 changelog rule)
- `D:\AT Kuliah\All of Project\_Dex-Brain\Dex-Core.md` — dimodifikasi (portfolio entry updated)

## Yang Perlu Dex Tahu
- **KSE card masih placeholder** — begitu ada foto tim (Dex, Imeldya, Adriel) dari panitia, swap ke `ops-cert-card__thumb` img. Cert sedang diproses.
- **UKRIDA "Pending Result"** — update ke hasil sebenarnya begitu pengumuman keluar. Edit label di Arena Records: cari `⏳ Pending Result` dan ganti.
- **WALKTHROUGH.md dan AI-HANDOFF.md belum diupdate** — masih menunjukkan date 2026-04-16. Update di sesi berikutnya.
- **Sowan.id source of truth**: `D:\AT Kuliah\All of SOWAN Business Plan\Sowan-App\SOWAN-Business-Deck.md`
