# -*- coding: utf-8 -*-
"""
Convert all .jpg / .jpeg files in public/images to .webp
- Quality: 85 (good balance antara kualitas dan ukuran)
- Setelah convert sukses, file JPG asli DIHAPUS
- Print ringkasan sebelum/sesudah
"""

import sys
import os
from pathlib import Path
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

PUBLIC_IMAGES = Path(__file__).parent.parent / "public" / "images"

def convert_jpg_to_webp(jpg_path: Path, quality: int = 85) -> dict:
    webp_path = jpg_path.with_suffix(".webp")
    try:
        with Image.open(jpg_path) as img:
            # Convert ke RGB kalau ada alpha channel (RGBA)
            if img.mode in ("RGBA", "LA", "P"):
                img = img.convert("RGB")
            img.save(webp_path, "WEBP", quality=quality, method=6)

        original_size = jpg_path.stat().st_size
        webp_size = webp_path.stat().st_size
        reduction = (1 - webp_size / original_size) * 100

        # Hapus JPG asli setelah berhasil convert
        jpg_path.unlink()

        return {
            "status": "ok",
            "original": str(jpg_path.relative_to(PUBLIC_IMAGES.parent.parent)),
            "webp": str(webp_path.relative_to(PUBLIC_IMAGES.parent.parent)),
            "original_kb": round(original_size / 1024),
            "webp_kb": round(webp_size / 1024),
            "reduction_pct": round(reduction, 1),
        }
    except Exception as e:
        return {
            "status": "error",
            "original": str(jpg_path),
            "error": str(e),
        }


def main():
    jpg_files = list(PUBLIC_IMAGES.rglob("*.jpg")) + list(PUBLIC_IMAGES.rglob("*.jpeg"))

    if not jpg_files:
        print("✅ Tidak ada file .jpg / .jpeg ditemukan di public/images")
        return

    print(f"🔍 Ditemukan {len(jpg_files)} file JPG\n")
    print(f"{'File':<70} {'Sebelum':>10} {'Sesudah':>10} {'Hemat':>8}")
    print("-" * 102)

    total_before = 0
    total_after = 0
    errors = []

    for jpg in sorted(jpg_files):
        result = convert_jpg_to_webp(jpg)
        if result["status"] == "ok":
            total_before += result["original_kb"]
            total_after += result["webp_kb"]
            rel = result["webp"].replace("\\", "/")
            print(f"  ✅ {rel:<67} {result['original_kb']:>8} KB  {result['webp_kb']:>8} KB  {result['reduction_pct']:>6}%")
        else:
            errors.append(result)
            print(f"  ❌ {result['original']} — {result['error']}")

    print("-" * 102)
    total_saved = total_before - total_after
    total_pct = round((1 - total_after / total_before) * 100, 1) if total_before > 0 else 0
    print(f"\n📊 RINGKASAN:")
    print(f"   Total sebelum : {total_before:,} KB ({round(total_before/1024, 1)} MB)")
    print(f"   Total sesudah : {total_after:,} KB ({round(total_after/1024, 1)} MB)")
    print(f"   Penghematan   : {total_saved:,} KB ({round(total_saved/1024, 1)} MB) — {total_pct}%")
    print(f"   File diproses : {len(jpg_files) - len(errors)} berhasil, {len(errors)} gagal")

    if errors:
        print(f"\n⚠️  File yang gagal:")
        for e in errors:
            print(f"   - {e['original']}: {e['error']}")


if __name__ == "__main__":
    main()
