const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {
    const EqZone = new Schema({
        name                : String,
        description         : String,
        typesOfMonsters     : Array,
        monsterLevelMin     : Number,
        monsterLevelMax     : Number,
        notableNpcs         : Array,
        uniqueItems         : Array,
        relatedQuests       : Array,
        adjacentZones       : Array,
        respawnTimer        : Number,
        zem                 : Number
    });
    mongoose.model("EqZone", EqZone);
};