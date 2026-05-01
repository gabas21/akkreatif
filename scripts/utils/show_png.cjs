const fs = require('fs');
const img = fs.readFileSync('public/images/akpulau_raw.png');
const md = `![akpulau](data:image/png;base64,${img.toString('base64')})`;
fs.writeFileSync('.gemini/antigravity/brain/a7fd2db1-ee90-4f32-a9fc-aafe8ffd1e2f/scratch/image.md', md);
