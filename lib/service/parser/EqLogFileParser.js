var config = require('config');
const util = require('util')
const fs = require('fs').promises;

class EqLogFileParser {

    async parse(){
        const files = await fs.readdir(config.fileParser.inputPath, true);
        files.forEach(file => {
            if(file.isFile()){
                await this.parseTextFile(file.name());
                await this.moveFile(file.name());
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
        await fs.rename(config.fileParser.inputPath+fileName, 
            config.fileParser.outputPath+fileName);
    }
}

module.exports = EqLogFileParser