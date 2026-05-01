"""
=============================================================
  PDF Screenshot Automation via PyAutoGUI
  ─────────────────────────────────────────
  Mengambil screenshot area tertentu dari PDF yang dibuka
  di browser Chrome, lalu berpindah halaman secara otomatis.
  
  Dependencies:
    pip install pyautogui Pillow
  
  Cara Pakai:
    1. Jalankan mode deteksi koordinat dulu:
       python pdf_screenshot_pyautogui.py --detect
    2. Arahkan kursor ke pojok KIRI ATAS area PDF, catat X dan Y.
    3. Arahkan kursor ke pojok KANAN BAWAH area PDF, hitung width & height.
    4. Edit variabel REGION di bawah.
    5. Jalankan skrip utama:
       python pdf_screenshot_pyautogui.py
=============================================================
"""

import pyautogui
import time
import os
import sys
import ctypes

# ─── KONFIGURASI ────────────────────────────────────────────
TOTAL_HALAMAN = 48          # Jumlah halaman PDF
OUTPUT_DIR = "hasil_ss"     # Folder output
DELAY_AWAL = 5              # Detik jeda sebelum mulai (pindah ke browser)
DELAY_SIMPAN = 1            # Detik jeda setelah simpan
DELAY_LOAD = 2              # Detik jeda setelah pindah halaman (loading PDF)
IMAGE_QUALITY = 95          # Kualitas JPEG (1-100), atau gunakan PNG
IMAGE_FORMAT = "png"        # "png" untuk lossless, "jpeg" untuk compressed

# ─── REGION SCREENSHOT (x, y, width, height) ────────────────
# Jalankan --detect terlebih dahulu untuk menentukan koordinat ini!
REGION = (200, 150, 1200, 800)  # <-- EDIT SESUAI LAYAR KAMU

# ─── NAVIGASI HALAMAN ───────────────────────────────────────
# Pilih metode navigasi: "pagedown", "right", "down", "click_next"
NAV_METHOD = "pagedown"

# ─── FIX DISPLAY SCALING WINDOWS ────────────────────────────
def fix_dpi_scaling():
    """
    Mengatasi masalah DPI scaling di Windows (125%, 150%, dll).
    PyAutoGUI bisa salah koordinat jika scaling bukan 100%.
    """
    try:
        # Memberitahu Windows bahwa app ini "DPI aware"
        ctypes.windll.shcore.SetProcessDpiAwareness(2)  # Per-monitor DPI aware
        print("[✓] DPI Awareness diset ke Per-Monitor V2")
    except Exception:
        try:
            ctypes.windll.user32.SetProcessDPIAware()
            print("[✓] DPI Awareness diset ke System Aware (fallback)")
        except Exception:
            print("[!] Gagal mengatur DPI awareness, koordinat mungkin tidak akurat")


# ─── MODE DETEKSI KOORDINAT ─────────────────────────────────
def detect_cursor_position():
    """
    Mode interaktif untuk mendeteksi posisi kursor.
    Gerakkan mouse ke posisi yang diinginkan, lalu lihat koordinatnya.
    Tekan Ctrl+C untuk berhenti.
    """
    print("=" * 60)
    print("  🎯  MODE DETEKSI KOORDINAT KURSOR")
    print("=" * 60)
    print()
    print("  Gerakkan mouse ke posisi yang diinginkan.")
    print("  Koordinat akan ditampilkan secara real-time.")
    print("  Tekan Ctrl+C untuk berhenti.")
    print()
    print("  Tips:")
    print("  • Catat koordinat pojok KIRI ATAS area PDF → (x, y)")
    print("  • Catat koordinat pojok KANAN BAWAH → hitung width & height")
    print("  • width  = x_kanan_bawah - x_kiri_atas")
    print("  • height = y_kanan_bawah - y_kiri_atas")
    print()
    print("-" * 60)
    
    try:
        while True:
            x, y = pyautogui.position()
            print(f"\r  🖱️  Posisi: X={x:>5}, Y={y:>5}    ", end="", flush=True)
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("\n")
        print("-" * 60)
        x, y = pyautogui.position()
        print(f"  📌 Posisi terakhir: X={x}, Y={y}")
        print()
        print("  Masukkan koordinat ke variabel REGION di skrip ini:")
        print(f'  REGION = ({x}, {y}, <width>, <height>)')
        print("=" * 60)


