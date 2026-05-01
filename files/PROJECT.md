# PROJECT.md — Konteks Proyek
> Isi file ini sekali di awal. Update bagian **PROGRESS SAAT INI** setiap akhir sesi.

---

## 🏷️ IDENTITAS PROYEK

```
Nama Proyek    : AK Kreatif — Company Profile
Jenis Web      : company-profile
Tagline        : Kreativitas Tanpa Batas, Solusi Tanpa Henti
Target Selesai : 30 hari dari 16 April 2026
Tanggal Mulai  : 16 April 2026
Client         : AK Kreatif
Industri       : Web Development & Creative Design
```

---

## 📄 HALAMAN YANG DIBUTUHKAN

```
Halaman Publik:
[x] Home / Landing Page
    └─ Hero section (headline + CTA)
    └─ About snapshot (ringkasan perusahaan)
    └─ Services highlight (6 layanan unggulan)
    └─ Stats / Achievement (angka pencapaian)
    └─ Portfolio / Project showcase
    └─ Testimonial
    └─ CTA akhir + kontak cepat

[x] About / Tentang Kami
    └─ Visi & Misi
    └─ Sejarah perusahaan
    └─ Nilai-nilai perusahaan
    └─ Tim / Struktur organisasi

[x] Services / Layanan
    └─ Daftar semua layanan (6 layanan)
    └─ Detail per layanan

[x] Portfolio / Proyek
    └─ Grid proyek dengan filter kategori
    └─ Detail proyek (opsional)

[x] Contact / Kontak
    └─ Formulir kontak (nama, email, pesan)
    └─ Info kontak (alamat, telepon, email)
    └─ Peta lokasi (Google Maps embed)

[ ] Blog / Artikel (opsional — nanti)
[ ] Admin Panel (opsional — nanti)
```

---

## 🎨 DESAIN & TAMPILAN

```
Nuansa          : Elegan, Modern & Premium — Tegas dengan sentuhan kreatif
Stack Frontend  : React 19 + Inertia.js + Shadcn/ui + Tailwind CSS v4
Target Perangkat: Desktop utama, mobile responsive

Palet Warna     :
  Primary       : #0A0A0A — Near Black (dominan, authority)
  Secondary     : #16A34A — Forest Green (aksen kreatif)
  Accent        : #15803D — Dark Green (hover state)
  Background    : #F9FAF9 — Warm White with green tint
  Surface       : #FFFFFF — White (card, panel)
  Surface Dark  : #0D1F12 — Very Dark Green-Black (section gelap)
  Text Primary  : #0A0A0A
  Text Muted    : #6B7280
  Text Light    : #F0FDF4 — Teks pada bg gelap

Font            : Outfit (heading) + Inter (body) — Google Fonts
```

---

## 🗂️ KONTEN PERUSAHAAN

```
Nama Perusahaan : AK Kreatif
Bidang Usaha    : Web Development & Creative Design Agency
Tahun Berdiri   : 2020
Tagline         : Kreativitas Tanpa Batas, Solusi Tanpa Henti
Layanan Utama   :
  1. Web Development   — Membangun website modern, cepat & scalable
  2. Web Design        — Desain UI/UX elegan untuk website & aplikasi
  3. Web Redesign      — Transformasi tampilan website lama menjadi modern
  4. Photography       — Pemotretan profesional untuk produk dan event
  5. Graphic Design    — Desain grafis untuk brand identity & marketing material
  6. Videography       — Produksi video profesional & motion graphic
  7. Event Organizer   — Penyelenggara event kreatif & profesional
Keunggulan      : Satu agensi, semua kebutuhan kreatif — dari web hingga event
Target Klien    : UMKM, startup, perusahaan yang butuh transformasi digital & kreatif
Alamat          : [isi]
Telepon         : [isi]
Email           : [isi]
```

---

## 📊 DATABASE

```
Tabel yang akan dibutuhkan nanti:
• company_info   : nama, tagline, about, alamat, telepon, email, logo
• services       : id, title, description, icon, order
• portfolios     : id, title, category, description, image, client, year
• team_members   : id, name, position, photo, bio, order
• testimonials   : id, name, company, content, photo, rating
• contact_messages : id, name, email, phone, message, created_at
```

---

## 📈 PROGRESS SAAT INI

> **Update bagian ini setiap akhir sesi.**

```
Fase saat ini         : Fase 2 — Halaman Home (SELESAI)
Yang sudah jalan      : Halaman Home utuh dengan 7 UI section terintegrasi + animasi Scroll Reveal + modal video profil.
Yang sedang dikerjakan: Transisi ke Fase 3
Blocking / stuck      : —
Target sesi ini       : Melangkah ke Fase 3 (Halaman Dalam)
```

---

## 📅 ROADMAP

```
Fase 1 — Setup & Fondasi (Hari 1-3) ← SEKARANG
  • Install Laravel Breeze (React preset) + Inertia + Shadcn/ui
  • Setup tailwind.config.js dengan token warna hijau + hitam
  • Buat MainLayout (Navbar + Footer)
  • Route & Controller untuk semua halaman

Fase 2 — Halaman Home (Hari 4-8)
  • Hero Section — headline, subtext, CTA, visual
  • About Snapshot Section
  • Services Highlight Section (6 layanan)
  • Stats / Achievement Section
  • Portfolio Preview Section
  • Testimonial Section
  • CTA Footer Section

Fase 3 — Halaman Dalam (Hari 9-15)
  • Halaman About lengkap
  • Halaman Services lengkap
  • Halaman Portfolio + filter kategori
  • Halaman Contact + form kirim pesan

Fase 4 — Polish & Animasi (Hari 16-20)
  • Scroll reveal animations
  • Hover interactions
  • Loading states
  • Responsive audit mobile

Fase 5 — Admin Panel (Hari 21-30) [opsional]
  • Auth admin
  • CRUD konten (services, portfolio, team)
  • Kelola pesan masuk dari form kontak
```

---

## 🗒️ CATATAN TAMBAHAN

```
- Stack: Laravel 13 (bukan 11) + Tailwind v4 (bukan v3) — lebih modern, OK
- Laravel 13 sudah punya React starter kit built-in (Inertia + React 19 + Shadcn)
- Warna: Hijau Forest + Hitam Near Black — tegas, kreatif, premium
- Logo: belum ada (dibuat placeholder dulu)
- Referensi desain: agency kreatif modern (dark/green aesthetic)
```
