# ASSET BRIEF v4 — panduan generate aset, siap eksekusi

**Untuk:** Dex · **Ditulis:** 2 Agustus 2026 · **Pasangan dokumen:** `docs/PORTFOLIO-V4-SPEC.md`

Dokumen ini isinya cuma satu hal: **apa yang harus kamu generate, pakai apa, prompt-nya apa
persis, dan cara tahu hasilnya benar.** Prompt di dalam blok kode tinggal copy-paste.

---

## ⚠️ BACA INI DULU — dua hal yang mengubah rencana

### 1. Kamu tidak butuh 2 video. Cukup 1 sekuens.

Kamu bilang: satu video untuk scroll turun, satu lagi untuk scroll naik.

**Tidak perlu.** Scroll-linked sequence itu **dua arah dengan sendirinya**. Cara kerjanya:
posisi scroll dipetakan ke nomor frame. Scroll ke bawah → nomor frame naik. Scroll ke atas →
nomor frame **turun**, dan gambar otomatis mundur dari perut balik ke wajah. Itu frame yang
sama persis, dibaca terbalik. Tidak ada video kedua.

**Artinya:** kerja generate-mu **separuh**, dan berat halaman **separuh**.

### 2. Yang di-generate itu VIDEO, tapi yang dipakai situs itu GAMBAR

Situs tidak memutar video figurmu. Situs menggambar **frame demi frame ke `<canvas>`** mengikuti
scroll. Jadi alurnya:

```
generate video rotasi (5 dtk)  →  ffmpeg potong jadi 120 gambar  →  masuk web/public/v4/
```

Kenapa lewat video, bukan generate 120 gambar satu-satu? Karena **konsistensi wajah**. Model
video menghasilkan satu gerakan menerus, jadi wajahmu tetap wajah yang sama di semua frame.
Kalau 120 gambar di-generate terpisah, wajahmu akan berubah-ubah antar frame dan hasilnya
kelihatan seperti 120 orang berbeda. Ini titik gagal nomor satu dari pekerjaan seperti ini.

---

## LANGKAH 0 — Siapkan foto referensi (10 menit, wajib, jangan dilewat)

Kualitas hasil ditentukan di langkah ini, bukan di prompt.

**Yang sudah ada di repo:** `web/public/images/profile-dex.jpg`. Boleh dipakai untuk percobaan
pertama. Tapi kalau mau hasil terbaik, ambil foto baru dengan syarat:

| Syarat | Kenapa |
|---|---|
| **Latar polos** — tembok putih/abu rata, tanpa perabot | Latar ramai bikin model "menyeret" objek ikut berputar dan bentuknya berubah |
| **Cahaya rata dari depan** — dekat jendela, siang, tanpa lampu warna | Bayangan keras bikin wajah berubah saat kepala berputar |
| **Setengah badan** — kepala sampai sedikit di bawah pinggang | Kamera perlu turun sampai perut; kalau foto cuma sebatas dada, bagian perut ditebak model |
| **Menghadap lurus ke kamera**, bahu rata | Titik nol rotasi |
| **Baju polos, satu warna** | Motif ramai berubah acak antar frame — ini sangat kelihatan |
| **Tanpa kacamata** kalau bisa | Pantulan lensa jadi artefak saat berputar |
| **Resolusi ≥ 2000 px sisi pendek** | |

Simpan sebagai `docs/assets-src/ref-dex-front.jpg`.

**Tambahan yang sangat membantu (opsional, 2 menit):** ambil 2 foto lagi — badan diputar
±45° ke kiri dan ±45° ke kanan, posisi dan cahaya sama. Beberapa tool menerima banyak
referensi, dan hasilnya jauh lebih stabil.

---

## ASET A — Intro sinematik "Marvel-style"

**Dipakai di:** loading screen (Layer 0), sekali per sesi browser.
**Output akhir:** `web/public/v4/intro/intro-desktop.mp4` + `intro-mobile.mp4`

### Spesifikasi teknis

| Item | Nilai |
|---|---|
| Durasi | **3 detik** (batas: 2–4) |
| Rasio | 16:9 |
| Resolusi desktop | 1920×1080 |
| Resolusi mobile | 1280×720 |
| FPS | 24 (sinematik) atau 30 |
| Audio | **TIDAK ADA.** Browser memblokir autoplay bersuara, dan situs pribadi yang tiba-tiba bersuara itu menyebalkan |
| Format | MP4 / H.264 (dukungan paling luas) |
| Ukuran berkas | **≤ 1.5 MB desktop · ≤ 600 KB mobile** — ini batas keras dari spec |

