const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('C:/laragon/www/akkreatif/public/images/Company Profile AK Kreatif.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('C:/laragon/www/akkreatif/pdf-content.txt', data.text);
    console.log('PDF text extracted to pdf-content.txt');
}).catch(function(err) {
    console.error(err);
});
