var fs = require('fs');
var config = require('config');
const util = require('util')
const fs_readdir = util.promisify(fs.readdir);
const fs_readFile = util.promisify(fs.readFile);
const fs_rename = util.promisify(fs.rename);

class EqLogFileParser {

    parse(){
        return fs_readdir(config.inputPath, true)
        fs.readdir(config.inputPath, true, (err, files) => {
            files.forEach(file => {
              if(file.isFile())
                this.parseTextFile(file.name())
                    .then(this.moveFile(file.name()));
            });
        })
    }

    parseTextFile(fileName){
        
        var array = data.toString().split("\n");
        for(i in array) {
            console.log(array[i]);
        }
    }

    moveFile(fileName){
        var promise = new Promise();
        fs.rename('oldFile.txt', 'newFile.txt', (err) => {
            if (err) {
                promise.reject(err);
            }
            console.log('Rename complete!');
            promise.resolve();
        });
        return promise.defer();
    }

}



module.exports = EqLogFileParser