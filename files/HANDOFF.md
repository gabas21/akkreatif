# HANDOFF.md — Jembatan Antar Sesi & AI
> Dibaca pertama kali setiap pindah AI atau mulai sesi baru.
> AI penerima handoff wajib baca dari atas ke bawah sebelum melakukan apapun.

---

## 🗺️ BLUEPRINT PROYEK
> ⚠️ Bagian ini TIDAK BOLEH dihapus atau diubah. Ini fondasi permanen dari `/init`.

```
Proyek   : AK Kreatif
Jenis    : Company Profile — Elegan, Modern & Kreatif
Client   : AK Kreatif
Stack    : LIRT — Laravel 13 · Inertia.js v2 · React 19 · Tailwind v4 + Shadcn/ui
Auth     : Laravel Breeze (React Preset) — diaktifkan saat admin panel dibangun
Warna    : Hijau Forest (#16A34A) & Hitam (#0A0A0A)
```

### Arsitektur Routing
```
Semua halaman publik → PageController.php → Inertia::render()
Route publik di routes/web.php:
  GET /           → PageController@home     → Pages/Home.jsx
  GET /about      → PageController@about    → Pages/About.jsx
  GET /services   → PageController@services → Pages/Services.jsx
  GET /portfolio  → PageController@portfolio→ Pages/Portfolio.jsx
  GET /contact    → PageController@contact  → Pages/Contact.jsx
  POST /contact   → ContactController@store → kirim email + simpan DB
```

### Database — Tabel & Kolom Kunci
```
• contact_messages : id, name, email, phone, message, read_at, created_at
• services         : id, title, description, icon, order, is_active
• portfolios       : id, title, category, description, image, client, year, order
• team_members     : id, name, position, photo, bio, order
• testimonials     : id, name, company, content, avatar, rating, is_active
```

### Keputusan Arsitektur
```
• Fase 1-4: Frontend statis — data di-hardcode di Controller atau JSON
• Fase 5+: Admin panel — data pindah ke DB, Controller fetch dari Model
• Email kontak: Laravel Mail + SMTP
• Gambar: disimpan di storage/app/public, diakses via Storage::url()
• Animasi: Intersection Observer murni (tanpa library tambahan) untuk performa
• Tailwind v4 menggunakan konfigurasi CSS-first di app.css.
```

### Roadmap
```
Fase 1 — Setup & Fondasi          : Install, config, layout, routing
Fase 2 — Halaman Home             : 7 section lengkap
Fase 3 — Halaman Dalam            : About, Services, Portfolio, Contact
Fase 4 — Polish & Animasi         : Scroll reveal, hover, responsive audit
Fase 5 — Admin Panel (opsional)   : Auth, CRUD konten, kelola pesan
```

---

## 📌 FASE AKTIF

```
Fase   : Fase 2 — Halaman Home
Status : Selesai
```

---

## 📦 STATUS FASE TERAKHIR
> Diisi otomatis setiap fase selesai.

```
Fase Selesai    : Fase 2 — Halaman Home
Tanggal         : 16 April 2026
Dikerjakan oleh : Antigravity
```

### File Dibuat/Diubah
```
- resources/js/Components/Sections/Home/HeroSection.jsx
- resources/js/Components/Sections/Home/AboutSnapshot.jsx
- resources/js/Components/Sections/Home/ServicesHighlight.jsx
- resources/js/Components/Sections/Home/StatsSection.jsx
- resources/js/Components/Sections/Home/PortfolioPreview.jsx
- resources/js/Components/Sections/Home/TestimonialSection.jsx
- resources/js/Components/Sections/Home/CtaSection.jsx
- resources/js/Pages/Home.jsx
```

### Keputusan Arsitektur Tambahan
```
- Menggunakan Custom Hook `useIntersection` untuk Intersection Observer (efek Scroll Reveal yang smooth di seluruh elemen tanpa dependency tambahan).
- Membuat Modal overlay statis terpisah untuk menampung iframe Video Profile YouTube di HeroSection.
- Memisahkan logic dan struktur HTML Home ke dalam 7 file komponen section agar maintainability terjaga dengan baik.
```

### Yang Belum Selesai + Alasan
```
- Konten teks detail dan gambar orisinil masih placeholder (lorem ispum dan Unsplash) dan perlu disesuaikan dengan konten aslinya.
- Tombol navigasi mobile masih sebatas icon belum ada interaksi menu pop-up.
```

### Next Step
```
Lanjut ke Fase 3 — Halaman Dalam (Memecah halaman About, Services, Portfolio, Contact secara utuh dengan konten masing-masing).
```

---

## 📝 LOG PERUBAHAN ANTAR FASE
> Entri terbaru selalu di paling atas.

```
[16 Apr 2026] Menyelesaikan Fase 2: Pembangunan Halaman Home terintegrasi dengan 7 section, modal profil YouTube, animasi Scroll Reveal berpemacu Intersection Observer, dan grid layout responsif.
[16 Apr 2026] Menyelesaikan setup awal (Fase 1). Install Laravel Breeze (React), setup layout, routing, placeholder 5 halaman publik statis, konfigurasi Tailwind tema Hijau/Hitam.
```

---

## 💬 UNTUK AI PENERIMA HANDOFF

1. Baca **BLUEPRINT PROYEK** → pahami arsitektur dan keputusan yang sudah dibuat
2. Baca **STATUS FASE TERAKHIR** → tahu persis di mana proyek berhenti
3. Baca `DESIGN-SYSTEM.md` → jangan buat keputusan visual tanpa baca ini
4. Konfirmasi ke user:
   ```
   📋 Sudah baca HANDOFF.md
   Blueprint     : LIRT Stack, Company Profile Elegan & Kreatif (Green & Black)
   Fase selesai  : Fase 1 (Setup)
   Melanjutkan   : Fase 2 (Halaman Home)
   Siap lanjut?
   ```
5. Jangan pernah ubah **BLUEPRINT PROYEK** — itu referensi permanen
6. Update file ini setiap kali fase selesai atau keputusan arsitektur baru dibuat
