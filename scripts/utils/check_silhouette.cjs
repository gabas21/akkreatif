const { Jimp } = require('jimp');

async function processImage() {
    try {
        const image = await Jimp.read('public/images/akpulau_raw.png');
        let whitePixels = 0;
        let blackPixels = 0;
        let otherPixels = 0;
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx];
            if (r > 200) whitePixels++;
            else if (r < 50) blackPixels++;
            else otherPixels++;
        });
        
        console.log(`White (island): ${whitePixels}`);
        console.log(`Black (bg/holes): ${blackPixels}`);
        console.log(`Other: ${otherPixels}`);
    } catch(e) {
        console.error(e);
    }
}
processImage();