# ─── FUNGSI UTAMA SCREENSHOT ────────────────────────────────
def run_screenshot_loop():
    """
    Loop utama: screenshot → simpan → navigasi → ulangi.
    """
    # Buat folder output
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print("=" * 60)
    print("  📸  PDF SCREENSHOT AUTOMATION")
    print("=" * 60)
    print()
    print(f"  Total halaman  : {TOTAL_HALAMAN}")
    print(f"  Output folder  : {os.path.abspath(OUTPUT_DIR)}")
    print(f"  Region (x,y,w,h): {REGION}")
    print(f"  Format gambar  : {IMAGE_FORMAT.upper()}")
    print(f"  Navigasi       : {NAV_METHOD}")
    print()
    print(f"  ⏳ Jeda {DELAY_AWAL} detik — PINDAH KE JENDELA BROWSER SEKARANG!")
    print()
    
    # Countdown
    for i in range(DELAY_AWAL, 0, -1):
        print(f"\r  Mulai dalam {i} detik...  ", end="", flush=True)
        time.sleep(1)
    print("\r  🚀 MULAI!                    ")
    print()
    
    berhasil = 0
    gagal = 0
    
    for hal in range(1, TOTAL_HALAMAN + 1):
        try:
            # 1. Screenshot area tertentu
            screenshot = pyautogui.screenshot(region=REGION)
            
            # 2. Tentukan nama file
            if IMAGE_FORMAT.lower() == "jpeg":
                filename = f"hal_{hal:03d}.jpg"
                filepath = os.path.join(OUTPUT_DIR, filename)
                screenshot.save(filepath, "JPEG", quality=IMAGE_QUALITY, optimize=True)
            else:
                filename = f"hal_{hal:03d}.png"
                filepath = os.path.join(OUTPUT_DIR, filename)
                screenshot.save(filepath, "PNG", optimize=True)
            
            berhasil += 1
            print(f"  ✅ [{hal:>3}/{TOTAL_HALAMAN}] {filename} — tersimpan")
            
            # 3. Jeda setelah simpan
            time.sleep(DELAY_SIMPAN)
            
            # 4. Navigasi ke halaman berikutnya (kecuali halaman terakhir)
            if hal < TOTAL_HALAMAN:
                if NAV_METHOD == "pagedown":
                    pyautogui.press("pagedown")
                elif NAV_METHOD == "right":
                    pyautogui.press("right")
                elif NAV_METHOD == "down":
                    pyautogui.press("down")
                elif NAV_METHOD == "click_next":
                    # Untuk PDF viewer yang punya tombol "Next"
                    # Edit koordinat tombol Next sesuai layar
                    pyautogui.click(960, 950)
                
                # 5. Jeda agar halaman ter-load
                time.sleep(DELAY_LOAD)
        
        except Exception as e:
            gagal += 1
            print(f"  ❌ [{hal:>3}/{TOTAL_HALAMAN}] GAGAL — {e}")
            time.sleep(DELAY_LOAD)
    
    # Ringkasan
    print()
    print("=" * 60)
    print(f"  📊 SELESAI!")
    print(f"     Berhasil : {berhasil}")
    print(f"     Gagal    : {gagal}")
    print(f"     Disimpan : {os.path.abspath(OUTPUT_DIR)}")
    print("=" * 60)


# ─── ENTRY POINT ─────────────────────────────────────────────
if __name__ == "__main__":
    fix_dpi_scaling()
    
    if len(sys.argv) > 1 and sys.argv[1] == "--detect":
        detect_cursor_position()
    else:
        # Safety: PyAutoGUI failsafe — gerakkan mouse ke pojok layar untuk STOP
        pyautogui.FAILSAFE = True
        print()
        print("  ⚠️  FAILSAFE AKTIF: Gerakkan mouse ke POJOK KIRI ATAS layar")
        print("     untuk menghentikan skrip secara darurat.")
        print()
        run_screenshot_loop()
