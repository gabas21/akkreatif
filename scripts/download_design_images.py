"""
Download dan lokalkan gambar desain grafis dari akkreatif.com
ke public/images/portfolio/desain/
"""
import os
import urllib.request
import time

DST = os.path.join('..', 'public', 'images', 'portfolio', 'desain')
os.makedirs(DST, exist_ok=True)

BASE_URL = 'https://akkreatif.com/img/desain'

# Berdasarkan data di Portfolio.jsx: desain/1.png s/d 22.png
# sebagian .jpg, sebagian .png
ITEMS = {
    1: 'png', 2: 'png', 3: 'jpg', 4: 'png', 5: 'jpg', 6: 'jpg',
    7: 'png', 8: 'png', 9: 'png', 10: 'png', 11: 'png',
    13: 'png', 14: 'png', 15: 'png', 16: 'png', 17: 'png',
    18: 'png', 19: 'png', 20: 'png', 21: 'png', 22: 'png',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

downloaded = 0
failed = []

for num, ext in ITEMS.items():
    url = f'{BASE_URL}/{num}.{ext}'
    dst_file = os.path.join(DST, f'{num}.{ext}')
    
    if os.path.exists(dst_file) and os.path.getsize(dst_file) > 1000:
        print(f'  SKIP  {num}.{ext} (already exists)')
        downloaded += 1
        continue
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(dst_file, 'wb') as f:
                f.write(data)
            size_kb = len(data) / 1024
            print(f'  OK    {num}.{ext}  ({size_kb:.0f} KB)')
            downloaded += 1
    except Exception as e:
        print(f'  FAIL  {num}.{ext}  -> {e}')
        failed.append(f'{num}.{ext}')
    
    time.sleep(0.3)  # polite rate

print(f'\n  Downloaded: {downloaded}/{len(ITEMS)} | Failed: {len(failed)}')
if failed:
    print(f'  Failed: {", ".join(failed)}')
print(f'  Output: {os.path.abspath(DST)}')
