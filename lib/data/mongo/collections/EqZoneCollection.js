const mongoose = require('mongoose');
const EqZone = mongoose.model("EqZone");
const AbstractCollection = require("./AbstractCollection");
const mongoDb = require('../../../../config/mongoDb');

class EqZoneCollection extends AbstractCollection{
    static store(zone){
        let zonesToBeStored = new EqZone(zone);
        return zonesToBeStored.save();
    }

    static findAll(){
        return EqZone.find();
    }

    static drop(){
        return mongoDb.dropCollection("eqzones");
    }
}

module.exports = EqZoneCollection;