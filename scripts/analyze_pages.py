import fitz
doc = fitz.open('Company Profile AK Kreatif.pdf')

for p in range(23, 44):
    page = doc[p]
    text = page.get_text('text').strip()
    lines = [l.strip() for l in text.split('\n') if l.strip() and len(l.strip()) > 3]
    
    names = []
    for l in lines:
        l_clean = l.strip()
        skip_words = ['AK Kreatif', 'PORTOFOLIO', 'WEBSITE', 'APLIKASI', 'PEMERINTAH', 'GOVERNMENT', 'SWASTA', 'NON.GOV', 'P E M', 'G O V', 'L E G', 'L E G I', 'S W A', 'N O N']
        if any(skip in l_clean for skip in skip_words):
            continue
        if len(l_clean) > 5 and not l_clean.isdigit():
            names.append(l_clean)
    
    sep = " | "
    top_names = names[:6]
    result = sep.join(top_names)
    print(f'HAL {p+1}: {result}')

doc.close()
