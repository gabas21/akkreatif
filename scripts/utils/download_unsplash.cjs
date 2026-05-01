const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = 'c:/laragon/www/akkreatif/resources/js';
const imgDir = 'c:/laragon/www/akkreatif/public/images/unsplash';

if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

const walkSync = function(dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filepath)) {
            console.log(`Skipping (exists): ${filepath}`);
            resolve();
            return;
        }
        https.get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                https.get(res.headers.location, (res2) => {
                    const writeStream = fs.createWriteStream(filepath);
                    res2.pipe(writeStream);
                    writeStream.on('finish', () => {
                        writeStream.close();
                        console.log(`Downloaded: ${filepath}`);
                        resolve();
                    });
                }).on('error', reject);
            } else {
                const writeStream = fs.createWriteStream(filepath);
                res.pipe(writeStream);
                writeStream.on('finish', () => {
                    writeStream.close();
                    console.log(`Downloaded: ${filepath}`);
                    resolve();
                });
            }
        }).on('error', reject);
    });
};

async function processFiles() {
    const files = walkSync(dir).filter(f => f.endsWith('.jsx'));
    const urlRegex = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9\-]+)\?([a-zA-Z0-9=&\/]*)/g;

    let uniqueUrls = {};

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let match;

        while ((match = urlRegex.exec(content)) !== null) {
            const fullUrl = match[0];
            const id = match[1];
            uniqueUrls[fullUrl] = id;
        }
    }

    const urls = Object.keys(uniqueUrls);
    console.log(`Found ${urls.length} unique Unsplash URLs.`);

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const id = uniqueUrls[url];
        const filepath = path.join(imgDir, `${id}.jpg`);
        try {
            await downloadImage(url, filepath);
            // wait a little bit to avoid rate limiting
            await new Promise(r => setTimeout(r, 200));
        } catch (e) {
            console.error(`Error downloading ${url}:`, e);
        }
    }

    // Now replace
    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        for (const url of Object.keys(uniqueUrls)) {
            if (content.includes(url)) {
                const id = uniqueUrls[url];
                const localPath = `/images/unsplash/${id}.jpg`;
                content = content.split(url).join(localPath);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated: ${file}`);
        }
    }
}

processFiles().then(() => console.log('Done.')).catch(console.error);
