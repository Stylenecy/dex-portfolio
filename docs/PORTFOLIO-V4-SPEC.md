# PORTFOLIO v4 — "Layered" Spec

**Status:** SPEC — disepakati 2 Agustus 2026, belum jalan penuh (menunggu aset).
**Pemilik:** Dex Bennett · ditulis 2 Ags 2026 malam.
**Berlaku untuk:** `web/` (Next.js 16, App Router). Deploy: Vercel.
**Route kerja:** `/v4` — **terpisah dari `/`** supaya situs live (v3 "Field Notes") tidak rusak
selama v4 masih kerangka. Tukar jadi `/` hanya kalau Dex bilang siap.

> Dokumen ini adalah sumber kebenaran untuk v4. Kalau ada sesi AI berikutnya, baca ini
> dan `docs/ASSET-BRIEF-V4.md` sebelum menyentuh apa pun di `web/components/v4/`.

---

## 1. Visi Dex — kata-katanya sendiri

Direkam apa adanya, 2 Agustus 2026:

> "Aku ingin portfolioku itu terbagi beberapa layer. Layer paling dasar adalah landing page
> super keren. Pas masuk website, ada loading screen seperti versi sebelumnya — aku kebayang
> ada intro singkat kayak intro film Marvel (berarti udah ada 1 video tuh).
>
> Setelah masuk, ada Dex (aku) di background berbentuk 3D utuh yang kalau di-scroll, Dex akan
> memutar sesuai arah jarum jam sambil terus turun dari kepala menuju perut kemudian habis oleh
> gradasi. Kalau di-scroll ke atas ya balik lagi dari perut ke mukaku.
>
> Di landing page yang sama juga sudah ada semua informasiku, tapi benar-benar yang outer layer
> aja: menang lomba ini, menang lomba itu, sudah bikin ini itu, dan ada physical stats-ku juga.
>
> Kemudian kalau mau lihat semuanya lebih detail, di penghujung page bagian bawah ada opsi untuk
> masuk ke dashboard — yang benar-benar lengkap, keren, kayak PPT.
>
> SEMUA INI SUPER BAGUS UNTUK DESKTOP, jadi kita harus prioritaskan view Desktop dulu, baru
> somehow kita bikin yang Mobile."

---

## 2. Arsitektur berlapis

```
LAYER 0  ·  GATE          →  loading screen + intro sinematik (2–4 dtk)
                              satu kali per sesi browser (sessionStorage)
                              ↓ auto-dismiss / klik "SKIP"
LAYER 1  ·  LANDING       →  figur Dex scroll-linked di background
                              + OUTER LAYER: prestasi, live builds, physical stats
                              ↓ pintu di paling bawah
LAYER 2  ·  DASHBOARD     →  detail penuh, "kayak PPT"
                              (= isi v3 sekarang: 6 case study, record, about)
```

**Prinsip pemisahan:**

| Layer | Isi | Aturan |
|---|---|---|
| 0 Gate | Video intro + progress | Tidak boleh menahan lebih dari 4 dtk. Harus bisa di-skip. Harus punya jalur tanpa video. |
| 1 Landing | Angka + judul saja | **Tidak ada paragraf panjang.** Kalau butuh 3 kalimat untuk menjelaskan, itu milik Layer 2. |
| 2 Dashboard | Cerita lengkap + sumber | Aturan `sources` dari v3 tetap berlaku: klaim tanpa berkas sumber = tidak ditulis. |

---

## 3. Mekanisme figur scroll-linked

### 3.1 Keputusan teknis: **image sequence di `<canvas>`, bukan model 3D live**

Bukan Three.js/GLTF. Alasan:

- Model 3D fotoreal wajah Dex = butuh 3D scan atau modeling manual berminggu-minggu.
- GLTF + tekstur + rig = 8–30 MB, jauh di atas anggaran.
- Frame sequence = deterministik, tidak ada rig yang bisa rusak, tidak ada shader yang beda antar GPU.
- Ini teknik yang dipakai Apple (AirPods Pro, MacBook) untuk efek yang persis seperti ini.

Konsekuensi: yang di-generate AI adalah **gambar diam berurutan**, bukan aset 3D.

### 3.2 ⚠️ KOREKSI: cukup **1 sekuens**, bukan 2 video

Dex mengira butuh 2 video — satu untuk scroll turun, satu untuk scroll naik. **Tidak perlu.**

