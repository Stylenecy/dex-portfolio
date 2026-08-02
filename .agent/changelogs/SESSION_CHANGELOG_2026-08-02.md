# Session Changelog — 2026-08-02 (Minggu)
**AI:** Claude Opus 5
**Commit:** `d7afa2e` — "feat: rebuild portfolio around verified case studies (v3 Field Notes)"

---

## Ringkasan satu paragraf

Portfolio dibangun ulang dari isi, bukan dari tampilan. Sebelumnya situs ini = dinding
sertifikat + stat RPG (VISION S, power score 74/100) yang tidak bisa dibuktikan. Sekarang
situs ini = tiga studi kasus panjang (LEAP 2036, Space Youth GKKK, Sowan) yang menuliskan
masalah, keputusan, hasil, **dan bagian "apa yang belum beres"** — plus daftar berkas sumber
untuk setiap klaim. Benang merahnya: Dex membangun perangkat lunak untuk orang yang biasanya
dilewati perangkat lunak — lansia, relawan gereja, siswa SMA, orang yang tidak bisa bepergian.

---

## Apa yang Berubah

### Konten
- **Ditambahkan (belum pernah ada di portfolio):** LEAP 2036 (termasuk cerita audit keamanan
  lengkap), Space Youth GKKK, Emitra/BMC #12, peran **Ketua keseluruhan KKN Tematik STEM 2026**
  (59 mahasiswa, 10 kelompok, 7 sekolah, 2.029 siswa), backend skripsi Sowan (8 fungsi `api_*`,
  10 lubang keamanan yang ditutup, split 30/70).
- **Sowan** — dulu 1 kartu "Mission Log"; sekarang studi kasus penuh dengan hasil lomba
  terverifikasi + arsitektur backend + batas yang jujur (escrow simulasi, backend belum jalan).
- **Struktur situs** — dari 4 "hub" dashboard → 4 rute: `/` (kerja), `/work/[slug]` (6 studi
  kasus), `/about`, `/record`.

### Dihapus karena tidak terbukti / salah
| Yang dihapus | Alasan |
|---|---|
| Stat RPG: VISION S, STRENGTH B, POTENTIAL A, power score 74/100, rank A | Karangan. Tidak ada sumbernya, dan merusak kredibilitas semua angka lain di halaman yang sama. |
| "HAKI registration in progress (LPPM UKDW)" | Ditelusuri: cuma muncul di deck lomba + `tracker-original-20260511.md` yang justru menulis *"tidak perlu buru-buru daftar LPPM"*. Tidak ada bukti pengajuan. |
| ~20 tautan `/certificates/*.pdf` | **Semua 404 di produksi.** Folder `web/public/certificates/` tidak pernah ada; hanya 14 `.webp` yang ter-deploy. Sekarang cuma 14 sertifikat itu yang ditampilkan. |
| 7 foto pribadi di galeri | Situs publik, ada wajah orang lain, tidak bisa kuverifikasi izinnya. Poster desain tetap ada (itu karya Dex). |
| `profile.physical.height/weight` (TODO kosong), `tagline` "feel alive" | Placeholder / tidak menambah apa pun. |

### Klaim yang DIVERIFIKASI sebelum ditulis
| Klaim | Sumber |
|---|---|
| Juara 1 BPC KSE Juara Tingkat Nasional 2026, diumumkan **2 Mei 2026**, Medan | `Informasi-Biro/Draft-Artikel-Prestasi-Dex_16Jun.md` (ada nomor sertifikat 0363.05/…), `Competition-KSE/Info-Detail_KSE.txt` |
| Top 15 Semifinalis EURECA 2026, **Universitas Prasetiya Mulya** | idem + Letter of Acceptance + sertifikat `.webp` yang ikut ter-deploy |
| Top 10 Finalis Solve-It Challenge 2026 UKRIDA, final **13 Juni 2026** | idem |
| **Top 15 Semifinalis BMC #12** (24 Jul 2026), final **20 Ags 2026 belum terjadi** | `All of Project/Competition-PNB/PROJECT_MASTER.md` §12 |
| Audit keamanan LEAP 2036: anon SELECT terbuka → ditutup, diverifikasi ulang di produksi | `leap-2036/AUDIT_HANDOFF_REPORT.md` §8 (status CLOSED 31 Jul) |
| YGMS: 0 elemen teks gagal WCAG dari 100 diperiksa, rasio terburuk 4.56:1; font 262 KB → 134 KB | `Youth-GKKK_MS/PROJECT_MASTER.md` |
| Sowan skripsi: 8 fungsi `api_*`, 10 lubang, split 30/70, tanpa `service_role` | `Semester 7/Tugas Akhir/sowan-skripsi/BACKEND.md` |
| Ketua KKN, 59 mahasiswa, 7 sekolah, 2.029 siswa | `Semester 6/7. KKN/PROJECT_MASTER.md` §0, §2 |
| 9 URL live semuanya HTTP 200 | dicek langsung 2 Ags 2026 |

**Sengaja TIDAK ditulis:** artikel ICIC (belum terbit), hasil final BMC (belum ada),
nama rekan tim (privasi — cukup "tim bertiga"), nama tim per lomba (dokumen tidak konsisten:
"Trio Capybara Gaje" vs "Makosan"), nomor sertifikat (tidak perlu di situs publik).

