const config = require("config");
const EqZoneCollection = require("../../../data/mongo/collections/EqZoneCollection");
const AbstratCrudService = require("../AbstractCrudService");

class EqZoneCrudServiceMongo extends AbstratCrudService {

    static async store(zone){
        return await EqZoneCollection.store(zone);
    }

    static async findAll(){
        return await EqZoneCollection.findAll();
    }

    static async drop(){
        return await EqZoneCollection.drop();
    }
}

module.exports = EqZoneCrudServiceMongo;