Scroll-linked image sequence itu **dua arah secara alami**. Yang terjadi:

```
scrollProgress 0.00 → frame[0]     (wajah)
scrollProgress 0.50 → frame[59]    (dada)
scrollProgress 1.00 → frame[119]   (perut, habis oleh gradasi)
```

Scroll ke atas hanya membuat `scrollProgress` mengecil, jadi indeks frame **mundur** —
`frame[119] → frame[59] → frame[0]`. Itu sudah otomatis "balik lagi dari perut ke muka".
Tidak ada video kedua, tidak ada logika arah, tidak ada state.

**Dampaknya nyata:** separuh kerja generate hilang, separuh berat halaman hilang.

### 3.3 Parameter gerakan

Satu sekuens, dua sumbu berjalan bersamaan sepanjang progress 0→1:

| Sumbu | Dari | Ke | Catatan |
|---|---|---|---|
| Rotasi subjek | 0° | **+180° searah jarum jam** (dilihat dari atas) | Bukan 360°. Lihat §3.4. |
| Ketinggian kamera | kepala / wajah | perut / pinggang | Turun mulus, tanpa berhenti |
| Fade bawah | 0% | 100% | Gradasi ke `--ink-0`, dikerjakan **CSS**, bukan di frame |

### 3.4 Kenapa 180°, bukan 360°

Rotasi 360° berarti AI harus menghasilkan **punggung dan sisi belakang kepala Dex** — bagian
yang tidak ada di foto referensi mana pun. Itu justru bagian yang paling sering gagal
(wajah "bocor" di belakang kepala, rambut berubah bentuk). 180° dari depan-kiri ke depan-kanan
tetap membaca sebagai "berputar", dan setiap frame masih punya acuan wajah.

Kalau percobaan pertama ternyata mulus, naikkan ke 270°. Jangan mulai dari 360°.

### 3.5 Gradasi "habis" di bawah

**Dikerjakan CSS, bukan di dalam frame.** Alasan: kalau gradasinya dibakar ke gambar, ia
tidak bisa menyesuaikan warna background dan kelihatan seperti kotak abu-abu di layar lebar.

```css
mask-image: linear-gradient(to bottom, #000 0%, #000 55%, transparent 92%);
```

Frame yang di-generate harus **latar transparan atau hitam rata** supaya mask ini bekerja bersih.

---

## 4. Outer layer — apa yang boleh tampil di Layer 1

**Aturan keras: setiap angka di layer ini harus terverifikasi.** Stat RPG karangan
(`VISION S`, power score 74/100) sudah dihapus 2 Ags 2026 dan **tidak boleh kembali.**

### 4.1 Yang sudah terverifikasi — boleh dipakai sekarang

Sumber: `web/data/record.ts`, `web/data/caseStudies.ts`, `web/data/timeline.ts`,
diverifikasi ulang 2 Ags 2026.

| Angka | Klaim | Sumber |
|---|---|---|
| **1st** | Juara 1 nasional, Business Plan Competition KSE Juara × USU, diumumkan 2 Mei 2026 | sertifikat on file |
| **Top 15** | EURECA 2026 semifinalist, Prasetiya Mulya | sertifikat `.webp` di repo |
| **Top 10** | Solve-It Challenge 2026 finalist, UKRIDA, final 13 Jun 2026 | `record.ts` |
| **Top 15** | BMC #12 International, Politeknik Negeri Bali — **final 20 Ags 2026, belum selesai** | wajib ditandai "undecided" |
| **3rd RU** | Victus Campus Heroes Valorant Yogyakarta 2025 | sertifikat on file |
| **9** | URL live, semua HTTP 200 per 2 Ags 2026 | `liveBuilds` |
| **59** | mahasiswa dipimpin, KKN Tematik STEM 2026 (10 kelompok) | `roleRecord.kkn-chair` |
| **2.029** | siswa terjangkau skrining penglihatan, 7 sekolah, 21–27 Jul 2026 | idem |
| **10** | lubang keamanan ditemukan & ditutup di sistem sendiri | `caseStudies` LEAP 2036 |
| **0** | elemen teks gagal WCAG AA (100 diaudit di produksi) | `caseStudies` |

**Cara menampilkan:** angka besar + label pendek. Tanpa narasi. Narasi ada di Layer 2.

### 4.2 Physical stats — **KOSONG sampai Dex mengisi**

