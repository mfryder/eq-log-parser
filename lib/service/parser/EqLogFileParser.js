const config = require('config');
const winston = require('winston');
const util = require('util')
const fs = require('fs').promises;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
});

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
        for(let val of array) {
            logger.info(val);
        }
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