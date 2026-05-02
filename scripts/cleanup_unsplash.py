import os
import hashlib
import re

PUBLIC_DIR = r'c:\laragon\www\akkreatif\public\images\unsplash'
RESOURCES_DIR = r'c:\laragon\www\akkreatif\resources'

def get_hash(filepath):
    hasher = hashlib.md5()
    with open(filepath, 'rb') as afile:
        buf = afile.read()
        hasher.update(buf)
    return hasher.hexdigest()

def find_all_references():
    content = ""
    for root, _, files in os.walk(RESOURCES_DIR):
        for f in files:
            if f.endswith(('.jsx', '.js', '.blade.php', '.css')):
                try:
                    with open(os.path.join(root, f), 'r', encoding='utf-8', errors='ignore') as file:
                        content += file.read() + "\n"
                except:
                    pass
    return content

def main():
    if not os.path.exists(PUBLIC_DIR):
        print(f"Directory not found: {PUBLIC_DIR}")
        return

    all_code_content = find_all_references()
    
    files_in_unsplash = os.listdir(PUBLIC_DIR)
    
    hashes = {}
    duplicates = []
    unused = []
    
    # 1. Find duplicates by hash
    for f in files_in_unsplash:
        filepath = os.path.join(PUBLIC_DIR, f)
        if os.path.isfile(filepath):
            file_hash = get_hash(filepath)
            if file_hash in hashes:
                duplicates.append((f, hashes[file_hash]))
            else:
                hashes[file_hash] = f
                
    # 2. Check for references
    # We will look for the exact filename in the codebase
    for f in files_in_unsplash:
        if f not in all_code_content:
            unused.append(f)
            
    print(f"Total files in unsplash: {len(files_in_unsplash)}")
    print(f"Duplicates found: {len(duplicates)}")
    for dup, original in duplicates:
        print(f"  {dup} is a duplicate of {original}")
        
    print(f"Unused files found: {len(unused)}")
    
    # Calculate bytes to free
    bytes_to_free = 0
    files_to_delete = set()
    
    # We can delete unused files
    for u in unused:
        files_to_delete.add(u)
        
    # For duplicates, if one is unused, it's already in files_to_delete. 
    # If both are unused, they are both in files_to_delete.
    # If both are used (rare), we keep them unless we want to rewrite code.
    
    for f in files_to_delete:
        filepath = os.path.join(PUBLIC_DIR, f)
        if os.path.exists(filepath):
            bytes_to_free += os.path.getsize(filepath)
            os.remove(filepath)
            print(f"Deleted: {f}")
            
    print(f"\nCleanup complete!")
    print(f"Deleted {len(files_to_delete)} files.")
    print(f"Freed {bytes_to_free / (1024*1024):.2f} MB of space.")

if __name__ == '__main__':
    main()
