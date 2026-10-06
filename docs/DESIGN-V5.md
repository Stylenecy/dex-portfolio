# DESIGN v5 — "Reforged"

**Status:** dibangun 6 Okt 2026.
**Menggantikan:** v3 "Field Notes" (isi dipertahankan — aturan `sources` tetap berlaku) + kerangka v4 "Layered" (visi Dex dipakai,
kanvas placeholder tidak).

**Design Read:** dibaca sebagai portofolio personal sinematik untuk perekrut, juri lomba, dan panitia —
dial E/R/M **3/3/3** di landing, **2/2/2** di halaman detail (`/work/*`, `/record`, `/about`).

## Acuan (tercatat, bukan tebakan)
| Acuan | Yang diambil |
|---|---|
| Bahasa visual rumah Dex (catatan desain pribadi, Okt 2026) | token netral, HUD siku, metadata mono, display raksasa, satu frasa serif miring, label dalam kurung, counter sekali jalan, easing expo-out, ringan |
| Selera UI Dex | futuristik, modern, tipografi geometris & besar, gradasi |
| Visi layered Dex (Ags 2026) | intro singkat ala film → figur Dex turun kepala→perut lalu habis oleh gradasi → lapisan luar → pintu ke detail |
| Umpan balik Dex (Ags 2026) | informasinya juga harus animatif: counter, reveal per baris, stagger, garis menggambar diri |
| Identitas lama situs | Operator cyan `#64d2ff`, gelap, mono, bahasa "System OS" |

## Token (`web/styles/v5/tokens.css`)
- Netral rumah: ink `#0c0d0d`, permukaan `#141717` / `#1c2020`, garis putih alfa .08 / .16.
- Teks: `#e6eaea` (15:1) · `#b9c1c1` (10,6:1) · `#9aa3a3` (7,5:1 di ink, 6,5:1 di kartu) — dihitung `kontras.mjs`.
- **Satu aksen: Operator cyan `#64d2ff`** (11,3:1 di ink). Alasan: warna identitas Dex sejak v1, dan jendela "System"
  ala Questism memang biru-cyan. Dipakai untuk: status terverifikasi, angka, satu kata beraksen, fokus.
- Warna fungsional saja (bukan aksen): hijau = live, amber = belum selesai / bagian jujur.
- Gradasi = cyan → transparan (cahaya di belakang figur, garis pindai). Bukan gradien biru-ungu.

## Huruf
Inter (display, tracking −0,04em) · Geist Mono (metadata, angka) · Instrument Serif *miring* (satu frasa per layar).
Semua lewat `next/font` (self-host, tanpa request pihak ketiga).

## Gerak (semua lewat `motionAllowed()` + tombol Motion)
| Elemen | Gerak | Catatan |
|---|---|---|
| Intro | kilasan 7 panel karya asli Dex (poster + produk) ala intro Marvel → nama → sapuan | ≤ 2,2 dtk, sekali per sesi, Skip/Esc/klik, tidak memuat video |
| Figur Dex | scroll: kamera turun kepala→dada (scale + translate), sedikit berputar (rotateY), garis pindai cyan, habis oleh mask gradasi; scroll naik = mundur | 1 foto cutout 51 KB, bukan 120 frame; hanya transform/opacity |
| Nama hero | huruf *settle* per baris (0,24em → 0) | terlukis di frame pertama (LCP aman) |
| Judul seksi | reveal per baris dalam mask | 110% → 0, stagger 90 ms |
| Angka | counter sekali jalan saat masuk layar | nilai akhir = data asli; tanpa parallax |
| Baris lomba / peran | stagger + garis pembatas menggambar diri | |
| Kartu karya | reveal gambar clip-path + hover berbobot | |

Reduced motion (OS) = semua konten tampil penuh di keadaan akhir; tombol **Motion** di footer memaksa gerak menyala
(Windows Dex melaporkan reduced motion — lihat Protocol BAD-03).

## Gerbang
360 px tanpa scroll horizontal · kontras AA · fokus terlihat · Escape menutup intro · tanpa branding alat AI ·
setiap klaim punya sumber di `web/data/*` (`sources`).
