const { Jimp } = require('jimp');

async function processImage() {
    try {
        console.log("Loading image...");
        const image = await Jimp.read('public/images/akpulau_raw.png');
        console.log(`Size: ${image.bitmap.width}x${image.bitmap.height}`);
        
        let transparentCount = 0;
        let opaqueCount = 0;
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const alpha = this.bitmap.data[idx + 3];
            if (alpha === 0) transparentCount++;
            else opaqueCount++;
        });
        
        console.log(`Transparent pixels: ${transparentCount}`);
        console.log(`Opaque/semi pixels: ${opaqueCount}`);
    } catch(e) {
        console.error(e);
    }
}
processImage();
