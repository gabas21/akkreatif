import re

file_path = r'c:\laragon\www\akkreatif\resources\js\Pages\Portfolio.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace .jpg and .png with .webp for everything inside /images/portfolio/screenshots/
new_content = re.sub(r'(/images/portfolio/screenshots/[^\'\"\s]+)\.(jpg|png)', r'\1.webp', content)

# Also check for pemda-kaltim since I saw webp versions were generated there too!
new_content = re.sub(r'(/images/portfolio/pemda-kaltim/[^\'\"\s]+)\.(jpg|png)', r'\1.webp', new_content)

if content != new_content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated extensions to .webp in Portfolio.jsx")
else:
    print("No extensions needed updating.")
