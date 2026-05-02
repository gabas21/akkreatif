import os
import re
import shutil

SCREENSHOTS_DIR = r'c:\laragon\www\akkreatif\public\images\portfolio\screenshots'
RESOURCES_DIR = r'c:\laragon\www\akkreatif\resources\js'

def organize_screenshots():
    if not os.path.exists(SCREENSHOTS_DIR):
        print(f"Directory not found: {SCREENSHOTS_DIR}")
        return

    files = os.listdir(SCREENSHOTS_DIR)
    
    replacements = {} # old_path -> new_path relative to screenshots
    
    # Move files and record replacements
    for file in files:
        filepath = os.path.join(SCREENSHOTS_DIR, file)
        if os.path.isfile(filepath):
            if '--' in file:
                parts = file.split('--', 1)
                project_folder = parts[0]
                new_filename = parts[1]
                
                target_dir = os.path.join(SCREENSHOTS_DIR, project_folder)
                if not os.path.exists(target_dir):
                    os.makedirs(target_dir)
                    
                new_filepath = os.path.join(target_dir, new_filename)
                shutil.move(filepath, new_filepath)
                
                old_rel = f"/images/portfolio/screenshots/{file}"
                new_rel = f"/images/portfolio/screenshots/{project_folder}/{new_filename}"
                replacements[old_rel] = new_rel
                print(f"Moved: {file} -> {project_folder}/{new_filename}")

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
    organize_screenshots()
