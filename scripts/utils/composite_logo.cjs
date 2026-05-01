/**
 * Render SVG di atas background hitam untuk mengisi area transparan (huruf AK).
 * Kemudian hilangkan background hitam luar pulau menggunakan mask.
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function main() {
    const svgPath = path.join(__dirname, 'public', 'images', 'akpulau.svg');
    const maskPath = path.join(__dirname, 'public', 'images', 'akpulau_mask.png');
    const outputPath = path.join(__dirname, 'public', 'images', 'akpulau_final.png');

    const TARGET_WIDTH = 1080;

    // Step 1: Render SVG sebagai PNG (transparan)
    console.log('Rendering SVG...');
    const svgBuffer = fs.readFileSync(svgPath);
    
    const svgPng = await sharp(svgBuffer)
        .resize(TARGET_WIDTH, null, { fit: 'inside', withoutEnlargement: false })
        .png()
        .toBuffer();
    
    const meta = await sharp(svgPng).metadata();
    const W = meta.width;
    const H = meta.height;
    console.log(`SVG rendered: ${W}x${H}, hasAlpha: ${meta.hasAlpha}`);

    // Step 2: Buat background hitam solid seukuran SVG
    const blackBg = {
        create: {
            width: W,
            height: H,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 255 }
        }
    };

    // Step 3: Composite SVG di atas background hitam
    // Hasilnya: area transparan SVG (huruf AK) → hitam terlihat
    const withBlackBg = await sharp(blackBg)
        .composite([{ input: svgPng, blend: 'over' }])
        .png()
        .toBuffer();
    
    console.log('SVG composited over black background');

    // Step 4: Resize mask ke ukuran yang sama
    const maskResized = await sharp(maskPath)
        .resize(W, H, { fit: 'fill' })
        .grayscale()
        .threshold(128)
        .toBuffer();

    // Step 5: Terapkan mask sebagai alpha channel
    // Mask: putih=pulau area (opaque), hitam=luar pulau (transparan)
    // kita pakai mask sebagai alpha pada composite result
    const maskData = await sharp(maskResized).raw().toBuffer();
    const bgData = await sharp(withBlackBg).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    
    // Buat final buffer dengan alpha dari mask
    const finalBuffer = Buffer.alloc(W * H * 4);
    for (let i = 0; i < W * H; i++) {
        finalBuffer[i * 4 + 0] = bgData.data[i * 4 + 0]; // R
        finalBuffer[i * 4 + 1] = bgData.data[i * 4 + 1]; // G
        finalBuffer[i * 4 + 2] = bgData.data[i * 4 + 2]; // B
        finalBuffer[i * 4 + 3] = maskData[i];              // A = dari mask
    }

    await sharp(finalBuffer, {
        raw: { width: W, height: H, channels: 4 }
    })
    .png()
    .toFile(outputPath);
    
    console.log(`\nDone! Output: ${outputPath} (${W}x${H})`);
}

main().catch(console.error);
