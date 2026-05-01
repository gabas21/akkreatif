import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const dir = './public/images/logo client';
const files = await fs.readdir(dir);

for (const file of files) {
    if (file.startsWith('transparent_')) continue;
    
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.webp')) {
        console.log(`Processing ${file}...`);
        const filePath = path.join(dir, file);
        
        try {
            // Get raw pixel data
            const { data, info } = await sharp(filePath)
                .ensureAlpha()
                .raw()
                .toBuffer({ resolveWithObject: true });

            // Iterate over pixels. If RGB are all > 240, set alpha to 0.
            for (let i = 0; i < data.length; i += info.channels) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // If it's mostly white, make it transparent
                // Using a threshold of 240 to catch slightly off-white pixels
                if (r > 240 && g > 240 && b > 240) {
                    data[i + 3] = 0; // Set alpha to 0
                }
            }

            const ext = path.extname(file);
            const base = path.basename(file, ext);
            const outPath = path.join(dir, `transparent_${base}.png`);
            
            await sharp(data, {
                raw: {
                    width: info.width,
                    height: info.height,
                    channels: info.channels
                }
            })
            .png()
            .toFile(outPath);
            
            console.log(`Saved transparent_${base}.png`);
        } catch (e) {
            console.error(`Failed to process ${file}:`, e);
        }
    }
}
