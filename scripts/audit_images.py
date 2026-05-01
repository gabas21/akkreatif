import os, re

RESOURCES = r'c:\laragon\www\akkreatif\resources'
PUBLIC = r'c:\laragon\www\akkreatif\public'
BASE = r'c:\laragon\www\akkreatif'

all_refs = {}
ext_refs = {}

for root, dirs, files in os.walk(RESOURCES):
    for fn in files:
        if not fn.endswith(('.jsx', '.js', '.css')): continue
        fp = os.path.join(root, fn)
        try:
            content = open(fp, 'r', encoding='utf-8', errors='ignore').read()
        except:
            continue
        
        rel = os.path.relpath(fp, BASE)
        
        # Local /images/ refs
        pattern_local = r"""['"](/images/[^'"]+)['"]"""
        for m in re.findall(pattern_local, content):
            all_refs.setdefault(m, []).append(rel)
        
        # External akkreatif.com/img refs
        pattern_ext = r"""['"]https?://akkreatif\.com/img[^'"]+['"]"""
        for m in re.findall(pattern_ext, content):
            clean = m.strip("'\"")
            ext_refs.setdefault(clean, []).append(rel)

# Check local refs
print("=" * 70)
print(f"  LOCAL IMAGE REFERENCES: {len(all_refs)} unique paths")
print("-" * 70)
broken = []
ok_count = 0
for p in sorted(all_refs):
    fs = os.path.join(PUBLIC, p.lstrip('/'))
    if os.path.isfile(fs):
        ok_count += 1
    else:
        broken.append(p)
        files_str = ', '.join(set(all_refs[p]))
        print(f"  BROKEN  {p}")
        print(f"          -> {files_str}")

print(f"\n  OK: {ok_count} | BROKEN: {len(broken)}")

# External refs
print(f"\n{'=' * 70}")
print(f"  EXTERNAL akkreatif.com REFS: {len(ext_refs)}")
print("-" * 70)
for u in sorted(ext_refs):
    files_str = ', '.join(set(ext_refs[u]))
    print(f"  {u[:90]}")
    print(f"    -> {files_str}")

# Orphaned files
print(f"\n{'=' * 70}")
print(f"  ORPHANED FILES (exist but not referenced)")
print("-" * 70)
ref_set = set()
for p in all_refs:
    fp = os.path.normpath(os.path.join(PUBLIC, p.lstrip('/')))
    ref_set.add(fp)

orphaned = []
img_dir = os.path.join(PUBLIC, 'images')
for root, dirs, files in os.walk(img_dir):
    for fn in files:
        fp = os.path.normpath(os.path.join(root, fn))
        if fp not in ref_set:
            rel = os.path.relpath(fp, PUBLIC)
            sz = os.path.getsize(fp) / 1024
            orphaned.append((rel, sz))

total_kb = 0
for rel, sz in sorted(orphaned):
    total_kb += sz
    print(f"  ORPHAN  {rel:55s} ({sz:.0f} KB)")

print(f"\n  Orphaned: {len(orphaned)} files ({total_kb/1024:.1f} MB)")
print("=" * 70)
