const mongoose = require('mongoose');
const EqZone = mongoose.model("EqZone");
const AbstractCollection = require("./AbstractCollection");

class EqZoneCollection extends AbstractCollection{
    static store(zone){
        let zonesToBeStored = new EqZone(zone);
        return zonesToBeStored.save();
    }

    static findAll(){
        return EqZone.find();
    }
}

module.exports = EqZoneCollection;