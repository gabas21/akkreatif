# DESIGN-SYSTEM.md — Sumber Kebenaran Desain
> **Otoritas tertinggi untuk semua keputusan visual.**
> Claude & AI lain WAJIB baca sebelum menyentuh apapun yang visual.
> Konflik antara file ini dan file lain → **FILE INI YANG MENANG.**

---

## 🎨 FILOSOFI DESAIN

**Elegan, Modern & Kreatif** — AK Kreatif adalah creative agency. Website harus memancarkan kreativitas dan profesionalisme sekaligus.

Prinsip utama:
- **Whitespace adalah kemewahan** — ruang kosong bukan pemborosan, itu napas desain
- **Tipografi = identitas** — hierarchy yang kuat, font yang berkarakter
- **Animasi = restraint** — subtle fade & slide, bukan bounce. Less is more.
- **Konsistensi tanpa kompromi** — spacing, radius, shadow SAMA di seluruh halaman
- **Dark contrast** — elemen kunci di atas latar gelap menciptakan kesan prestisius
- **Green = kreativitas & pertumbuhan** — hijau sebagai aksen, bukan dominan

---

## 🎨 PALET WARNA

```
Primary      : #0A0A0A  — Near Black (dominan, authority)
Secondary    : #16A34A  — Forest Green (aksen kreatif, CTA)
Accent       : #15803D  — Dark Green (hover state, depth)
Accent Light : #22C55E  — Emerald Green (highlight, glow)
Background   : #F9FAF9  — Warm White with subtle green tint
Surface      : #FFFFFF  — White (card, panel)
Surface Dark : #0D1F12  — Very Dark Green-Black (section gelap)
Border       : #E5E7EB  — Light border
Border Dark  : #1A2E1D  — Dark green border (pada section gelap)
Text Primary : #0A0A0A  — Hampir hitam
Text Muted   : #6B7280  — Abu-abu
Text Light   : #F0FDF4  — Teks pada bg gelap (green-tinted white)
Text Green   : #16A34A  — Teks aksen hijau
Success      : #10B981  — Emerald
Warning      : #F59E0B  — Amber
Danger       : #EF4444  — Red
```

**Token di `tailwind.config.js` (Tailwind v4 — CSS-first config):**

Karena Tailwind v4 menggunakan CSS-first configuration, token warna didefinisikan di `resources/css/app.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #0A0A0A;
  --color-secondary: #16A34A;
  --color-accent: #15803D;
  --color-accent-light: #22C55E;
  --color-background: #F9FAF9;
  --color-surface: #FFFFFF;
  --color-surface-dark: #0D1F12;
  --color-border: #E5E7EB;
  --color-border-dark: #1A2E1D;
  --color-text-primary: #0A0A0A;
  --color-text-muted: #6B7280;
  --color-text-light: #F0FDF4;
  --color-text-green: #16A34A;

  --font-display: "Outfit", sans-serif;
  --font-body: "Inter", sans-serif;

  --animate-fade-up: fadeUp 0.6s ease-out forwards;
  --animate-fade-in: fadeIn 0.5s ease-out forwards;
  --animate-slide-in: slideIn 0.5s ease-out forwards;

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-24px); }
    to { opacity: 1; transform: translateX(0); }
  }
}
```

> ⚠️ WAJIB pakai token — DILARANG hardcode hex langsung di JSX/CSS.

---

## 🔤 TIPOGRAFI

```
Font Display : Outfit — heading utama, section title, hero headline
Font Body    : Inter — body text, UI, label, button
Sumber       : Google Fonts

Import di resources/views/app.blade.php <head>:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Skala & Class Tailwind:**
```
Hero Headline  : font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight
Section Title  : font-display text-3xl md:text-4xl font-semibold tracking-tight
Card Title     : font-display text-xl md:text-2xl font-semibold
Subtitle       : font-body text-lg md:text-xl font-light text-text-muted
Body           : font-body text-base font-normal leading-relaxed text-text-primary
Small/Label    : font-body text-sm font-medium uppercase tracking-widest
Tiny           : font-body text-xs font-medium
Green Accent   : text-secondary (terapkan ke kata/frasa yang ingin diberi aksen hijau)
```

---

## 📐 SPACING & LAYOUT

```
Border radius  : rounded-3xl untuk kartu/gambar premium besar, rounded-2xl untuk card kecil
               : rounded-full untuk button / pill
