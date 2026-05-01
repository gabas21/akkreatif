# CLAUDE.md — LIRT Stack · Company Profile
> Panduan utama coding untuk Claude. Lampirkan file ini + `PROJECT.md` setiap sesi.
> Ketik `/init` untuk mulai, `/next` untuk lanjut sesi.

---

## ⚡ MULAI CEPAT

| Kondisi | File dilampirkan | Command |
|---|---|---|
| Proyek baru | `CLAUDE.md` + `PROJECT.md` | `/init` |
| Sesi lanjutan | `CLAUDE.md` + `PROJECT.md` + `HANDOFF.md` | `/next` |
| Ada error | file error + `CLAUDE.md` | `/stuck [paste error]` |
| Pindah AI | `HANDOFF.md` + `DESIGN-SYSTEM.md` | `/handoff` |

---

## 📂 PETA FILE

| File | Isi |
|---|---|
| `CLAUDE.md` | Panduan utama coding (ini) |
| `PROJECT.md` | Identitas proyek + progress per sesi |
| `HANDOFF.md` | Blueprint dikunci + log antar sesi/AI |
| `DESIGN-SYSTEM.md` | Token warna, font, komponen — otoritas tertinggi UI |
| `tasks/lessons.md` | Error & keputusan teknis yang sudah dipelajari |
| `tasks/progress.md` | Checklist progress per fase |

**Hierarki otoritas:** `HANDOFF.md` → `DESIGN-SYSTEM.md` → `PROJECT.md` → kode jalan → opini AI

---

## ⚙️ STACK — LIRT

```
L — Laravel 11
I — Inertia.js v2
R — React 18 (JavaScript, bukan TypeScript untuk simplisitas)
T — Tailwind CSS v3 + Shadcn/ui
Auth   — Laravel Breeze (Inertia + React) → untuk admin panel nanti
Build  — Vite
```

### Setup Awal Proyek Baru
```bash
composer create-project laravel/laravel nama-proyek
cd nama-proyek
composer require laravel/breeze --dev
php artisan breeze:install react          # pilih "React" saat ditanya
npm install
npm run dev                               # buka terminal baru
php artisan serve
```

### Setup Shadcn/ui (setelah Breeze terpasang)
```bash
npx shadcn@latest init
# Pilihan: Style=Default, BaseColor=Slate, CSSvariables=Yes
npx shadcn@latest add button card badge separator sheet dialog
npx shadcn@latest add navigation-menu dropdown-menu accordion
npx shadcn@latest add form input textarea label toast
```

### Perintah Harian
```bash
php artisan serve                         # jalankan backend
npm run dev                               # jalankan Vite (wajib bersamaan)
php artisan migrate                       # jalankan migrasi
php artisan optimize:clear                # bersihkan semua cache
php artisan make:model NamaModel -mc      # model + migration + controller
php artisan make:controller NamaController --resource
```

---

## 📐 STRUKTUR FOLDER

```
resources/js/
  Components/
    ui/               ← Shadcn/ui (auto-generate, JANGAN edit manual)
    Layout/           ← Navbar, Footer, komponen layout
    Sections/         ← Section per halaman (Hero, About, Services, dll)
    Common/           ← Komponen reusable (SectionTitle, AnimatedCard, dll)
  Layouts/
    MainLayout.jsx    ← Layout utama public (Navbar + Footer)
    AdminLayout.jsx   ← Layout admin (nanti)
  Pages/
    Home.jsx          ← Landing page utama
    About.jsx         ← Halaman tentang perusahaan
    Services.jsx      ← Halaman layanan
    Portfolio.jsx     ← Halaman portofolio/proyek
    Contact.jsx       ← Halaman kontak
    Admin/            ← (nanti) Halaman admin
  hooks/              ← Custom hooks (useScrollAnimation, useIntersection, dll)
  lib/
    utils.js          ← Helper: cn(), formatDate(), dll
  app.jsx             ← Entry point Inertia

app/Http/Controllers/
  PageController.php  ← Controller untuk semua halaman publik
  Admin/              ← (nanti) Controller admin

routes/
  web.php             ← Semua route publik + auth
```

---

## 📏 ATURAN CODING

### React + Inertia
- Setiap halaman = file di `Pages/` → dipanggil via `Inertia::render('Home', $data)` dari controller
- Props dari Laravel diterima sebagai props React: `function Home({ company, services }) {}`
- Gunakan `<Link href={route('nama.route')}>` dari `@inertiajs/react` — bukan `<a>` biasa
- Navigasi tanpa full reload: `router.visit()` atau `<Link>`
- Head/meta tag: pakai `<Head title="Halaman" />` dari Inertia

