const { join } = require('path');
const { readdirSync } = require('fs');
const [dir, search] = process.argv.slice(2);
const match = RegExp(search, 'g');
const files = readdirSync(dir);
const Jimp = require('jimp');

async function readjustImage(filePath, newFileName) {
  const image = await Jimp.read(filePath);
  return image
    .quality(60)
    .resize(3000, Jimp.AUTO)
   // .cover(3000, 3000)
    .write(`fixedImages/${newFileName}`);
}

files.filter(file => file.match(match)).forEach(file => {
  const filePath = join(dir, file);
  readjustImage(filePath, file)
    .then(() => {
      console.log(`${file} done!`)
    })
    .catch(e => {
      console.error(e);
    });

})

