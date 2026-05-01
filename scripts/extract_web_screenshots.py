"""
=============================================================
  Extract Web/App Screenshots dari PDF Company Profile
  ─────────────────────────────────────────────────────
  
  Script ini mengekstrak gambar-gambar yang tertanam di 
  halaman-halaman portofolio (website & aplikasi) dari PDF 
  Company Profile.
  
  Dua mode:
  1. --extract-images  : Ambil gambar embedded asli dari PDF
  2. --render-pages    : Render halaman penuh lalu crop area web
  
  Dependencies:
    pip install PyMuPDF Pillow
  
  Cara Pakai:
    # Lihat daftar semua halaman & gambar di PDF
    python extract_web_screenshots.py "Company Profile Lengkap.pdf" --scan
    
    # Extract gambar embedded dari halaman 24-35 (bagian portofolio web)
    python extract_web_screenshots.py "Company Profile Lengkap.pdf" --extract-images --pages 24-35
    
    # Render halaman 24-35 sebagai gambar full-page
    python extract_web_screenshots.py "Company Profile Lengkap.pdf" --render-pages --pages 24-35 --dpi 250
    
    # Extract gambar besar saja (min 300px, skip ikon kecil)
    python extract_web_screenshots.py "Company Profile Lengkap.pdf" --extract-images --pages 24-35 --min-size 300
=============================================================
"""

import fitz  # PyMuPDF
import os
import sys
import argparse
import time
from PIL import Image
import io


def scan_pdf(pdf_path):
    """
    Scan PDF: tampilkan info setiap halaman dan jumlah gambar di dalamnya.
    Berguna untuk menentukan halaman mana yang berisi screenshot web.
    """
    doc = fitz.open(pdf_path)
    
    print()
    print("=" * 70)
    print("  🔍  SCAN PDF — Daftar Halaman & Gambar")
    print("=" * 70)
    print(f"  File: {os.path.basename(pdf_path)}")
    print(f"  Total halaman: {len(doc)}")
    print()
    print(f"  {'Hal':>4}  {'Gambar':>6}  {'Teks (preview)':40}")
    print("  " + "-" * 60)
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        images = page.get_images(full=True)
        text = page.get_text("text").strip()
        # Ambil 50 karakter pertama sebagai preview
        text_preview = text[:50].replace("\n", " ") if text else "(kosong)"
        
        # Highlight halaman yang punya banyak gambar (kemungkinan portofolio)
        marker = "📸" if len(images) >= 3 else "  "
        print(f"  {page_num + 1:>4}  {len(images):>6}  {marker} {text_preview}")
    
    doc.close()
    print()
    print("  📸 = Halaman dengan 3+ gambar (kemungkinan halaman portofolio)")
    print("=" * 70)


def extract_embedded_images(pdf_path, output_dir, page_range, min_size, prefix):
    """
    Ekstrak gambar-gambar yang tertanam (embedded) di halaman tertentu.
    Ini mengambil gambar ASLI yang di-embed ke PDF — kualitas terbaik.
    Filter berdasarkan ukuran minimum untuk skip ikon kecil.
    """
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    pages = parse_page_range(page_range, total_pages)
    
    os.makedirs(output_dir, exist_ok=True)
    
    print()
    print("=" * 70)
    print("  🖼️  EXTRACT EMBEDDED IMAGES — Gambar Asli dari PDF")
    print("=" * 70)
    print(f"  File           : {os.path.basename(pdf_path)}")
    print(f"  Halaman        : {page_range} ({len(pages)} halaman)")
    print(f"  Min size       : {min_size}px (skip gambar < {min_size}px)")
    print(f"  Output         : {os.path.abspath(output_dir)}")
    print()
    print("-" * 70)
    
    total_extracted = 0
    total_skipped = 0
    start_time = time.time()
    
    for page_num in pages:
        page = doc[page_num]
        images = page.get_images(full=True)
        
        if not images:
            print(f"  ⚪ Halaman {page_num + 1:>3}: tidak ada gambar")
            continue
        
        page_extracted = 0
        
        for img_idx, img_info in enumerate(images, 1):
            xref = img_info[0]  # XREF number
            
            try:
                # Ambil gambar dari PDF
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]  # png, jpeg, etc.
                width = base_image["width"]
                height = base_image["height"]
                
                # Filter: skip gambar kecil (ikon, logo kecil, dll)
                if width < min_size and height < min_size:
                    total_skipped += 1
                    continue
                
                # Simpan
                filename = f"{prefix}_hal{page_num + 1:02d}_img{img_idx:02d}.{image_ext}"
                filepath = os.path.join(output_dir, filename)
                
                with open(filepath, "wb") as f:
                    f.write(image_bytes)
                
                file_size_kb = len(image_bytes) / 1024
                total_extracted += 1
                page_extracted += 1
                
                print(f"  ✅ Hal {page_num + 1:>3} | {filename:40s} "
                      f"({width}x{height}, {file_size_kb:.1f} KB)")
            
            except Exception as e:
                print(f"  ❌ Hal {page_num + 1:>3} | Gambar {img_idx} gagal: {e}")
        
        if page_extracted == 0 and images:
            print(f"  ⚪ Halaman {page_num + 1:>3}: {len(images)} gambar, "
                  f"semua < {min_size}px (di-skip)")
    
    doc.close()
    elapsed = time.time() - start_time
    
    print()
    print("-" * 70)
    print(f"  📊 RINGKASAN")
    print(f"     Terekstrak  : {total_extracted} gambar")
    print(f"     Di-skip     : {total_skipped} gambar (terlalu kecil)")
    print(f"     Waktu       : {elapsed:.1f} detik")
    print(f"     Output      : {os.path.abspath(output_dir)}")
    print("=" * 70)