---

## File Dimodifikasi

**Dibuat**
- `web/data/caseStudies.ts` — 6 studi kasus + aturan sumber
- `web/data/record.ts` — lomba, peran, build live, skill, sertifikat, poster
- `web/styles/v3/{tokens,base,app}.css` — sistem desain baru (21 KB sumber)
- `web/components/site/{SiteHeader,SiteFooter,Reveal}.tsx`
- `web/app/{about,record}/page.tsx`, `web/app/work/[slug]/page.tsx`
- `web/app/{not-found.tsx,sitemap.ts,robots.ts,opengraph-image.tsx}`

**Diubah**
- `web/app/{layout,page}.tsx`, `web/app/globals.css` (manifest 3 baris)
- `web/data/{profile,timeline}.ts`
- `web/next.config.ts` — redirect permanen rute v2 lama
- `web/tsconfig.json`, `web/eslint.config.mjs` — exclude `_v2`

**Diarsipkan (BUKAN dihapus)** — sesuai Agent-Protocol §8
- `web/_v2/` — seluruh UI dashboard v2: `app/hubs`, `app/api/chat`, `components/{shell,fx,console}`,
  `lib/persona.ts`, dan 7 file data lama.
- `web/styles/_v2/` — 20 file CSS v2 (~250 KB).
- Keduanya di-exclude dari typecheck, lint, dan bundle. Masih di disk, masih di riwayat git.

---

## Angka yang Diukur (bukan diklaim)

**Aksesibilitas** — semua diverifikasi lewat skrip, bukan perkiraan.
- Kontras teks vs `--ink-0` / `--ink-1` / `--ink-2`: **terburuk 5,51:1** (butuh 4,5:1). Semua lulus.
- Border kontrol interaktif `--ui-line`: **3,70:1** (butuh 3:1, WCAG 1.4.11).
- 9 rute diperiksa: tepat 1 `<h1>` per halaman · `lang` ada · `<main>` ada · skip link ada ·
  `<title>` + meta description ada · **0 gambar tanpa alt** (27 gambar di `/record`) ·
  0 tautan tanpa nama aksesibel · 0 lompatan level heading · semua `target="_blank"` punya
  `rel="noopener"` · **0 sumber daya pihak ketiga**.
- Reflow: `scrollWidth == viewport` di 348px, tidak ada elemen melewati batas.
- Zoom teks 200%: tidak ada overflow horizontal.
- Target sentuh: 0 tautan/tombol di bawah 24px tinggi; nav & tombol dipatok min 44px.
- `prefers-reduced-motion`: animasi dimatikan, konten **tetap terlihat** (bukan `animation: none`
  yang dulu bikin situs jadi gambar mati — lihat Protocol BAD-03).

**Performa**
| | Sebelum | Sesudah |
|---|---|---|
| CSS | ~250 KB (20 file @import) | **19,3 KB** (4,8 KB gz) |
| WebGL / three.js di halaman | ada (`AmbientField`) | **tidak ada** |
| framer-motion | ada (page transition) | **tidak ada** |
| Permintaan pihak ketiga | 0 (font sudah self-host) | **0** |
| Gambar di halaman depan | beberapa | **nol** |
| Rute | sebagian dinamis | **semua statis / SSG** |
| JS (framework Next+React) | — | ~192 KB gz — ini lantai App Router, bukan kode kita |

---

## Yang Perlu Dex Tahu

1. **Situs sekarang menuliskan kegagalanmu sendiri.** Tiap studi kasus punya bagian
   "What is unfinished or untrue yet". Itu **disengaja** — kalau kamu mau menghapusnya,
   angka-angka lain jadi kurang dipercaya. Rekomendasi: biarkan.
2. **Cerita audit keamanan LEAP 2036 jadi bagian terkuat portfolio ini.** Sedikit sekali
   mahasiswa yang bisa menunjukkan "aku menemukan lubang di sistemku sendiri, menutupnya,
   dan memverifikasi ulang di produksi". Itu yang dicari pewawancara magang.
3. **Foto pribadi hilang dari galeri.** Kalau kamu memang mau menampilkannya, itu keputusanmu —
   datanya masih ada di `web/public/images/gallery/photos/`, tinggal tambah lagi ke
   `posters`/array baru di `record.ts`.
4. **Peran Sowan ditulis "Platform builder (CTO in the team)"** karena artikel resmi ke Biro 4
   menulis *platform builder*, sementara dokumen internal menulis CTO. Kalau ada versi resmi
   yang kamu pilih, ganti di `caseStudies.ts` dan `record.ts`.
5. **Dependensi `three`, `@react-three/*`, `framer-motion` masih ada di `package.json`** walau
   tidak dipakai lagi. Sengaja tidak kuhapus supaya `pnpm-lock.yaml` tidak perlu diregenerasi
   (risiko gagal deploy). Menghapusnya = penghematan waktu build, tapi lakukan bersama
   `pnpm install` dan build ulang.
6. **`vercel.json` di root repo masih menunjuk `taste-express/`** (situs statis lama). Tidak
   dipakai karena Root Directory project Vercel = `web`. Tidak kusentuh supaya deploy tidak rusak.
