const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'images', 'akpulau.svg');
const s = fs.readFileSync(svgPath, 'utf8');

// Cari posisi clip-path island
const idx = s.indexOf('id="e8883f83b8"');
console.log('clip-path e8883f83b8 found at:', idx);
console.log('Context:', s.substring(idx - 20, idx + 200));

// Cari semua penggunaan mask 60d77171c9
const maskIdx = s.indexOf('mask="url(#60d77171c9)"');
console.log('\nmask 60d77171c9 used at:', maskIdx);
console.log('Context:', s.substring(maskIdx - 50, maskIdx + 500));

// Cari apa yang ada tepat setelah </defs>
const defsEnd = s.indexOf('</defs>');
console.log('\n</defs> at:', defsEnd);
console.log('After </defs>:', s.substring(defsEnd, defsEnd + 500));
