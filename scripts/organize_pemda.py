import os
import re
import shutil

PEMDA_DIR = r'c:\laragon\www\akkreatif\public\images\portfolio\pemda-kaltim'
RESOURCES_DIR = r'c:\laragon\www\akkreatif\resources\js'

def organize_pemda():
    if not os.path.exists(PEMDA_DIR):
        print(f"Directory not found: {PEMDA_DIR}")
        return

    files = os.listdir(PEMDA_DIR)
    replacements = {} # old_path -> new_path
    
    for file in files:
        filepath = os.path.join(PEMDA_DIR, file)
        if os.path.isfile(filepath):
            # Try to match <name>-<number>.ext or <name>-<string>-<number>.ext
            # e.g. bag-organisasi-mahulu-1.png -> name: bag-organisasi-mahulu, num: 1
            # e.g. sipropenda-bapenda-mobile-1.png -> name: sipropenda-bapenda, num: mobile-1
            
            # Simple rule: Everything before the last hyphen followed by a digit is the folder name
            match = re.search(r'^(.*?)-((?:mobile-)?\d+)\.(png|webp|jpg)$', file)
            if match:
                folder_name = match.group(1)
                new_filename = f"{match.group(2)}.{match.group(3)}"
                
                target_dir = os.path.join(PEMDA_DIR, folder_name)
                if not os.path.exists(target_dir):
                    os.makedirs(target_dir)
                    
                new_filepath = os.path.join(target_dir, new_filename)
                shutil.move(filepath, new_filepath)
                
                old_rel = f"/images/portfolio/pemda-kaltim/{file}"
                new_rel = f"/images/portfolio/pemda-kaltim/{folder_name}/{new_filename}"
                replacements[old_rel] = new_rel
                print(f"Moved: {file} -> {folder_name}/{new_filename}")

    # Update references in code
    updated_files = 0
    for root, _, files in os.walk(RESOURCES_DIR):
        for f in files:
            if f.endswith(('.jsx', '.js')):
                file_path = os.path.join(root, f)
                try:
                    with open(file_path, 'r', encoding='utf-8') as fh:
                        content = fh.read()
                        
                    new_content = content
                    for old_rel, new_rel in replacements.items():
                        new_content = new_content.replace(old_rel, new_rel)
                        
                    if content != new_content:
                        with open(file_path, 'w', encoding='utf-8') as fh:
                            fh.write(new_content)
                        updated_files += 1
                        print(f"Updated references in: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
                    
    print(f"\nOrganization complete!")
    print(f"Moved {len(replacements)} files.")
    print(f"Updated {updated_files} code files.")

if __name__ == '__main__':
    organize_pemda()
