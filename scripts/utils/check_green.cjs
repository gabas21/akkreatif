const { Jimp } = require('jimp');

async function processImage() {
    try {
        const image = await Jimp.read('public/images/akpulau_raw.png');
        
        let greenCount = 0;
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            // If G > R + 50 and G > B + 50, it's green-ish
            if (g > r + 30 && g > b + 30) greenCount++;
        });
        
        console.log(`Greenish pixels: ${greenCount}`);
    } catch(e) {
        console.error(e);
    }
}
processImage();