Dex kangen sensasi Questism: melihat stat diri sendiri. Itu dipertahankan. Tapi bentuknya
**data faktual tentang tubuh**, bukan skor karangan.

Slot yang disediakan di `web/data/v4/stats.ts`, semuanya `value: null` sekarang:

- `height` — tinggi badan (cm)
- `weight` — berat badan (kg)
- `handedness` — kidal / kanan
- `bloodType` — golongan darah
- `sport` — olahraga rutin (badminton, sudah tercatat di NOW.md tapi biarkan Dex konfirmasi)
- `birthYear` / usia

**Komponen `PhysicalStats` menyembunyikan sendiri setiap baris yang `value === null`.**
Kalau Dex tidak mengisi apa pun, blok itu tidak muncul sama sekali. Tidak ada placeholder
"—" yang menggantung, tidak ada angka tebakan.

**Yang TIDAK boleh masuk ke sini:** apa pun yang berbentuk skor, tier, huruf grade, radar
chart "kemampuan", atau bar 0–100. Itu semua tidak bisa diverifikasi.

---

## 5. Anggaran performa — SYARAT, bukan saran

| Item | Batas keras | Cara memenuhi |
|---|---|---|
| Intro video (desktop) | **≤ 1.5 MB** | 3 dtk · 1920×1080 · H.264 CRF 26 · **tanpa audio** |
| Intro video (mobile) | **≤ 600 KB** | 1280×720, atau lewati video sepenuhnya |
| Sekuens frame desktop | **≤ 3.5 MB total** | 120 frame · 1080×1350 · WebP q70 · ±28 KB/frame |
| Sekuens frame mobile | **≤ 1.2 MB total** | 60 frame · 720×900 · WebP q65 · ±20 KB/frame |
| **Total halaman v4, first load** | **≤ 5 MB desktop / ≤ 2 MB mobile** | |
| Waktu sampai frame pertama tampil | **≤ 800 ms** | frame[0] di-`preload`, sisanya menyusul |
| JS v4 (gzip) | ≤ 25 KB | tanpa library animasi; `requestAnimationFrame` + `IntersectionObserver` saja |

### Aturan loading

1. **frame[0] di-`<link rel="preload">`.** Halaman tidak pernah menampilkan kanvas kosong.
2. **Progressive:** frame dimuat berurutan di latar belakang. Kalau frame target belum ada,
   kanvas menampilkan frame terdekat yang sudah termuat — bukan kosong, bukan berkedip.
3. **Frame set terpisah desktop vs mobile.** Dipilih dengan `matchMedia`, bukan CSS,
   supaya HP tidak pernah mengunduh set desktop.
4. **Data Saver dihormati:** `navigator.connection.saveData === true` → satu frame diam saja.

### `prefers-reduced-motion: reduce`

- Intro video **tidak diputar.** Gate langsung lewat.
- Sekuens frame **tidak berjalan.** Tampil **satu frame diam** (frame ke-0).
- Konten teks tetap muncul penuh — jangan ulangi BAD-03 (`animation: none` yang membuat
  halaman kosong total; lihat `.agent/Protocol.md` §3).

### 🔴 Ini kena Dex sendiri — makanya ada tombol Motion

**Windows Dex punya "Animation effects" OFF.** Artinya semua browser di mesinnya melaporkan
`prefers-reduced-motion: reduce`. Tanpa penanganan khusus, **Dex tidak akan pernah melihat
intro maupun figur berputar di komputernya sendiri** — persis kegagalan BAD-03 yang dulu bikin
landing page v1 tampak seperti gambar mati dan butuh lama untuk didiagnosis.

Penanganannya: default tetap menghormati setelan OS (itu yang benar untuk pengunjung lain),
tapi ada tombol **Motion** kecil di bagian bawah landing yang memaksa gerak menyala. Pilihan
disimpan di `localStorage` (`v4-motion`), dibaca oleh `motion.ts`, dan **juga oleh skrip
pre-paint di `IntroGate.tsx`** — kalau salah satu lupa membacanya, gate akan tersembunyi
padahal figur bergerak. Keduanya harus tetap sinkron.

➡️ **Dex: kalau `/v4` terlihat mati, klik "Motion" di bawah dulu sebelum melapor bug.**

---

## 6. Mobile

Prioritas desktop, tapi mobile tidak boleh rusak. Perilaku minimum di HP:

