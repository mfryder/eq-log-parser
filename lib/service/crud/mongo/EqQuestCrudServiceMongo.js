const config = require("config");
const EqQuestCollection = require("../../../data/mongo/collections/EqQuestCollection");
const AbstratCrudService = require("../AbstractCrudService");

class EqQuestCrudServiceMongo extends AbstratCrudService {

    static async store(quest){
        return await EqQuestCollection.store(quest);
    }

    static async findAll(){
        return await EqQuestCollection.findAll();
    }

    static async drop(){
        return await EqQuestCollection.drop();
    }
}

module.exports = EqQuestCrudServiceMongo;