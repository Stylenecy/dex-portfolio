# CLAUDE.md — Project Context for AI Assistants

Sebelum ngapa-ngapain, baca file-file ini (urutan ini penting):
1. `.agent/Protocol.md` — **WAJIB PERTAMA** — known bugs, traps, good patterns, session log
2. `.agent/AI-HANDOFF.md` — arsitektur, design system, aturan CSS, state terkini
3. `.agent/Dex.md` — siapa Dex, cara dia mikir, preferensinya

Kalau mau tau full history dan pending tasks: `.agent/WALKTHROUGH.md`

---

## Workflow rules

- **Progress tracking:** Gunakan TaskCreate/TaskUpdate (atau checklist internal) untuk setiap sesi kerja. Mark task sebagai in_progress saat mulai, completed saat selesai.
- **Git commit:** Hanya commit kalau satu progres/fitur sudah benar-benar complete — bukan setiap kali ada perubahan kecil. Satu commit = satu unit kerja yang meaningful dan bisa berdiri sendiri.

## Critical rules (jangan dilanggar)

- **Font:** `var(--font-sans)` / `var(--font-mono)` — jangan hardcode nama font
- **Shadow:** pakai token (`var(--shadow-sm)` dll) — jangan tulis raw box-shadow
- **Warna di component:** `var(--hub-accent)` dll — jangan hardcode hex
- **`main.css`** = pure manifest, jangan tambah style di sana
- **Hub IDs** (`#hub-system-core` dll) jangan diubah — router.js bergantung padanya

## Working directory
`taste-express/public/` — static site. HTML + CSS modular + Vanilla JS.

---

## Antigravity agent — Deployment & Git

Tugas Antigravity: bantu Dex push ke repo dan pastikan Vercel update.

### Cara kerja auto-deploy (pahami ini dulu)
Repo GitHub (`https://github.com/Stylenecy/dex-portfolio`) sudah terhubung ke Vercel.
**Setiap `git push origin main` = deployment baru otomatis di Vercel.** Tidak perlu command Vercel tambahan.
Setelah push, Vercel build dalam ~1-2 menit → langsung live di `dex.web-portofolio.com`.

### Flow deploy yang benar
1. Pastikan semua perubahan sudah di-stage: `git status`
2. Stage file yang relevan (jangan `git add -A` sembarangan — cek dulu ada file sensitif tidak)
3. Commit dengan pesan yang jelas dan meaningful (satu commit = satu unit kerja selesai)
4. Push: `git push origin main`
5. Selesai — Vercel handle sisanya otomatis

### Format commit message
```
type: deskripsi singkat apa yang berubah

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
Type yang dipakai: `feat` (fitur baru), `fix` (bugfix), `style` (visual/CSS), `refactor`, `chore` (file/config).

### Jangan commit kalau
- Fitur/perubahan belum complete (setengah jalan)
- Ada file `.env` atau credential masuk staging
- Belum dicek di browser dulu
