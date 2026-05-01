const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'images', 'akpulau.svg');
let s = fs.readFileSync(svgPath, 'utf8');

// Target: sisipkan <rect> hitam DI DALAM clip-path e8883f83b8 
// tapi SEBELUM <g mask="url(#60d77171c9)">
// Ini membuat area 101,181→493,661 terisi hitam, 
// lalu elemen gambar berwarna menimpa area hijau,
// tapi area AK (yang di-mask jadi transparan) tetap hitam karena rect ada di bawahnya

// Temukan: <g clip-path="url(#e8883f83b8)"><g mask="url(#60d77171c9)">
const target = '<g clip-path="url(#e8883f83b8)"><g mask="url(#60d77171c9)">';
const idx = s.indexOf(target);

if (idx === -1) {
    console.error('Target pattern not found!');
    process.exit(1);
}

console.log('Found target at index:', idx);

// Ganti dengan: tambahkan rect hitam SEBELUM <g mask>
// Rect menggunakan koordinat viewBox SVG (595.5 x 842.25)
// clip-path e8883f83b8 mendefinisikan: M 101 181 L 493.761719 181 L 493.761719 661 L 101 661
const insertion = `<g clip-path="url(#e8883f83b8)"><rect x="101" y="181" width="392.761719" height="480" fill="black"/><g mask="url(#60d77171c9)">`;

const newSvg = s.substring(0, idx) + insertion + s.substring(idx + target.length);

const outputPath = path.join(__dirname, 'public', 'images', 'akpulau_fixed.svg');
fs.writeFileSync(outputPath, newSvg, 'utf8');

console.log('Done! Output:', outputPath);
console.log('Original length:', s.length);
console.log('New length:', newSvg.length);
console.log('Difference:', newSvg.length - s.length, 'chars added');
