import axios from 'axios';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
    'https://akkreatif.com',
    'https://akkreatif.com/website-and-application',
    'https://akkreatif.com/website-and-application/web-profil',
    'https://akkreatif.com/website-and-application/e-skm',
    'https://akkreatif.com/website-and-application/e-kegiatan',
    'https://akkreatif.com/website-and-application/e-perjadin',
    'https://akkreatif.com/website-and-application/siperindustrian',
    'https://akkreatif.com/social-media-management',
    'https://akkreatif.com/desain-grafis',
    'https://akkreatif.com/foto-video-event'
];

const outDir = path.join(__dirname, 'public', 'images', 'scrape');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

async function downloadImage(url, filename) {
    try {
        if (url.startsWith('/')) {
            url = 'https://akkreatif.com' + url;
        } else if (!url.startsWith('http')) {
            return;
        }
        
        console.log(`Downloading: ${url}`);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
        
        const dest = path.join(outDir, filename);
        const writer = fs.createWriteStream(dest);
        response.data.pipe(writer);
        
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (err) {
        console.error(`Failed to download ${url}: ${err.message}`);
    }
}

async function scrape() {
    let imgCount = 0;
    const downloadedUrls = new Set();
    
    for (const page of pages) {
        try {
            console.log(`\nScraping: ${page}`);
            const { data } = await axios.get(page);
            const dom = new JSDOM(data);
            const imgs = dom.window.document.querySelectorAll('img');
            
            for (const img of imgs) {
                const src = img.src;
                if (!src || downloadedUrls.has(src)) continue;
                downloadedUrls.add(src);
                
                // Get filename
                const ext = path.extname(src.split('?')[0]) || '.png';
                const filename = `img_${imgCount++}${ext}`;
                await downloadImage(src, filename);
            }
        } catch (err) {
            console.error(`Error scraping ${page}: ${err.message}`);
        }
    }
    console.log(`\nDone. Extracted ${imgCount} unique images to public/images/scrape/`);
}

scrape();
