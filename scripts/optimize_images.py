import os
from PIL import Image

def optimize_images(directory):
    total_original_size = 0
    total_optimized_size = 0
    converted_files = 0
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(root, file)
                filename_without_ext = os.path.splitext(file)[0]
                webp_filepath = os.path.join(root, filename_without_ext + '.webp')
                
                # Skip if webp already exists
                if os.path.exists(webp_filepath):
                    continue
                    
                original_size = os.path.getsize(filepath)
                
                try:
                    with Image.open(filepath) as img:
                        # Convert RGBA to RGB for JPEG if needed, but WebP handles RGBA
                        if img.mode == 'P':
                            img = img.convert('RGBA')
                        
                        img.save(webp_filepath, 'WEBP', quality=85, method=6)
                        
                        webp_size = os.path.getsize(webp_filepath)
                        total_original_size += original_size
                        total_optimized_size += webp_size
                        converted_files += 1
                        print(f"Converted: {file} -> {filename_without_ext}.webp ({original_size/1024:.1f} KB -> {webp_size/1024:.1f} KB)")
                except Exception as e:
                    print(f"Error converting {file}: {e}")

    print(f"\nOptimization Complete!")
    print(f"Files converted: {converted_files}")
    if converted_files > 0:
        print(f"Original size: {total_original_size / (1024*1024):.2f} MB")
        print(f"Optimized size: {total_optimized_size / (1024*1024):.2f} MB")
        print(f"Space saved: {(total_original_size - total_optimized_size) / (1024*1024):.2f} MB")

if __name__ == '__main__':
    images_dir = r'c:\laragon\www\akkreatif\public\images'
    optimize_images(images_dir)
