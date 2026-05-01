"""
Organize web screenshots: rename with proper names and copy to public/images/portfolio/
"""
import os
import shutil
from PIL import Image

SRC = 'web_screenshots_FINAL'
DST = os.path.join('..', 'public', 'images', 'portfolio')
os.makedirs(DST, exist_ok=True)

# Mapping: (pdf_page, img_index) -> (project_slug, description)
# Based on PDF text analysis
MAPPING = {
    # HAL 24: SIMEVLAP, SIEDESA, Bappelitbangda Mahulu, DPMD Kukar
    ('hal24', 'img01'): 'simevlap-mahulu-1',
    ('hal24', 'img02'): 'siedesa-mahulu-1',
    ('hal24', 'img03'): 'bappelitbangda-mahulu-1',
    ('hal24', 'img04'): 'dpmd-kukar-1',

    # HAL 25: Inspektorat Mahulu, UPTD PPRD Samarinda, ESKM
    ('hal25', 'img01'): 'inspektorat-mahulu-1',
    ('hal25', 'img02'): 'uptd-pprd-samarinda-1',
    ('hal25', 'img03'): 'eskm-1',
    ('hal25', 'img04'): 'eskm-2',

    # HAL 26: Biro PBJ Kaltim, Simpelsibang Bappelitbangda
    ('hal26', 'img01'): 'biro-pbj-kaltim-1',
    ('hal26', 'img02'): 'simpelsibang-bappelitbangda-1',

    # HAL 27: Bappelitbangda PKK Kukar, E-CSR DPMD Kukar
    ('hal27', 'img01'): 'tp-pkk-kukar-1',
    ('hal27', 'img02'): 'ecsr-dpmd-kukar-1',

    # HAL 28: DP3A Kaltim, Bag Organisasi Mahulu
    ('hal28', 'img01'): 'dp3a-kaltim-1',
    ('hal28', 'img02'): 'dp3a-kaltim-2',
    ('hal28', 'img03'): 'bag-organisasi-mahulu-1',
    ('hal28', 'img04'): 'bag-organisasi-mahulu-2',

    # HAL 29: E-Kegiatan & E-SKM Disperindag Kutim
    ('hal29', 'img02'): 'ekegiatan-disperindag-kutim-1',
    ('hal29', 'img04'): 'eskm-disperindag-kutim-1',

    # HAL 30: Web Profile & E-Perjadin Disperindag Kutim
    ('hal30', 'img01'): 'webprofile-disperindag-kutim-1',
    ('hal30', 'img04'): 'eperjadin-disperindag-kutim-1',

    # HAL 31: Walkingstory, UKPBJ Kaltara
    ('hal31', 'img02'): 'walkingstory-1',
    ('hal31', 'img04'): 'ukpbj-kaltara-1',

    # HAL 32: Siperindustrian Kutim, Dispora Kutim
    ('hal32', 'img02'): 'siperindustrian-kutim-1',
    ('hal32', 'img04'): 'webprofile-dispora-kutim-1',

    # HAL 33: UPTD PPRD Samarinda (SIAP), Bapenda Kaltim (Sipropenda) + mobile
    ('hal33', 'img01'): 'siap-uptd-pprd-1',
    ('hal33', 'img02'): 'sipropenda-bapenda-kaltim-1',
    ('hal33', 'img03'): 'sipropenda-bapenda-kaltim-2',
    ('hal33', 'img06'): 'siap-uptd-pprd-mobile-1',
    ('hal33', 'img08'): 'sipropenda-bapenda-mobile-1',

    # HAL 34: SOLUSI Kota Bogor, Warung Sadulur (mobile apps)
    ('hal34', 'img01'): 'solusi-kota-bogor-mobile-1',
    ('hal34', 'img03'): 'solusi-kota-bogor-mobile-2',
    ('hal34', 'img04'): 'solusi-kota-bogor-mobile-3',
    ('hal34', 'img05'): 'warung-sadulur-bogor-mobile-1',
    ('hal34', 'img06'): 'warung-sadulur-bogor-mobile-2',
    ('hal34', 'img07'): 'warung-sadulur-bogor-mobile-3',
    ('hal34', 'img08'): 'warung-sadulur-bogor-mobile-4',
    ('hal34', 'img09'): 'warung-sadulur-bogor-mobile-5',

    # HAL 35: BPOM, Kab Malinau (emonev)
    ('hal35', 'img01'): 'bpom-1',
    ('hal35', 'img03'): 'analisis-data-bpom-1',
    ('hal35', 'img04'): 'emonev-malinau-1',

    # HAL 36: KI Jakarta, PAMJAYA, Database Air Tanah DKI
    ('hal36', 'img01'): 'ki-jakarta-1',
    ('hal36', 'img02'): 'pamjaya-dki-1',
    ('hal36', 'img03'): 'database-air-tanah-dki-1',
    ('hal36', 'img04'): 'database-air-tanah-dki-2',

    # HAL 37: SIBELAS & SIPOLEN Kemendikbud
    ('hal37', 'img02'): 'sibelas-kemendikbud-1',
    ('hal37', 'img04'): 'sipolen-kemendikbud-1',

    # HAL 38: SIM SILN & SILATDIK Kemendikbud
    ('hal38', 'img02'): 'sim-siln-kemendikbud-1',
    ('hal38', 'img04'): 'silatdik-kemendikbud-1',

    # HAL 39: Layanan SPK & SILANDRI Kemendikbud
    ('hal39', 'img01'): 'layanan-spk-paud-kemendikbud-1',
    ('hal39', 'img02'): 'silandri-kemendikbud-1',

    # HAL 40: BIG (Akreditasi KAN), BPKP (PTIA)
    ('hal40', 'img01'): 'akreditasi-kan-big-1',
    ('hal40', 'img03'): 'ptia-bpkp-1',
    ('hal40', 'img04'): 'ptia-bpkp-2',

    # HAL 41: DPD RI, eOffice DPD RI
    ('hal41', 'img01'): 'dpd-ri-1',
    ('hal41', 'img02'): 'eoffice-dpd-ri-1',

    # HAL 42: Polbangtan Bogor, SIMANDIK Ponpes, + more
    ('hal42', 'img02'): 'polbangtan-bogor-1',
    ('hal42', 'img04'): 'simandik-ponpes-1',
    ('hal42', 'img05'): 'polbangtan-bogor-2',
    ('hal42', 'img06'): 'simandik-ponpes-2',

    # HAL 43: IFRC Indonesia, Videotron
    ('hal43', 'img02'): 'ifrc-indonesia-1',
    ('hal43', 'img04'): 'pakarvideotron-1',

    # HAL 44: EventPlan.id (swasta)
    ('hal44', 'img01'): 'eventplan-id-1',
    ('hal44', 'img02'): 'eventplan-id-mobile-1',
}

copied = 0
for f in sorted(os.listdir(SRC)):
    if not f.endswith(('.png', '.jpg')): continue
    
    # Parse filename: web_hal24_img01.png
    parts = f.replace('.png', '').replace('.jpg', '').split('_')
    if len(parts) >= 3:
        hal_key = parts[1]  # hal24
        img_key = parts[2]  # img01
        key = (hal_key, img_key)
        
        if key in MAPPING:
            new_name = MAPPING[key] + '.png'
            src_path = os.path.join(SRC, f)
            dst_path = os.path.join(DST, new_name)
            shutil.copy2(src_path, dst_path)
            copied += 1
            
            img = Image.open(dst_path)
            w, h = img.size
            size_kb = os.path.getsize(dst_path) / 1024
            print(f'  {new_name:50s} ({w}x{h}, {size_kb:.0f}KB)')

print(f'\nTotal: {copied} files copied to {os.path.abspath(DST)}')