### Tool: **Gemini Flow (Veo 3)** — pilihan utama

Alasan: Veo 3 kuat untuk gerak kamera sinematik pendek dan teks yang tetap terbaca.
Alternatif: **Sora (ChatGPT)** — sama-sama bisa; kalau satu gagal, coba yang lain dengan
prompt yang sama.

### Prompt — copy-paste

```
A 3-second cinematic title sequence, no dialogue, no on-screen people.

Pure black void. Thin sheets of pale cyan light (#67D3F5) sweep in from the left
edge, layering over each other like pages of glass turning. Each sheet carries a
faint, unreadable technical grid — schematics, code fragments, wireframe outlines —
visible only in the light, never legible.

The sheets accelerate, compress toward the centre of frame, and collapse into a
single hard horizontal line of cyan light.

The line snaps open vertically into clean negative space, revealing two words in
the centre of frame, letter-spaced wide, thin geometric sans-serif, pale off-white
(#F4F6F8):

DEX BENNETT

Hold on the title for the final half second, dead still, no camera movement.

Style: restrained, technical, expensive. Deep black background throughout.
Single accent colour only — cyan. No orange, no gold, no lens flare, no
particles, no smoke, no fire, no comic-book imagery, no superhero iconography,
no logos other than the title text. Camera is locked; motion comes from the
light sheets, not the camera. 24fps, cinematic, high contrast, sharp.
```

**Catatan tentang "kayak Marvel":** yang ditiru itu **struktur**-nya — lapisan yang menyapu,
memadat, lalu berhenti pada judul yang diam. Bukan warna atau ikonografinya. Kalau kamu minta
model meniru Marvel secara harfiah, dua hal terjadi: (a) banyak tool menolak karena merek
berhak cipta, (b) hasilnya kelihatan seperti tiruan murahan. Versi di atas memakai warna
situsmu sendiri, dan itu justru terlihat lebih mahal.

### Cara cek hasilnya benar — sebelum lanjut

- [ ] Durasi **antara 2 dan 4 detik**
- [ ] Setengah detik terakhir **diam total** dan tulisan "DEX BENNETT" **terbaca jelas**
- [ ] Ejaan **DEX BENNETT** benar (model video sering salah eja — cek huruf per huruf)
- [ ] Tidak ada wajah, tangan, atau orang muncul di frame mana pun
- [ ] Frame pertama **hitam**, bukan abu-abu terang (kalau terang, akan berkedip saat halaman dibuka)
- [ ] Tidak ada watermark tool di pojok

Kalau tulisannya salah eja atau berubah bentuk — **jangan diperbaiki manual.** Generate ulang.
Model video gagal pada teks itu biasa; 2–4 percobaan wajar.

### Kompres ke batas ukuran

Setelah dapat video yang benar, taruh di `docs/assets-src/intro-raw.mp4`, lalu jalankan
(butuh **ffmpeg** — `winget install Gyan.FFmpeg`):

```bash
# Desktop — target <= 1.5 MB
ffmpeg -i docs/assets-src/intro-raw.mp4 -an -vf "scale=1920:1080" \
  -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart \
  web/public/v4/intro/intro-desktop.mp4

# Mobile — target <= 600 KB
ffmpeg -i docs/assets-src/intro-raw.mp4 -an -vf "scale=1280:720" \
  -c:v libx264 -crf 31 -preset slow -pix_fmt yuv420p -movflags +faststart \
  web/public/v4/intro/intro-mobile.mp4
```

`-an` membuang audio. `-movflags +faststart` membuat video mulai main sebelum terunduh penuh —
tanpa ini, loading screen justru jadi lambat.

Cek ukurannya: kalau desktop masih di atas 1.5 MB, naikkan `-crf 27` jadi `29`, ulangi.

---

## ASET B — Sekuens rotasi Dex ⭐ (aset paling penting)

**Dipakai di:** background Layer 1, digambar ke canvas mengikuti scroll.
**Output akhir:** 120 file WebP di `web/public/v4/figure/desktop/` + 60 file di `.../mobile/`

### Spesifikasi teknis

| Item | Desktop | Mobile |
|---|---|---|
| Jumlah frame | **120** | **60** |
| Resolusi per frame | 1080 × 1350 (4:5 tegak) | 720 × 900 |
| Format | WebP, quality 70 | WebP, quality 65 |
| Ukuran per frame | ±28 KB | ±20 KB |
| **Total** | **≤ 3.5 MB** | **≤ 1.2 MB** |
| Latar | **hitam rata** (`#0a0b0d`) atau transparan | sama |
| Penamaan | `frame-000.webp` … `frame-119.webp` | `frame-000.webp` … `frame-059.webp` |

