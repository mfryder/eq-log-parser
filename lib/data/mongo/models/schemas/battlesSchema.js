const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {
    const Battles = new Schema({
        playerName          : String,
        targetName          : String,
        targetLevel         : Number,
        victory             : Boolean,
        playerDPS           : Number,
        targetDPS           : Number,
        playerHPConsumption : Number,
        playerMPConsumption : Number,
        playerXPEarned      : Number,
        moneyEarned         : Number,
        startTime           : Date,
        endTime             : Date,
        loot                : Array
    });
    mongoose.model("Battles", Battles);
};