const fs = require('fs');
const svg = fs.readFileSync('public/images/akpulau.svg', 'utf8');
const match = svg.match(/data:image\/png;base64,([^"']+)/);
if (match) {
  fs.writeFileSync('public/images/akpulau_raw.png', Buffer.from(match[1], 'base64'));
  console.log('Saved akpulau_raw.png');
} else {
  console.log('No base64 image found');
}
