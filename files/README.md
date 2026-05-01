# File System — LIRT Stack · Company Profile

> Panduan lengkap untuk membangun company profile elegan dengan Laravel + Inertia + React + Tailwind.

---

## 📦 ISI PAKET INI

| File | Fungsi |
|------|--------|
| `CONTEXT.md` | Pintu masuk — lampirkan di setiap sesi |
| `CLAUDE.md` | Panduan coding lengkap untuk Claude |
| `PROJECT.md` | Identitas proyek + progress per sesi |
| `DESIGN-SYSTEM.md` | Token warna, font, komponen — otoritas desain |
| `HANDOFF.md` | Blueprint + log antar sesi/AI |

---

## 🚀 CARA MULAI

### Langkah 1 — Isi PROJECT.md
Buka `PROJECT.md` dan isi bagian **IDENTITAS PROYEK** dan **KONTEN PERUSAHAAN**.
Minimal isi: nama proyek, nama perusahaan, bidang usaha, layanan utama.

### Langkah 2 — Tentukan Warna (opsional tapi dianjurkan)
Di `DESIGN-SYSTEM.md` bagian **PALET WARNA**, ganti warna default dengan warna brand perusahaan jika sudah ada.

### Langkah 3 — Mulai Sesi Pertama
Lampirkan ke Claude:
- `CONTEXT.md`
- `CLAUDE.md`
- `PROJECT.md`

Lalu ketik: `/init`

Claude akan membaca semua file, membuat anchor sesi, dan siap mulai coding.

---

## 🔄 ALUR KERJA HARIAN

```
Mulai sesi → lampirkan CONTEXT.md + PROJECT.md + HANDOFF.md → ketik /next
Kerja...
Akhir sesi → Claude update PROJECT.md bagian Progress → simpan HANDOFF.md
```

---

## 🌟 STACK YANG DIGUNAKAN

**LIRT Stack:**
- **L**aravel 11 — Backend, routing, database
- **I**nertia.js v2 — Jembatan Laravel & React (tanpa API)
- **R**eact 18 — Frontend komponen
- **T**ailwind CSS v3 + Shadcn/ui — Styling

**Kenapa LIRT lebih baik dari TALL untuk tampilan premium?**

| | TALL (Livewire) | LIRT (React) |
|---|---|---|
| Tampilan | Blade/HTML | React komponen |
| Interaktivitas | Server-side | Client-side, lebih fluid |
| Animasi | Terbatas | Bebas, lebih kaya |
| Komponen UI | Manual | Shadcn/ui siap pakai |
| Developer Experience | Familiar PHP | Modern, ekosistem luas |
| Cocok untuk | CRUD apps | Interface-heavy apps |

---

## 📋 SLASH COMMANDS PENTING

| Command | Kapan dipakai |
|---|---|
| `/init` | Pertama kali mulai proyek |
| `/next` | Lanjut sesi berikutnya |
| `/new-page [nama]` | Buat halaman baru (React + route + controller) |
| `/new-section [nama]` | Buat section baru di halaman |
| `/fix-ui [file]` | Perbaiki tampilan |
| `/stuck [error]` | Debug dengan konteks proyek |
| `/analisis-referensi [url]` | Analisis website referensi |
| `/handoff` | Pindah ke AI lain atau akhir sesi panjang |

---

## 🗂️ STRUKTUR FOLDER PROYEK NANTI

```
resources/js/
  Components/
    Layout/         ← Navbar, Footer
    Sections/       ← HeroSection, AboutSection, ServicesSection, dll
    Common/         ← SectionTitle, AnimatedCard, GoldDivider, dll
    ui/             ← Shadcn/ui (auto-generate)
  Layouts/
    MainLayout.jsx
  Pages/
    Home.jsx
    About.jsx
    Services.jsx
    Portfolio.jsx
    Contact.jsx
  hooks/
    useIntersection.js   ← Scroll reveal
  lib/
    utils.js
  app.jsx

app/Http/Controllers/
  PageController.php
  ContactController.php

routes/
  web.php
```