def render_pages_as_images(pdf_path, output_dir, page_range, dpi, image_format, 
                           jpeg_quality, prefix, crop_margin=None):
    """
    Render halaman PDF menjadi gambar. Opsional: crop margin untuk
    menghilangkan background/border halaman PDF.
    
    crop_margin: tuple (left, top, right, bottom) dalam piksel untuk di-crop.
                 Contoh: (50, 50, 50, 50) menghilangkan 50px dari setiap sisi.
    """
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    pages = parse_page_range(page_range, total_pages)
    
    os.makedirs(output_dir, exist_ok=True)
    
    zoom = dpi / 72.0
    matrix = fitz.Matrix(zoom, zoom)
    
    print()
    print("=" * 70)
    print("  📄  RENDER HALAMAN PDF → GAMBAR")
    print("=" * 70)
    print(f"  File           : {os.path.basename(pdf_path)}")
    print(f"  Halaman        : {page_range} ({len(pages)} halaman)")
    print(f"  DPI            : {dpi}")
    print(f"  Format         : {image_format.upper()}")
    if crop_margin:
        print(f"  Crop margin    : L={crop_margin[0]}, T={crop_margin[1]}, "
              f"R={crop_margin[2]}, B={crop_margin[3]}px")
    print(f"  Output         : {os.path.abspath(output_dir)}")
    print()
    print("-" * 70)
    
    start_time = time.time()
    berhasil = 0
    
    for idx, page_num in enumerate(pages, 1):
        try:
            page = doc[page_num]
            pixmap = page.get_pixmap(matrix=matrix, alpha=False)
            
            # Konversi ke PIL
            img_data = pixmap.tobytes("ppm")
            img = Image.open(io.BytesIO(img_data))
            
            # Crop jika diminta
            if crop_margin:
                l, t, r, b = crop_margin
                img = img.crop((l, t, img.width - r, img.height - b))
            
            # Simpan
            hal_num = page_num + 1
            if image_format.lower() == "jpeg":
                filename = f"{prefix}_hal{hal_num:02d}.jpg"
                filepath = os.path.join(output_dir, filename)
                img.save(filepath, "JPEG", quality=jpeg_quality, optimize=True)
            else:
                filename = f"{prefix}_hal{hal_num:02d}.png"
                filepath = os.path.join(output_dir, filename)
                img.save(filepath, "PNG", optimize=True)
            
            file_size_kb = os.path.getsize(filepath) / 1024
            berhasil += 1
            
            print(f"  ✅ [{idx:>3}/{len(pages)}] {filename}  "
                  f"({img.width}x{img.height}, {file_size_kb:.1f} KB)")
        
        except Exception as e:
            print(f"  ❌ [{idx:>3}/{len(pages)}] Halaman {page_num + 1} gagal: {e}")
    
    doc.close()
    elapsed = time.time() - start_time
    
    print()
    print("-" * 70)
    print(f"  📊 RINGKASAN")
    print(f"     Berhasil    : {berhasil} halaman")
    print(f"     Waktu       : {elapsed:.1f} detik")
    print(f"     Output      : {os.path.abspath(output_dir)}")
    print("=" * 70)


