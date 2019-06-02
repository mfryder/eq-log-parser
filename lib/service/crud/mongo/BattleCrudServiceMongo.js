const logger = require("winston");
const config = require("config");
const ErrorMessageFactory = require("./errors/ErrorFactory");
const BattlesCollection = require("./data/mongo/collections/BattlesCollection");
const AbstratCrudService = require("./service/AbstractCrudService");

class BattleCrudServiceMongo extends AbstratCrudService {

    static async store(battle){
        return await BattlesCollection.store(battle);
    }

    static findAll(){
        return await BattlesCollection.findAll();
    }
}

module.exports = BattleCrudServiceMongo;