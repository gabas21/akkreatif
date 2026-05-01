const sharp = require('sharp');
const path = require('path');

async function generateInnerIslandMask() {
    const inputPath = path.join(__dirname, 'public', 'images', 'akpulau_raw.png');
    const outputPath = path.join(__dirname, 'public', 'images', 'akpulau_mask.png');

    const metadata = await sharp(inputPath).metadata();
    console.log(`Input: ${metadata.width}x${metadata.height}`);

    // Step 1: Threshold rendah untuk tangkap semua putih
    let buf = await sharp(inputPath)
        .greyscale()
        .threshold(80)
        .toBuffer();

    // Step 2: Dilate 4x — expand untuk mengisi SEMUA gap termasuk lubang kecil
    for (let i = 0; i < 4; i++) {
        buf = await sharp(buf)
            .blur(15)
            .threshold(15)
            .toBuffer();
    }

    // Step 3: Erode 4x — shrink kembali ke ukuran asli
    for (let i = 0; i < 4; i++) {
        buf = await sharp(buf)
            .blur(15)
            .threshold(240)
            .toBuffer();
    }

    // Step 4: Smooth tepi
    buf = await sharp(buf)
        .blur(3)
        .threshold(128)
        .toBuffer();

    // Step 5: Crop teks — hanya ambil area pulau
    const cropHeight = Math.floor(metadata.height * 0.70);
    
    await sharp(buf)
        .extract({ left: 0, top: 0, width: metadata.width, height: cropHeight })
        .extend({ bottom: metadata.height - cropHeight, background: { r: 0, g: 0, b: 0 } })
        .toFile(outputPath);

    console.log(`Mask berhasil: ${outputPath}`);
}

generateInnerIslandMask().catch(console.error);
