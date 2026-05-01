const fs = require('fs');
const svg = fs.readFileSync('public/images/akpulau.svg', 'utf8');
console.log(svg.replace(/data:image\/png;base64,[^"']+/g, 'DATA'));
