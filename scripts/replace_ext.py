import os
import re

d = r'c:\laragon\www\akkreatif\resources\js'
pattern = re.compile(r'(/images/unsplash/[^\s\'\"]+)\.(jpg|png|jpeg)')

count = 0
for r, _, fs in os.walk(d):
    for f in fs:
        if f.endswith(('.jsx', '.js')):
            p = os.path.join(r, f)
            with open(p, 'r', encoding='utf-8') as file:
                content = file.read()
            
            new_content = pattern.sub(r'\1.webp', content)
            
            if content != new_content:
                with open(p, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count += 1
                print(f"Updated: {p}")

print(f"Replaced extensions in {count} files.")