Shadow standar : shadow-[0_4px_24px_rgba(0,0,0,0.06)] untuk card di bg terang
               : shadow-[0_4px_30px_rgba(0,0,0,0.2)] untuk card di bg gelap
Max width      : max-w-7xl mx-auto
Padding halaman: px-6 sm:px-8 lg:px-12
Gap section    : py-20 md:py-28 lg:py-32 (antar section, besar = mewah)
Gap konten     : space-y-6 atau gap-8
Divider        : <div class="w-16 h-1.5 rounded-full bg-secondary mx-auto my-6"></div>
```

---

## 🧩 REGISTRY KOMPONEN

> Cek di sini DULU sebelum buat komponen baru. Update setiap kali buat komponen baru.

### Layout Components

| Nama | File | Deskripsi |
|------|------|-----------|
| `MainLayout` | `Layouts/MainLayout.jsx` | Navbar + Footer untuk semua halaman publik |
| `Navbar` | `Components/Layout/Navbar.jsx` | Navigasi utama dengan scroll effect |
| `Footer` | `Components/Layout/Footer.jsx` | Footer lengkap dengan link dan info kontak |

### Section Components

| Nama | File | Halaman |
|------|------|---------|
| _(belum ada — update setiap kali section dibuat)_ | | |

### Common Components

| Nama | File | Deskripsi | Props |
|------|------|-----------|-------|
| _(belum ada — update setiap kali komponen dibuat)_ | | | |

---

## 📄 REGISTRY HALAMAN

| Route Name | URL | File | Status |
|---|---|---|---|
| `home` | `/` | `Pages/Home.jsx` | ⏳ Belum |
| `about` | `/about` | `Pages/About.jsx` | ⏳ Belum |
| `services` | `/services` | `Pages/Services.jsx` | ⏳ Belum |
| `portfolio` | `/portfolio` | `Pages/Portfolio.jsx` | ⏳ Belum |
| `contact` | `/contact` | `Pages/Contact.jsx` | ⏳ Belum |

---

## 🔘 PANDUAN KOMPONEN UI

### Button

```jsx
{/* Primary — CTA utama */}
<button className="bg-secondary text-white px-8 py-3.5 text-sm font-body font-medium
  uppercase tracking-widest hover:bg-accent
  transition-all duration-300 border border-secondary hover:border-accent">
  Hubungi Kami
</button>

{/* Secondary / Ghost */}
<button className="border border-primary text-primary px-8 py-3.5 text-sm font-body
  font-medium uppercase tracking-widest hover:bg-primary hover:text-text-light
  transition-all duration-300">
  Lihat Portfolio
</button>

{/* Green Outline */}
<button className="border border-secondary text-secondary px-8 py-3.5 text-sm font-body
  font-medium uppercase tracking-widest hover:bg-secondary hover:text-white
  transition-all duration-300">
  Pelajari Lebih Lanjut
</button>
```

### Section Title (Pattern Standar)

```jsx
{/* Gunakan pola ini untuk semua section title */}
<div className="text-center mb-16">
  <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-secondary">
    Label Section
  </span>
  <div className="w-8 h-px bg-secondary mx-auto my-3"></div>
  <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mt-4">
    Judul Section Utama
  </h2>
  <p className="font-body text-text-muted mt-4 max-w-xl mx-auto leading-relaxed">
    Deskripsi singkat section ini.
  </p>
