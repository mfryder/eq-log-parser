const util = require('util')
const fs = require('fs').promises;
const logger = require('../../../config/logger');
const config = require('config');
const EqLogBattleParser = require("./EqLogBattleParser");


class EqLogFileParser {

    static async parse(){
        let that = this;
        const files = await fs.readdir(config.get('fileParser.inputPath'), {"withFileTypes": true});
        let promiseArray = [];
        for (const file of files) {
            if(file.isFile()){
                promiseArray.push(this.parseTextFile(file.name)
                    .then(function finishedParsing(){
                        return that.moveFile(file.name);
                    }));
            }
        }
        return Promise.all(promiseArray);
    }

    static async parseTextFile(fileName){
        logger.info(fileName);
        const data = await fs.readFile(config.get('fileParser.inputPath')+"\\"+fileName);
        let array = data.toString().split("\n");
        await EqLogBattleParser.parseBattles(array);
    }

    static async moveFile(fileName){
        return await fs.rename(config.get('fileParser.inputPath')+"\\"+fileName, 
            config.get('fileParser.outputPath')+"\\"+fileName)
            .then(function finished(){
                return "completed "+fileName;
            });
    }


}

module.exports = EqLogFileParser