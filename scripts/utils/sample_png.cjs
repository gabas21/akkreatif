const { Jimp } = require('jimp');

async function processImage() {
    try {
        const image = await Jimp.read('public/images/akpulau_raw.png');
        console.log(`Image size: ${image.bitmap.width}x${image.bitmap.height}`);
        
        // Let's sample a few pixels from the center
        const cx = Math.floor(image.bitmap.width / 2);
        const cy = Math.floor(image.bitmap.height / 2);
        
        for (let y = cy - 100; y < cy + 100; y += 20) {
            for (let x = cx - 100; x < cx + 100; x += 20) {
                const idx = (y * image.bitmap.width + x) * 4;
                const r = image.bitmap.data[idx];
                const g = image.bitmap.data[idx + 1];
                const b = image.bitmap.data[idx + 2];
                // Only print non-black/white pixels
                if (Math.abs(r-g) > 10 || Math.abs(g-b) > 10) {
                    console.log(`Pixel at ${x},${y}: rgb(${r},${g},${b})`);
                }
            }
        }
        console.log("Done sampling.");
    } catch(e) {
        console.error(e);
    }
}
processImage();