</div>
```

### Card

```jsx
{/* Card terang */}
<div className="bg-surface border border-border p-8
  hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
  hover:-translate-y-1 transition-all duration-300">
  {/* konten */}
</div>

{/* Card gelap (untuk section dark) */}
<div className="bg-surface-dark border border-border-dark p-8
  hover:border-secondary transition-all duration-300">
  {/* konten */}
</div>
```

### Input / Form

```jsx
<div className="space-y-1">
  <label className="font-body text-xs font-medium uppercase tracking-widest text-text-muted">
    Nama Lengkap
  </label>
  <input
    type="text"
    className="w-full border-b border-border bg-transparent px-0 py-3
      font-body text-text-primary placeholder:text-gray-300
      focus:outline-none focus:border-secondary transition-colors duration-200"
    placeholder="Masukkan nama Anda"
  />
</div>
```

### Green Divider

```jsx
{/* Pemisah visual elegan */}
<div className="flex items-center gap-4 my-8">
  <div className="flex-1 h-px bg-border"></div>
  <div className="w-1.5 h-1.5 bg-secondary rotate-45"></div>
  <div className="flex-1 h-px bg-border"></div>
</div>
```

### Stat Card

```jsx
<div className="text-center">
  <span className="font-display text-5xl font-bold text-primary">250<span className="text-secondary">+</span></span>
  <div className="w-8 h-px bg-secondary mx-auto my-3"></div>
  <p className="font-body text-sm uppercase tracking-widest text-text-muted">Proyek Selesai</p>
</div>
```

### Badge

```jsx
{/* Kategori / tag */}
<span className="inline-block border border-secondary text-secondary
  px-3 py-1 text-xs font-body font-medium uppercase tracking-widest">
  Web Development
</span>
```

---

## 🎬 POLA ANIMASI

### Scroll Reveal Hook

```jsx
// hooks/useIntersection.js
import { useEffect, useRef, useState } from 'react'

export function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15, ...options })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}
```

### Penggunaan di Komponen

```jsx
import { useIntersection } from '@/hooks/useIntersection'

function ServiceCard({ title, description }) {
  const [ref, isVisible] = useIntersection()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 delay-100
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {/* konten */}
    </div>
  )
}
```

### Stagger (untuk list/grid)

```jsx
{items.map((item, i) => {
  const [ref, isVisible] = useIntersection()
  return (
    <div
      key={item.id}
      ref={ref}
      style={{ transitionDelay: `${i * 100}ms` }}
      className={`transition-all duration-600
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* konten */}
    </div>
  )
})}
```

---

## 📝 CATATAN KEPUTUSAN DESAIN

| Tanggal | Keputusan | Alasan |
|---|---|---|
| 16 Apr 2026 | Hijau Forest + Hitam (bukan Gold) | Brand AK Kreatif — hijau = kreativitas & pertumbuhan |
| 16 Apr 2026 | Outfit + Inter (bukan Playfair + DM Sans) | Lebih modern & tech-savvy untuk creative agency |
| 16 Apr 2026 | Sharp corners (bukan rounded) | Memberikan kesan tegas, profesional, premium |
| 16 Apr 2026 | Underline input style | Lebih elegan dari border-box biasa |
| 16 Apr 2026 | Hijau sebagai aksen, bukan dominan | Hijau yang terlalu banyak terlihat childish |
| 16 Apr 2026 | Section gelap selang-seling | Menciptakan ritme visual dan mencegah monoton |
| 16 Apr 2026 | Tailwind v4 CSS-first config | Proyek pakai Laravel 13 + Tailwind v4 (lebih modern) |

---

## ⚠️ ATURAN PENGGUNAAN

1. Cek Registry komponen DULU sebelum buat yang baru
2. Update Registry setelah buat komponen/halaman baru
3. Warna baru → tambah ke @theme di app.css dan palet di sini, jangan hardcode
4. File ini menang atas semua file lain dalam soal desain
5. Ingin ubah palet/font → tampilkan alasan, tunggu konfirmasi user
