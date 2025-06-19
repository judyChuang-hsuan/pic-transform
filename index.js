const fs = require('fs');
const path = require('path');
const sharp = require('sharp');



const command = process.argv[2]
console.log(command)

if (!command) {
    console.log('請輸入指令，例如：png2webp、jpg2png')
    process.exit(1)
}

const convertRules = {
    png2webp: {from: '.png', toExt: '.webp', format: 'webp'},
    jpg2png: {from: '.jpg', toExt: '.png', format: 'png'},
    jpg2webp: {from: '.jpg', toExt: '.webp', format: 'webp'},
    gif2webp: {from: '.gif', toExt: '.webp', format: 'webp'},
}

const rule = convertRules[command]

if (!rule) {
    console.log(`不支援的指令：「${command}」`)
    process.exit(1);
}

const inputDir = './images'
const outputDir = `./${rule.format}`

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
}


fs.readdirSync(inputDir).forEach(file => {
    const ext = path.extname(file).toLowerCase()
    if (ext === rule.from) {
        const inputPath = path.join(inputDir, file)
        const outputPath = path.join(outputDir, file.replace(ext, rule.toExt))

        sharp(inputPath)
            .toFormat(rule.format)
            .toFile(outputPath)
            .then(() => console.log(`✅ Converted: ${file} → ${path.basename(outputPath)}`))
            .catch(err => console.error(`❌ Error converting ${file}:`, err))
    }
})