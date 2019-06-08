const config = require("config");
const BattlesCollection = require("../../../data/mongo/collections/BattlesCollection");
const AbstratCrudService = require("../AbstractCrudService");

class BattleCrudServiceMongo extends AbstratCrudService {

    static async store(battle){
        return await BattlesCollection.store(battle);
    }

    static async findAll(){
        return await BattlesCollection.findAll();
    }
}

module.exports = BattleCrudServiceMongo;