- Gate: tanpa video (atau versi 600 KB kalau koneksi bagus). Fade sederhana.
- Figur: sekuens 60 frame, atau **satu foto diam** kalau `saveData`/reduced-motion.
- Outer layer: satu kolom, angka tetap besar dan terbaca.
- Pintu dashboard: tombol biasa, bukan efek scroll.

Yang **tidak** dikerjakan di mobile: parallax, scroll-hijack, teks yang muncul huruf per huruf.

---

## 7. Status tiap bagian

| Bagian | Status | Menunggu |
|---|---|---|
| Spec ini | ✅ Ditulis 2 Ags 2026 | — |
| Asset brief | ✅ `docs/ASSET-BRIEF-V4.md` | — |
| Route `/v4` + layout | ✅ Berdiri | — |
| Gate / loading screen | ✅ Berdiri, **jalur tanpa video** | file video intro |
| Kanvas scroll-linked | ✅ Berdiri, **frame placeholder prosedural** | 120 frame asli |
| Outer layer — prestasi | ✅ Berdiri, angka terverifikasi | — |
| Outer layer — physical stats | ✅ Berdiri, **semua slot kosong** | Dex mengisi angkanya |
| Tombol Motion (opt-in) | ✅ Berdiri | — |
| **Gerak pada informasi (angka, judul, baris)** | 🔴 **Belum — lihat §7b** | sesi berikutnya |
| Pintu ke dashboard | ✅ Berdiri, menunjuk ke `/` (v3) | keputusan: v3 jadi dashboard, atau dashboard baru |
| Dashboard "kayak PPT" | ⬜ Belum | keputusan Dex — v3 sekarang sudah lengkap, mungkin cukup dipoles |
| Tukar `/v4` → `/` | ⬜ Belum | aset asli masuk + Dex setuju |
| Deploy | ⬜ **Sengaja belum** | konfirmasi Dex — sekarang masih placeholder |

---

## 7b. 🔴 GAP YANG BELUM DIKERJAKAN — cara informasi ditampilkan

**Umpan balik Dex, 2 Ags 2026 23:13, setelah melihat kerangka:**

> "Aku udah bisa melihat bentuk landing page portfolio yang lebih baik, meski **cara
> menampilkan informasinya masih tidak sesuai harapanku**. Aku berharap semuanya bisa
> **keren animatif** gitu, bahkan untuk informasi-informasinya di landing page."

**Ini gap nyata, bukan salah paham.** Yang dibangun sesi ini: figur yang bergerak mengikuti
scroll, tapi **teks dan angkanya diam** — grid statis, daftar biasa, chip biasa. Bagian
"informasi" masih terasa seperti dokumen yang ditempel di depan latar yang keren, bukan satu
kesatuan yang hidup. Bahasa Dex sendiri di `.agent/Protocol.md` §5.1: *"Static = dead."*

**Arah untuk sesi berikutnya** (belum dikerjakan, jangan diklaim selesai):

| Bagian | Sekarang | Yang diharapkan |
|---|---|---|
| Angka stat | muncul begitu saja | menghitung naik saat masuk layar (0 → 2.029), mono, cepat |
| Judul seksi | teks diam | terungkap per-kata / per-baris mengikuti scroll |
| Baris kompetisi | daftar statis | masuk bergiliran (stagger), garis pembatas menggambar diri |
| Chip live builds | diam | reaksi hover yang punya bobot, bukan sekadar ganti warna |
| Perpindahan antar seksi | potongan keras | seksi menempel/berlapis mengikuti scroll (bahasa gerak Elsye) |

**Batasan yang tetap berlaku saat mengerjakan ini:**
- Anggaran JS v4 ≤ 25 KB gzip (§5). Jangan menambah GSAP tanpa mengukur ulang anggaran —
  `IntersectionObserver` + `@keyframes` sudah cukup untuk semua baris di tabel atas.
- Semua gerak harus ikut tombol **Motion** / `prefers-reduced-motion`. Reduced motion =
  konten tetap **muncul penuh dalam keadaan akhirnya**, bukan hilang. Ini BAD-03, lagi.
- Angka yang menghitung naik tetap harus angka yang sama dengan `web/data/v4/stats.ts`.
  Animasi tidak boleh jadi alasan menulis angka yang lebih "enak dilihat".

## 8. Keputusan terbuka (pemilik: Dex)

