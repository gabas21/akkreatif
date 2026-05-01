"""
Reorganize public/images/ into clean category-based folders.

BEFORE (berantakan):
  images/
    BAGAS DRIBEL.svg          (loose)
    Company Profile AK Kreatif.pdf (47MB! seharusnya tidak di public)
    akpulau.svg, akpulau_final.png, ... (loose)
    logo ak.png               (loose, 4.8MB!)
    logo-color.webp           (loose)
    instagram/
    youtube/
    portfolio/                (63 files flat, tidak per-kategori)
    scrape/                   (unclear purpose)
    unsplash/
    logo client/

AFTER (rapi per-kategori):
  images/
    brand/                    (logo, identitas brand AK Kreatif)
    clients/                  (logo klien)
    instagram/                (tetap)
    youtube/                  (tetap)
    unsplash/                 (tetap)
    portfolio/
      pemda-kaltim/           (Pemerintah Daerah Kalimantan)
      kemendikbud/            (Kemendikbud nasional)
      nasional/               (BIG, BPKP, BPOM, DPD RI, dll)
      dki-jakarta/            (KI Jakarta, PAMJAYA)
      kota-bogor/             (SOLUSI, Warung Sadulur)
      swasta/                 (EventPlan, Videotron, dll)
      kampus-pesantren/       (Polbangtan, SIMANDIK)
"""

import os
import shutil

BASE = os.path.join('..', 'public', 'images')

# ─── 1. Buat folder brand/ untuk identitas perusahaan ─────────
brand_dir = os.path.join(BASE, 'brand')
os.makedirs(brand_dir, exist_ok=True)

brand_files = {
    'BAGAS DRIBEL.svg': 'bagas-dribel.svg',
    'akpulau.svg': 'akpulau.svg',
    'akpulau_final.png': 'akpulau-final.png',
    'akpulau_fixed.svg': 'akpulau-fixed.svg',
    'akpulau_mask.png': 'akpulau-mask.png',
    'akpulau_raw.png': 'akpulau-raw.png',
    'logo ak.png': 'logo-ak.png',
    'logo-color.webp': 'logo-color.webp',  # keep copy in root too
}

moved_brand = 0
for old_name, new_name in brand_files.items():
    src = os.path.join(BASE, old_name)
    dst = os.path.join(brand_dir, new_name)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        moved_brand += 1
        print(f'  BRAND  {old_name} -> brand/{new_name}')

# ─── 2. Rename "logo client" -> "clients" ─────────────────────
old_clients = os.path.join(BASE, 'logo client')
new_clients = os.path.join(BASE, 'clients')
if os.path.exists(old_clients) and not os.path.exists(new_clients):
    shutil.copytree(old_clients, new_clients)
    print(f'  RENAME logo client/ -> clients/')

# ─── 3. Organisasi portfolio/ per-kategori ─────────────────────
portfolio_base = os.path.join(BASE, 'portfolio')

CATEGORIES = {
    'pemda-kaltim': [
        'simevlap-mahulu', 'siedesa-mahulu', 'bappelitbangda-mahulu',
        'dpmd-kukar', 'inspektorat-mahulu', 'uptd-pprd-samarinda',
        'eskm-', 'biro-pbj-kaltim', 'simpelsibang-bappelitbangda',
        'tp-pkk-kukar', 'ecsr-dpmd-kukar', 'dp3a-kaltim',
        'bag-organisasi-mahulu', 'ekegiatan-disperindag', 'eskm-disperindag',
        'webprofile-disperindag', 'eperjadin-disperindag', 'siperindustrian-kutim',
        'walkingstory', 'ukpbj-kaltara', 'webprofile-dispora-kutim',
        'siap-uptd-pprd', 'sipropenda-bapenda', 'emonev-malinau',
    ],
    'kemendikbud': [
        'sibelas-kemendikbud', 'sipolen-kemendikbud', 'sim-siln-kemendikbud',
        'silatdik-kemendikbud', 'layanan-spk-paud', 'silandri-kemendikbud',
    ],
    'nasional': [
        'bpom-', 'analisis-data-bpom', 'akreditasi-kan-big',
        'ptia-bpkp', 'dpd-ri', 'eoffice-dpd-ri', 'ifrc-indonesia',
    ],
    'dki-jakarta': [
        'ki-jakarta', 'pamjaya-dki', 'database-air-tanah-dki',
    ],
    'kota-bogor': [
        'solusi-kota-bogor', 'warung-sadulur-bogor',
    ],
    'kampus-pesantren': [
        'polbangtan-bogor', 'simandik-ponpes',
    ],
    'swasta': [
        'eventplan-id', 'pakarvideotron',
    ],
}

# Create category dirs
for cat in CATEGORIES:
    os.makedirs(os.path.join(portfolio_base, cat), exist_ok=True)

# Move files to categories
moved_portfolio = 0
for f in sorted(os.listdir(portfolio_base)):
    if not f.endswith(('.png', '.jpg', '.webp')): continue
    src = os.path.join(portfolio_base, f)
    if not os.path.isfile(src): continue
    
    placed = False
    for cat, prefixes in CATEGORIES.items():
        for prefix in prefixes:
            if f.startswith(prefix):
                dst = os.path.join(portfolio_base, cat, f)
                shutil.move(src, dst)
                moved_portfolio += 1
                print(f'  PORTFOLIO  {f} -> portfolio/{cat}/')
                placed = True
                break
        if placed:
            break
    
    if not placed:
        print(f'  UNCATEGORIZED  {f}')

# ─── 4. Pindahkan PDF besar dari public (seharusnya tidak di-serve) ───
pdf_in_public = os.path.join(BASE, 'Company Profile AK Kreatif.pdf')
if os.path.exists(pdf_in_public):
    print(f'\n  WARNING: Company Profile PDF (47MB) ada di public/images/')
    print(f'  File ini seharusnya tidak di-serve ke publik.')
    print(f'  Dipindahkan ke storage...')
    storage_dst = os.path.join('..', 'storage', 'app', 'documents')
    os.makedirs(storage_dst, exist_ok=True)
    shutil.move(pdf_in_public, os.path.join(storage_dst, 'Company Profile AK Kreatif.pdf'))
    print(f'  MOVED -> storage/app/documents/')

# ─── SUMMARY ──────────────────────────────────────────────────
print(f'\n{"="*60}')
print(f'  SUMMARY')
print(f'  Brand files organized : {moved_brand}')
print(f'  Portfolio categorized : {moved_portfolio}')
print(f'{"="*60}')
