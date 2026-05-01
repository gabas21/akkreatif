# CONTEXT.md — Pintu Masuk
> Lampirkan file ini DI SETIAP SESI. Baca ini PERTAMA sebelum file lain.

---

## ⚡ BACA CEPAT (30 detik)

1. Buka `PROJECT.md` → bagian **PROGRESS SAAT INI** → kamu tahu posisi proyek
2. Buka `HANDOFF.md` → bagian **FASE AKTIF** → kamu tahu apa yang dikerjakan
3. Sekarang kamu siap. Sisanya baca kalau butuh detail.

---

## 📂 URUTAN BACA FILE

```
WAJIB setiap sesi:
  1. CONTEXT.md        ← ini
  2. PROJECT.md        ← bagian PROGRESS SAAT INI saja
  3. HANDOFF.md        ← bagian FASE AKTIF + STATUS FASE TERAKHIR

Baca kalau relevan:
  4. CLAUDE.md         ← aturan coding (Claude saja)
  5. DESIGN-SYSTEM.md  ← kalau menyentuh UI/tampilan

Baca kalau butuh detail:
  6. tasks/lessons.md  ← ada error atau cek keputusan lama
  7. tasks/progress.md ← checklist lengkap
```

> ⚠️ Jangan baca semua file sekaligus. Berhenti saat sudah cukup untuk mulai kerja.

---

## 🚀 SHORTCUT MULAI SESI

| Kondisi | File yang dilampirkan | Command |
|---|---|---|
| Proyek baru | `CONTEXT.md` + `PROJECT.md` | `/init` |
| Sesi lanjutan | `CONTEXT.md` + `PROJECT.md` + `HANDOFF.md` | `/next` |
| Lanjut dari AI lain | `CONTEXT.md` + `PROJECT.md` + `HANDOFF.md` + `DESIGN-SYSTEM.md` | `/next` |
| Ada error | `CONTEXT.md` + `PROJECT.md` + file error | `/stuck [error]` |
| Mau desain dulu | `CONTEXT.md` + `DESIGN-SYSTEM.md` | `/fix-ui [nama halaman]` |

---

## 🔒 HIERARKI OTORITAS

```
HANDOFF.md        ← blueprint dikunci, jangan pernah override
    ↓
DESIGN-SYSTEM.md  ← otoritas tertinggi untuk visual
    ↓
PROJECT.md        ← konteks & progress proyek
    ↓
Kode yang jalan   ← jangan rusak yang sudah berjalan
    ↓
Opini AI          ← terendah
```

---

## 🧱 STACK SEKILAS

```
Backend  : Laravel 11
Routing  : Inertia.js v2 (jembatan Laravel ↔ React)
Frontend : React 18 (bukan Blade/Livewire)
Styling  : Tailwind CSS v3 + Shadcn/ui
Build    : Vite
```

**Cara kerja Inertia:**
Controller Laravel → `Inertia::render('NamaHalaman', $data)` → React menerima sebagai props
Tidak ada API endpoint — Laravel & React berkomunikasi langsung via Inertia.