### Komponen
- Satu file = satu komponen
- Section besar (Hero, About, dll) taruh di `Components/Sections/`
- Komponen reusable kecil taruh di `Components/Common/`
- Jangan duplikasi — cek `DESIGN-SYSTEM.md` Registry dulu

### Tailwind
- DILARANG hardcode warna hex langsung di JSX — pakai token dari `tailwind.config.js`
- Mobile-first: tanpa prefix → `sm:` → `md:` → `lg:`
- Animasi/transisi: manfaatkan `transition-all duration-300` + custom keyframes di config

### Animasi & Feel Premium
- Scroll reveal: pakai Intersection Observer via custom hook `useIntersection`
- Hover efek: scale, shadow elevation, color shift — konsisten di seluruh komponen
- Loading state: skeleton atau fade-in — jangan konten langsung muncul kasar
- Smooth scroll: aktifkan di `html { scroll-behavior: smooth }`

### Laravel (Backend)
- Controller hanya kirim data ke Inertia — logika berat di Model/Service
- Relasi Eloquent → wajib `with()`, hindari N+1
- URL → pakai `route()`, `asset()` — jangan hardcode
- Gambar/media → simpan di `storage/app/public`, akses via `Storage::url()`

---

## 🎨 FILOSOFI DESAIN — Elegan & Premium

> Ini company profile. Kesan pertama = segalanya. Setiap piksel harus berbicara kualitas.

- **Whitespace adalah kemewahan** — jangan takut ruang kosong, justru itu yang membuat premium
- **Tipografi = 60% keindahan** — pilih font yang berkarakter, hierarchy yang jelas
- **Animasi subtle** — fade, slide pelan, bukan bounce atau flash. Elegant = restraint.
- **Konsistensi** — spacing, radius, shadow harus sama di seluruh halaman
- **Above the fold** — bagian pertama yang dilihat harus langsung "wow"

---

## 📋 SLASH COMMANDS

| Command | Fungsi |
|---|---|
| `/init` | Mulai proyek baru — baca semua file, buat anchor sesi |
| `/next` | Lanjut dari sesi terakhir |
| `/new-page [nama]` | Buat halaman React baru + route + controller |
| `/new-section [nama]` | Buat komponen section baru |
| `/new-component [nama]` | Buat komponen React reusable |
| `/fix-ui [file]` | Perbaiki & tingkatkan tampilan |
| `/stuck [error]` | Debug dengan konteks proyek |
| `/review [file]` | Review kode + saran improvement |
| `/tambah-fitur [deskripsi]` | Impact analysis sebelum coding |
| `/handoff` | Siapkan pindah ke AI lain → update HANDOFF.md |
| `/deploy-check` | Checklist kesiapan hosting |
| `/analisis-referensi [url]` | Analisis referensi visual — ekstrak design DNA |

---

## 📊 ANCHOR SESI
> Isi ini di awal setiap sesi setelah baca PROJECT.md dan HANDOFF.md.

```
PROYEK    : [nama proyek]
FASE      : [fase berapa, nama fase]
DIKERJAKAN: [fitur/halaman apa]
TERAKHIR  : [file terakhir yang disentuh]
SEKARANG  : [apa yang dikerjakan sesi ini]
JANGAN    : [hal yang tidak boleh diubah]
```

---

## 💾 MANAJEMEN SESI

- **Satu sesi = satu halaman atau satu fitur**
- Stuck >1 jam → `/stuck [paste error]`
- Sesi mulai panjang → `/handoff` sebelum konteks habis
- Lampirkan **hanya file yang relevan** — jangan dump seluruh codebase

---

## 🤝 UNTUK GEMINI / AI LAIN

Saat menerima handoff dari Claude:
1. Baca `HANDOFF.md` → **BLUEPRINT PROYEK** + **FASE AKTIF** + **STATUS FASE TERAKHIR**
2. Baca `PROJECT.md` → **PROGRESS SAAT INI**
3. Baca `DESIGN-SYSTEM.md` → otoritas tertinggi soal tampilan
4. Konfirmasi ke user:
   ```
   📋 Sudah baca HANDOFF.md
   Blueprint     : [ringkasan arsitektur]
   Fase selesai  : [fase yang sudah done]
   Melanjutkan   : [apa yang dikerjakan]
   Siap lanjut?
   ```

**Aturan wajib:**
- Jangan ubah kode yang sudah jalan kecuali diminta
- Jangan ambil keputusan arsitektur baru tanpa tanya user
- Ikuti semua token di `DESIGN-SYSTEM.md` — jangan hardcode warna
- Update `DESIGN-SYSTEM.md` Registry setiap buat komponen/halaman baru