### Gerakan yang harus terjadi dalam 5 detik

```
detik 0.0  →  wajah menghadap lurus ke kamera, rotasi 0°
detik 2.5  →  badan sudah berputar ~90° searah jarum jam, kamera setinggi dada
detik 5.0  →  badan ~180°, kamera setinggi perut/pinggang
```

Dua gerakan berjalan **bersamaan dan mulus**: badan berputar, kamera turun. Tidak ada jeda,
tidak ada percepatan, tidak ada potongan.

**Kenapa 180°, bukan 360°:** rotasi penuh memaksa AI mengarang punggung dan belakang kepalamu —
bagian yang tidak ada di foto referensi. Itu justru yang paling sering rusak. 180° tetap
terbaca sebagai "berputar", dan setiap frame masih punya wajah sebagai acuan. Kalau percobaan
pertama mulus, baru naikkan.

### Tool: **Gemini Flow (Veo 3) — mode image-to-video**, dengan foto referensimu

Ini kuncinya: **jangan text-to-video.** Harus **image-to-video** dengan
`docs/assets-src/ref-dex-front.jpg` sebagai gambar awal. Kalau tidak, yang muncul orang lain.

Alternatif kalau Veo tidak tersedia: **Sora (ChatGPT)** punya mode serupa
("animate this image" / image input). Prompt yang sama bisa dipakai.

### Prompt — copy-paste (mode image-to-video, gambar awal = foto referensi)

```
Animate the person in the reference image. Keep their face, hairstyle, skin tone,
body proportions and clothing exactly identical to the reference in every single
frame — this is the highest priority and overrides everything else below.

Motion, 5 seconds, one continuous take, no cuts:

The person rotates slowly and steadily clockwise, viewed from above, from
0 degrees at the start to exactly 180 degrees at the end. Constant speed. They do
not walk, lean, gesture, blink dramatically, or change expression. Neutral, calm,
still expression held throughout.

At the same time and at the same constant rate, the camera descends smoothly from
head height down to waist height, so the framing travels from the face down to the
stomach. Camera descent and body rotation finish together.

Background: flat solid black, completely empty, no floor, no shadow cast on any
surface, no environment, no props, no other people.

Lighting: soft, even, frontal, unchanged for the whole shot. No moving light, no
flicker, no colour shift.

Locked, mechanical, technical product-turntable feel. Absolutely no handheld
shake, no zoom, no rack focus, no depth-of-field change, no motion blur, no
stylisation, no filter. Photoreal. 24fps.
```

### Kalau hasilnya berputar berlawanan arah

Ini sering terjadi — model video tidak konsisten soal arah. **Jangan generate ulang.**
Balik urutan frame-nya saat ekstraksi (perintahnya ada di bawah). Lebih cepat dan gratis.

### Ekstraksi jadi frame — perintah ffmpeg

Simpan video hasilnya sebagai `docs/assets-src/figure-raw.mp4`, lalu:

```bash
# --- DESKTOP: 120 frame, 1080x1350, WebP q70 ---
mkdir -p web/public/v4/figure/desktop
ffmpeg -i docs/assets-src/figure-raw.mp4 \
  -vf "fps=24,scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350" \
  -frames:v 120 -q:v 70 \
  "web/public/v4/figure/desktop/frame-%03d.webp"

# --- MOBILE: 60 frame, 720x900, WebP q65 ---
mkdir -p web/public/v4/figure/mobile
ffmpeg -i docs/assets-src/figure-raw.mp4 \
  -vf "fps=12,scale=720:900:force_original_aspect_ratio=increase,crop=720:900" \
  -frames:v 60 -q:v 65 \
  "web/public/v4/figure/mobile/frame-%03d.webp"
```

`%03d` menghasilkan `frame-001.webp` (mulai dari 1). Kode situs mengharapkan **mulai dari 000** —
konstanta `FRAME_START` di `web/components/v4/figureConfig.ts` sudah disediakan, ubah ke `1`
kalau kamu tidak mau me-rename apa pun. Lebih mudah begitu.

**Kalau rotasinya terbalik**, tambahkan `,reverse` di akhir `-vf` (setelah `crop=...`):

```bash
-vf "fps=24,scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350,reverse"
```

### Cek total ukuran — batas keras

```bash
du -sh web/public/v4/figure/desktop web/public/v4/figure/mobile
```

