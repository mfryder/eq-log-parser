var config = require('config');
const util = require('util')
const fs = require('fs').promises;

class EqLogFileParser {

    async parse(){
        const files = await fs.readdir(config.get('fileParser.inputPath'), true);
        files.forEach(file => {
            if(file.isFile()){
                await parseTextFile(file.name());
                await moveFile(file.name());
            }
        });
    }

    async parseTextFile(fileName){
        const data = await fs.readFile(filename);
        let array = data.toString().split("\n");
        for(let val of array) {
            console.log(val);
        }
    }

    async moveFile(fileName){
        await fs.rename(config.get('fileParser.inputPath')+fileName, 
            config.get('fileParser.outputPath')+fileName);
    }
}

module.exports = EqLogFileParser