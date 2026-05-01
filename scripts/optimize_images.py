"""
Optimize large portfolio images menggunakan Pillow.
Target: convert ke WebP dengan quality 82, max width 1200px.
"""
import os
from PIL import Image

IMG_DIR = os.path.join('..', 'public', 'images')
THRESHOLD_KB = 300  # optimasi file > 300KB
TARGET_QUALITY = 82
MAX_WIDTH = 1200

total_saved = 0
optimized = 0

for root, dirs, files in os.walk(IMG_DIR):
    # Skip brand folder (jangan kompres logo)
    if 'brand' in root:
        continue

    for fn in files:
        if not fn.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue

        fp = os.path.join(root, fn)
        size_kb = os.path.getsize(fp) / 1024

        if size_kb < THRESHOLD_KB:
            continue

        try:
            img = Image.open(fp).convert('RGB')
            w, h = img.size

            # Resize jika terlalu lebar
            if w > MAX_WIDTH:
                ratio = MAX_WIDTH / w
                img = img.resize((MAX_WIDTH, int(h * ratio)), Image.LANCZOS)
                w, h = img.size

            # Simpan sebagai WebP di lokasi yang sama
            webp_path = os.path.splitext(fp)[0] + '.webp'
            img.save(webp_path, 'WEBP', quality=TARGET_QUALITY, method=6)

            new_size_kb = os.path.getsize(webp_path) / 1024
            saved_kb = size_kb - new_size_kb
            total_saved += saved_kb
            optimized += 1

            rel = os.path.relpath(fp, os.path.join('..', 'public'))
            print(f'  {rel}')
            print(f'    {size_kb:.0f} KB -> {new_size_kb:.0f} KB  (saved {saved_kb:.0f} KB, {w}x{h})')

        except Exception as e:
            print(f'  ERROR  {fn}: {e}')

print(f'\n  Optimized: {optimized} files')
print(f'  Total saved: {total_saved/1024:.1f} MB')
print(f'\n  NOTE: WebP files dibuat sebagai alternatif.')
print(f'  Update Portfolio.jsx ganti .png -> .webp untuk file yang dioptimasi.')