Desktop harus **≤ 3.5 MB**, mobile **≤ 1.2 MB**. Kalau lewat: turunkan `-q:v 70` jadi `60`
dan ulangi. Pada 1080px, q60 masih hampir tidak terlihat bedanya.

### Cara cek hasilnya benar — sebelum lanjut

- [ ] Buka `frame-000` dan `frame-119` berdampingan — **apakah itu orang yang sama?**
      Ini pemeriksaan yang paling penting. Kalau ragu, itu berarti tidak.
- [ ] Klik cepat frame 000 → 030 → 060 → 090 → 119. Rotasi harus **naik terus**, tidak
      bolak-balik, tidak melompat.
- [ ] Kamera **turun terus**, tidak naik lagi di tengah.
- [ ] Latar hitam rata di semua frame — tidak ada bayangan, lantai, atau benda yang muncul
- [ ] Tidak ada tangan/jari yang berubah jadi bentuk aneh (titik gagal klasik AI)
- [ ] Jumlah berkas persis 120 dan 60
- [ ] Total ukuran di bawah batas

---

## 🔴 Jujur soal tingkat kesulitan

**Konsistensi wajah lintas frame adalah bagian tersulit dari seluruh pekerjaan ini.** Bukan
prompt-nya, bukan kode-nya. Ini.

Yang realistis kamu hadapi:

- **Percobaan 1–3 kemungkinan besar gagal.** Gejala umum: wajah berubah pelan-pelan jadi orang
  lain di paruh kedua, rambut berpindah, baju berganti motif, tangan meleleh.
- **Rotasi 180° punya peluang jauh lebih besar daripada 360°.** Mulai dari sini. Selalu.
- **Kualitas foto referensi lebih menentukan daripada prompt.** Latar polos + cahaya rata
  menyelesaikan lebih banyak masalah daripada kalimat prompt mana pun. Kalau gagal 3 kali,
  **perbaiki fotonya, jangan prompt-nya.**
- **Durasi pendek menang.** 5 detik jauh lebih stabil daripada 10. Jangan tergoda memperpanjang.
- Anggaran waktu jujur: **1–2 jam** termasuk percobaan gagal. Bukan 15 menit.

### Kalau setelah 5 percobaan tetap gagal — jalur cadangan

Ini bukan kegagalan, ini pilihan desain yang berbeda dan tetap bagus:

1. **Rotasi 90° saja** (depan → samping). Jauh lebih mudah, tetap terbaca sebagai gerakan.
2. **Siluet, bukan foto.** Ubah frame jadi siluet satu warna / wireframe. Wajah tidak lagi
   jadi masalah karena tidak ada wajah — dan ini justru cocok dengan bahasa visual situsmu
   yang teknis. Sekali `ffmpeg` filter, tanpa AI sama sekali.
3. **Rekam sendiri.** Berdiri di depan tembok polos, minta orang memutar HP mengelilingimu
   sambil menurunkan tangan pelan-pelan, 5 detik. Nol masalah konsistensi wajah — karena itu
   memang wajahmu. **Ini sebenarnya jalur dengan peluang berhasil tertinggi**, dan aku
   menyarankannya kalau percobaan AI pertama sudah terasa berat.

---

## Ringkasan tempat menaruh berkas

```
docs/assets-src/                     ← bahan mentah, JANGAN di-commit (sudah di .gitignore)
  ref-dex-front.jpg
  intro-raw.mp4
  figure-raw.mp4

web/public/v4/
  intro/
    intro-desktop.mp4                ← ≤ 1.5 MB
    intro-mobile.mp4                 ← ≤ 600 KB
  figure/
    desktop/frame-000.webp … 119     ← ≤ 3.5 MB total
    mobile/frame-000.webp … 059      ← ≤ 1.2 MB total
```

Begitu berkas-berkas ini ada, **tidak ada kode yang perlu diubah.** Ubah satu baris di
`web/components/v4/figureConfig.ts`:

```ts
export const ASSETS_READY = false;   // ← ganti jadi true
```

Situs langsung berhenti memakai placeholder dan memakai aset aslimu.

---

## Urutan kerja yang disarankan

1. Foto referensi (10 mnt) — **jangan dilewat**
2. Aset B / rotasi dulu, **bukan** intro — ini yang paling mungkin gagal, lebih baik tahu lebih awal
3. Kalau B berhasil → Aset A / intro (jauh lebih gampang)
4. Taruh berkas → ubah `ASSETS_READY = true` → lihat hasilnya di `npm run dev`
5. Baru bicara deploy
