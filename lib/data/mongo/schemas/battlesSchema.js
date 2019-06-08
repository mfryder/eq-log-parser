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
        playerXPEarned      : Boolean,
        moneyEarned         : Number,
        startTime           : Date,
        endTime             : Date,
        loot                : Array,
        zone                : String,
        continent           : String,
        server              : String,    
        location            : {
            x               : Number,
            y               : Number,
            z               : Number
        }
    });
    mongoose.model("Battles", Battles);
};