1. **Dashboard Layer 2 = v3 sekarang, atau dibangun baru?** Rekomendasi: pakai v3. Isinya
   sudah lengkap, terverifikasi, dan sudah live. Yang perlu cuma header yang bilang
   "kamu sekarang di dashboard".
2. **Physical stats mau diisi apa saja?** Lihat §4.2. Kosong sampai dijawab.
3. **Rotasi 180° atau 270°?** Mulai 180 (lihat §3.4). Naikkan setelah percobaan pertama mulus.
4. **Intro Marvel-style: pakai teks apa?** Draft ada di asset brief. Perlu persetujuan.

---

## 9. Aturan yang tidak boleh dilanggar (warisan v3)

- `web/app/globals.css` = manifest murni. Style v4 masuk `web/styles/v4/*.css`, di-`@import`.
- Token: `var(--ink-0)`, `var(--text-1)`, `var(--cyan)` dst. Jangan hardcode hex.
- **Jangan hapus `web/_v2/`** — Dex masih mempertimbangkan mengambil sebagian elemennya.
- Jangan pakai `var()` di posisi timing-function dalam shorthand `animation:` (BAD-01).
- Jangan tulis klaim tanpa sumber di `web/data/`.

---

## 10. Peta berkas v4

```
docs/PORTFOLIO-V4-SPEC.md          ← dokumen ini
docs/ASSET-BRIEF-V4.md             ← panduan generate aset (untuk Dex)

web/app/v4/layout.tsx              ← metadata + noindex selama masih kerangka
web/app/v4/page.tsx                ← Layer 1: hero, stats, competitions, builds, pintu

web/components/v4/figureConfig.ts  ← ⭐ SATU berkas yang diubah saat aset datang
web/components/v4/ScrollFigure.tsx ← kanvas scroll-linked + placeholder prosedural
web/components/v4/IntroGate.tsx    ← Layer 0
web/components/v4/PhysicalStats.tsx← menyembunyikan diri kalau semua nilai null
web/components/v4/MotionToggle.tsx ← opt-in gerak
web/components/v4/motion.ts        ← satu-satunya tempat bertanya "boleh bergerak?"

web/data/v4/stats.ts               ← angka outer layer + slot physical stats (kosong)
web/styles/v4/v4.css               ← seluruh CSS v4, di-@import dari app/globals.css

web/public/v4/intro/               ← (belum ada) video intro
web/public/v4/figure/desktop|mobile← (belum ada) frame sekuens
```

## 11. Apa yang sudah diverifikasi, dan apa yang belum

Diperiksa 2 Ags 2026 di `localhost:3000/v4`:

- ✅ `npx tsc --noEmit` bersih · `npx eslint .` bersih · `npx next build` 0 error 0 warning
- ✅ `/v4` terbentuk di route manifest, HTTP 200, dan tidak mengubah 11 rute lain
- ✅ Kanvas benar-benar punya backing store (1265×720) dan menggambar piksel —
      bug awal di mana kanvas 0×0 (menggambar ke ruang kosong tanpa error) sudah diperbaiki
- ✅ Frame set desktop terpilih di viewport lebar (120 frame), mobile di sempit (60)
- ✅ Gate ter-render di HTML server, auto-dismiss pada 4 dtk, dan menulis `v4-gate-seen`
- ✅ Tombol Motion: `on` → gate tampil; `off` → gate `display:none`, figur diam
- ✅ Header & footer situs tersembunyi di `/v4`; satu `<h1>`; physical stats tidak muncul
      (benar — semua nilai masih null)

🔴 **Belum diverifikasi:** perilaku scroll yang sebenarnya. Preview pane di lingkungan sesi ini
tidak meng-compose frame, jadi `window.scrollTo` dan `requestAnimationFrame` tidak jalan sama
sekali — di rute `/` yang lama pun sama. **Pemetaan scroll → nomor frame belum pernah dilihat
bergerak.** Cek manual 30 detik yang Dex perlu lakukan:

1. `cd web && npm run dev` → buka `http://localhost:3000/v4`
2. Scroll pelan ke bawah. Angka di kanan layar harus naik `001 → 120` dan sosok wireframe
   harus memipih lalu naik keluar frame.
3. Scroll ke atas. Angka harus **turun kembali** ke `001`. Kalau iya, teori "1 sekuens cukup"
   terbukti di layar, bukan cuma di dokumen.

---

*Perubahan pada dokumen ini: catat tanggal + apa yang berubah di bagian bawah §7.*
