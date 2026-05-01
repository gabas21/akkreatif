const { Jimp } = require('jimp');

async function createIslandBackground() {
    try {
        console.log("Loading raw mask...");
        const image = await Jimp.read('public/images/akpulau_raw.png');
        
        // 1. We know the image is basically black (bg/holes) and white (island).
        // Let's create a new image of the same size, transparent.
        const w = image.bitmap.width;
        const h = image.bitmap.height;
        
        // Let's flood fill the outside of akpulau_raw.png
        // We'll mark pixels in a 2D array: 0=unvisited, 1=outside, 2=visited-but-not-outside
        const visited = new Uint8Array(w * h);
        
        // Flood fill from (0,0) assuming it's the outside ocean
        const stack = [[0, 0], [w-1, 0], [0, h-1], [w-1, h-1]]; // start from corners
        for (const [sx, sy] of stack) {
            if (visited[sy * w + sx]) continue;
            
            const q = [[sx, sy]];
            visited[sy * w + sx] = 1;
            
            let head = 0;
            while(head < q.length) {
                const [x, y] = q[head++];
                
                // check neighbors
                const neighbors = [
                    [x+1, y], [x-1, y], [x, y+1], [x, y-1]
                ];
                
                for(const [nx, ny] of neighbors) {
                    if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                        const idx = ny * w + nx;
                        if (visited[idx] === 0) {
                            // is it black? (background)
                            const pxIdx = idx * 4;
                            const r = image.bitmap.data[pxIdx];
                            if (r < 50) {
                                // It's black, so it's part of the outside
                                visited[idx] = 1;
                                q.push([nx, ny]);
                            } else {
                                // It's white (island boundary)
                                visited[idx] = 2; // marked as boundary so we don't process it as outside
                            }
                        }
                    }
                }
            }
        }
        
        // Now, any pixel that is NOT outside (visited !== 1) belongs to the island or holes.
        // We will make them BLACK in the new image, and the outside TRANSPARENT.
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const idx = y * w + x;
                const pxIdx = idx * 4;
                if (visited[idx] !== 1) {
                    // Island + holes -> BLACK opaque
                    image.bitmap.data[pxIdx] = 0;
                    image.bitmap.data[pxIdx + 1] = 0;
                    image.bitmap.data[pxIdx + 2] = 0;
                    image.bitmap.data[pxIdx + 3] = 255;
                } else {
                    // Outside -> TRANSPARENT
                    image.bitmap.data[pxIdx] = 0;
                    image.bitmap.data[pxIdx + 1] = 0;
                    image.bitmap.data[pxIdx + 2] = 0;
                    image.bitmap.data[pxIdx + 3] = 0;
                }
            }
        }
        
        await image.writeAsync('public/images/akpulau_bg.png');
        console.log("Background image created perfectly.");
        
    } catch(e) {
        console.error("Error:", e);
    }
}

createIslandBackground();
