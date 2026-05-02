"""
Download semua screenshot microlink.io ke lokal dan update Portfolio.jsx
"""
import re
import os
import time
import urllib.request
import urllib.parse
from pathlib import Path

PORTFOLIO_PATH = Path(__file__).parent.parent / "resources/js/Pages/Portfolio.jsx"
OUT_DIR = Path(__file__).parent.parent / "public/images/portfolio/screenshots"
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROJECT_MAP = {
    'bappelitbangdamahulu.akkreatif.my.id': 'bappelitbangda-mahulu',
    'mgrmkukar.akkreatif.my.id':            'mgrm-kukar',
    'inspektoratmahulu.akkreatif.my.id':    'inspektorat-mahulu',
}

def url_to_filename(microlink_url, index):
    parsed = urllib.parse.urlparse(microlink_url)
    params = urllib.parse.parse_qs(parsed.query)
    target = params.get('url', [''])[0]
    if not target:
        return "screenshot_%02d.jpg" % index
    tp = urllib.parse.urlparse(target)
    host = tp.netloc.replace('www.', '')
    path = tp.path.strip('/').replace('/', '-') or 'home'
    for key, short in PROJECT_MAP.items():
        if key in host:
            host = short
            break
    else:
        host = host.split('.')[0]
    return "%s--%s.jpg" % (host, path)

def download(url, dest):
    if dest.exists():
        print("  SKIP (exists): %s" % dest.name)
        return True
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        if len(data) < 1000:
            print("  FAIL too small (%d bytes): %s" % (len(data), dest.name))
            return False
        dest.write_bytes(data)
        print("  DL (%dKB): %s" % (len(data)//1024, dest.name))
        return True
    except Exception as e:
        print("  ERR: %s -- %s" % (dest.name, e))
        return False

def main():
    print("\nOutput dir: %s\n" % OUT_DIR)
    content = PORTFOLIO_PATH.read_text(encoding='utf-8')
    pattern = r"'(https://api\.microlink\.io/[^']+)'"
    matches = re.findall(pattern, content)
    print("Found %d microlink URLs\n" % len(matches))

    replacement_map = {}
    for i, url in enumerate(matches):
        filename = url_to_filename(url, i)
        dest = OUT_DIR / filename
        web_path = "/images/portfolio/screenshots/%s" % filename
        print("[%d/%d] %s" % (i+1, len(matches), filename))
        ok = download(url, dest)
        if ok:
            replacement_map[url] = web_path
        time.sleep(0.3)

    if not replacement_map:
        print("\nWARN: No successful downloads -- Portfolio.jsx not modified.")
        return

    print("\nUpdating Portfolio.jsx (%d replacements)..." % len(replacement_map))
    new_content = content
    for old_url, new_path in replacement_map.items():
        new_content = new_content.replace("'%s'" % old_url, "'%s'" % new_path)

    PORTFOLIO_PATH.write_text(new_content, encoding='utf-8')
    print("DONE: Portfolio.jsx updated.\n")

    remaining = re.findall(pattern, new_content)
    if remaining:
        print("WARN: %d microlink URLs still remain (failed downloads):" % len(remaining))
        for u in remaining:
            print("  - %s..." % u[:80])

if __name__ == '__main__':
    main()
