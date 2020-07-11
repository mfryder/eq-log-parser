const mongoose = require('mongoose');
const EqQuest = mongoose.model("EqQuest");
const AbstractCollection = require("./AbstractCollection");
const mongoDb = require('../../../../config/mongoDb');

class EqQuestCollection extends AbstractCollection{
    static store(zone){
        let questsToBeStored = new EqQuest(zone);
        return questsToBeStored.save();
    }

    static findAll(){
        return EqQuest.find();
    }

    static drop(){
        return mongoDb.dropCollection("eqquests");
    }
}

module.exports = EqQuestCollection;