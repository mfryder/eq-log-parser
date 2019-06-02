const mongoose = require('mongoose');
const Battles = mongoose.model("Battles");
const AbstractCollection = require("./AbstractCollection");
const logger = require('winston');

class BattlesCollection extends AbstractCollection{
    static store(battle){
        let battleToBeStored = new Battles(battle);
        return battleToBeStored.save();
    }

    static findAll(){
        return Battles.find();
    }
}

module.exports = BattlesCollection;