def parse_page_range(page_str, total_pages):
    """Parse string range halaman: "1-10", "1,3,5,7", "24-35", "all" """
    if not page_str or page_str.lower() == "all":
        return list(range(total_pages))
    
    pages = set()
    for part in page_str.split(","):
        part = part.strip()
        if "-" in part:
            start, end = part.split("-", 1)
            start = int(start) - 1 if start else 0
            end = int(end) if end else total_pages
            pages.update(range(start, min(end, total_pages)))
        else:
            page_num = int(part) - 1
            if 0 <= page_num < total_pages:
                pages.add(page_num)
    
    return sorted(pages)


# ─── CLI ─────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Extract web/app screenshots dari PDF Company Profile",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
WORKFLOW YANG DISARANKAN:
  
  Step 1: Scan PDF untuk lihat halaman mana yang berisi banyak gambar
    python extract_web_screenshots.py "Company Profile Lengkap.pdf" --scan
  
  Step 2: Extract gambar embedded dari halaman portofolio
    python extract_web_screenshots.py "Company Profile Lengkap.pdf" --extract-images --pages 24-35
  
  Step 3: Atau render halaman penuh (jika ingin layout lengkap)
    python extract_web_screenshots.py "Company Profile Lengkap.pdf" --render-pages --pages 24-35

CONTOH LAIN:
  # Extract gambar besar saja (skip ikon < 200px)
    python extract_web_screenshots.py profile.pdf --extract-images --pages 24-35 --min-size 200
  
  # Render dengan DPI tinggi untuk kualitas print
    python extract_web_screenshots.py profile.pdf --render-pages --pages 24-35 --dpi 300
  
  # Render dan crop 60px dari setiap sisi (hilangkan margin PDF)
    python extract_web_screenshots.py profile.pdf --render-pages --pages 24-35 --crop 60,60,60,60
        """
    )
    
    parser.add_argument("pdf", help="Path ke file PDF Company Profile")
    
    # Mode
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--scan", action="store_true",
                      help="Scan PDF: lihat daftar halaman & jumlah gambar")
    mode.add_argument("--extract-images", action="store_true",
                      help="Extract gambar embedded (kualitas asli)")
    mode.add_argument("--render-pages", action="store_true",
                      help="Render halaman penuh sebagai gambar")
    
    # Options
    parser.add_argument("--pages", "-p", default="all",
                        help='Range halaman: "24-35", "1,3,5", "all" (default: all)')
    parser.add_argument("--output", "-o", default="web_screenshots",
                        help="Folder output (default: web_screenshots)")
    parser.add_argument("--min-size", type=int, default=150,
                        help="Min ukuran gambar px untuk extract (default: 150, skip ikon)")
    parser.add_argument("--dpi", type=int, default=250,
                        help="DPI untuk render halaman (default: 250)")
    parser.add_argument("--format", "-f", choices=["png", "jpeg"], default="png",
                        help="Format gambar untuk render (default: png)")
    parser.add_argument("--quality", "-q", type=int, default=95,
                        help="Kualitas JPEG (default: 95)")
    parser.add_argument("--prefix", default="web",
                        help="Prefix nama file (default: web)")
    parser.add_argument("--crop", default=None,
                        help="Crop margin 'left,top,right,bottom' dalam px (render mode)")
    
    args = parser.parse_args()
    
    if args.scan:
        scan_pdf(args.pdf)
    
    elif args.extract_images:
        extract_embedded_images(
            pdf_path=args.pdf,
            output_dir=args.output,
            page_range=args.pages,
            min_size=args.min_size,
            prefix=args.prefix,
        )
    
    elif args.render_pages:
        crop_margin = None
        if args.crop:
            parts = [int(x) for x in args.crop.split(",")]
            if len(parts) == 4:
                crop_margin = tuple(parts)
            elif len(parts) == 1:
                crop_margin = (parts[0], parts[0], parts[0], parts[0])
            else:
                print("  ❌ Format crop salah. Gunakan: --crop 60,60,60,60")
                sys.exit(1)
        
        render_pages_as_images(
            pdf_path=args.pdf,
            output_dir=args.output,
            page_range=args.pages,
            dpi=args.dpi,
            image_format=args.format,
            jpeg_quality=args.quality,
            prefix=args.prefix,
            crop_margin=crop_margin,
        )
