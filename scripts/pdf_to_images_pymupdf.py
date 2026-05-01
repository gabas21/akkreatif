"""
=============================================================
  PDF → Image Converter (Headless/Backend)
  ─────────────────────────────────────────
  Mengkonversi setiap halaman PDF menjadi gambar PNG/JPEG
  secara langsung TANPA membuka browser.
  
  ✅ Lebih cepat, lebih bersih, lebih reliable daripada screenshot.
  
  Dependencies:
    pip install PyMuPDF Pillow
  
  Cara Pakai:
    python pdf_to_images_pymupdf.py dokumen.pdf
    python pdf_to_images_pymupdf.py dokumen.pdf --dpi 300 --format jpeg
    python pdf_to_images_pymupdf.py dokumen.pdf --output folder_output
    python pdf_to_images_pymupdf.py dokumen.pdf --pages 1-10
=============================================================
"""

import fitz  # PyMuPDF
import os
import sys
import time
import argparse
from PIL import Image
import io


def parse_page_range(page_str, total_pages):
    """
    Parse string range halaman.
    Contoh: "1-10", "1,3,5,7", "5-", "-20", "all"
    """
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


def convert_pdf_to_images(
    pdf_path,
    output_dir="hasil_konversi",
    dpi=200,
    image_format="png",
    jpeg_quality=95,
    page_range=None,
    prefix="hal"
):
    """
    Konversi PDF ke gambar per halaman.
    
    Args:
        pdf_path:      Path ke file PDF
        output_dir:    Folder output
        dpi:           Resolusi gambar (150=cepat, 200=standar, 300=print quality)
        image_format:  "png" atau "jpeg"
        jpeg_quality:  Kualitas JPEG (1-100)
        page_range:    String range halaman ("1-10", "all", dll)
        prefix:        Prefix nama file
    """
    # Validasi file
    if not os.path.isfile(pdf_path):
        print(f"  ❌ File tidak ditemukan: {pdf_path}")
        sys.exit(1)
    
    # Buka PDF
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    
    # Parse halaman
    pages_to_convert = parse_page_range(page_range, total_pages)
    
    # Buat folder output
    os.makedirs(output_dir, exist_ok=True)
    
    # Hitung zoom factor dari DPI (default PDF = 72 DPI)
    zoom = dpi / 72.0
    matrix = fitz.Matrix(zoom, zoom)
    
    # Header info
    pdf_name = os.path.basename(pdf_path)
    print()
    print("=" * 60)
    print("  📄  PDF → IMAGE CONVERTER")
    print("=" * 60)
    print()
    print(f"  File PDF       : {pdf_name}")
    print(f"  Total halaman  : {total_pages}")
    print(f"  Akan dikonversi: {len(pages_to_convert)} halaman")
    print(f"  DPI            : {dpi}")
    print(f"  Format         : {image_format.upper()}")
    print(f"  Output         : {os.path.abspath(output_dir)}")
    print()
    print("-" * 60)
    
    start_time = time.time()
    berhasil = 0
    gagal = 0
    total_size = 0
    
    for idx, page_num in enumerate(pages_to_convert, 1):
        try:
            page = doc[page_num]
            
            # Render halaman ke pixmap (gambar bitmap)
            pixmap = page.get_pixmap(matrix=matrix, alpha=False)
            
            # Konversi ke PIL Image untuk kontrol kualitas lebih baik
            img_data = pixmap.tobytes("ppm")
            img = Image.open(io.BytesIO(img_data))
            
            # Simpan
            hal_num = page_num + 1  # 1-indexed untuk nama file
            
            if image_format.lower() == "jpeg":
                filename = f"{prefix}_{hal_num:03d}.jpg"
                filepath = os.path.join(output_dir, filename)
                img.save(filepath, "JPEG", quality=jpeg_quality, optimize=True)
            else:
                filename = f"{prefix}_{hal_num:03d}.png"
                filepath = os.path.join(output_dir, filename)
                img.save(filepath, "PNG", optimize=True)
            
            file_size = os.path.getsize(filepath)
            total_size += file_size
            berhasil += 1
            
            size_kb = file_size / 1024
            print(f"  ✅ [{idx:>3}/{len(pages_to_convert)}] {filename}  "
                  f"({img.width}x{img.height}, {size_kb:.1f} KB)")
        
        except Exception as e:
            gagal += 1
            print(f"  ❌ [{idx:>3}/{len(pages_to_convert)}] Halaman {page_num + 1} GAGAL — {e}")
    
    doc.close()
    
    elapsed = time.time() - start_time
    total_mb = total_size / (1024 * 1024)
    
    # Ringkasan
    print()
    print("-" * 60)
    print()
    print(f"  📊  RINGKASAN")
    print(f"     Berhasil    : {berhasil} halaman")
    print(f"     Gagal       : {gagal} halaman")
    print(f"     Total size  : {total_mb:.2f} MB")
    print(f"     Waktu       : {elapsed:.1f} detik")
    print(f"     Kecepatan   : {berhasil / max(elapsed, 0.1):.1f} halaman/detik")
    print(f"     Output      : {os.path.abspath(output_dir)}")
    print()
    print("=" * 60)


# ─── CLI INTERFACE ───────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Konversi PDF ke gambar per halaman (tanpa browser)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Contoh penggunaan:
  python pdf_to_images_pymupdf.py dokumen.pdf
  python pdf_to_images_pymupdf.py dokumen.pdf --dpi 300
  python pdf_to_images_pymupdf.py dokumen.pdf --format jpeg --quality 85
  python pdf_to_images_pymupdf.py dokumen.pdf --pages 1-10
  python pdf_to_images_pymupdf.py dokumen.pdf --pages "1,3,5,10-20"
  python pdf_to_images_pymupdf.py dokumen.pdf --output gambar_pdf
        """
    )
    
    parser.add_argument("pdf", help="Path ke file PDF")
    parser.add_argument("--output", "-o", default="hasil_konversi",
                        help="Folder output (default: hasil_konversi)")
    parser.add_argument("--dpi", "-d", type=int, default=200,
                        help="Resolusi DPI (default: 200, print: 300)")
    parser.add_argument("--format", "-f", choices=["png", "jpeg"], default="png",
                        help="Format gambar (default: png)")
    parser.add_argument("--quality", "-q", type=int, default=95,
                        help="Kualitas JPEG 1-100 (default: 95)")
    parser.add_argument("--pages", "-p", default="all",
                        help='Range halaman: "all", "1-10", "1,3,5" (default: all)')
    parser.add_argument("--prefix", default="hal",
                        help="Prefix nama file (default: hal)")
    
    args = parser.parse_args()
    
    convert_pdf_to_images(
        pdf_path=args.pdf,
        output_dir=args.output,
        dpi=args.dpi,
        image_format=args.format,
        jpeg_quality=args.quality,
        page_range=args.pages,
        prefix=args.prefix,
    )
