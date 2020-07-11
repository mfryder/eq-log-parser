const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {
    const EqQuest = new Schema({
        name                : String,
        walkthrough         : String,
        startZone           : String,
        questGiver          : String,
        minLevel            : Number,
        reward              : Array,
        classes             : Array,
        relatedZones        : Array,
        relatedNPCs         : Array,
        positiveFaction     : Array,
        negativeFaction     : Array
    });
    mongoose.model("EqQuest", EqQuest);
};