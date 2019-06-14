class EqZone {
    constructor(object){
        if(object){
            this.name = object.name;
            this.description = object.description;
            this.typesOfMonsters = object.typesOfMonsters;
            this.monsterLevelMin = object.monsterLevelMin;
            this.monsterLevelMax = object.monsterLevelMax;
            this.notableNpcs = object.notableNpcs;
            this.uniqueItems = object.uniqueItems;
            this.relatedQuests = object.relatedQuests;
            this.adjacentZones = object.adjacentZones;
            this.respawnTimer = object.respawnTimer;
            this.zem = object.zem;
        }else{
            this.name = "Unknown Zone";
            this.description = "Unknown Description";
            this.typesOfMonsters = [];
            this.monsterLevelMin = -1;
            this.monsterLevelMax = -1;
            this.notableNpcs = [];
            this.uniqueItems = [];
            this.relatedQuests = [];
            this.adjacentZones = [];
            this.respawnTimer = -1;
            this.zem = -1;  
        }

    }
    
    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getDescription(){
        return this.description;
    }

    setDescription(description){
        this.description = description;
    }

    getTypeOfMonsters(){
        return this.typesOfMonsters;
    }

    setTypeOfMonsters(monsters){
        this.typesOfMonsters = monsters;
    }

    getMonsterLevelMin(){
        return this.monsterLevelMin;
    }

    setMonsterLevelMin(min){
        this.monsterLevelMin = min;
    }

    getMonsterLevelMax(){
        return this.monsterLevelMax;
    }

    setMonsterLevelMax(max){
        this.monsterLevelMax = max;
    }

    getNotableNPCs(){
        return this.notableNpcs;
    }

    setNotableNPCs(npcs){
        this.notableNpcs = npcs;
    }

    getUniqueItems(){
        return this.uniqueItems;
    }

    setUniqueItems(items){
        this.uniqueItems = items;
    }

    getRelatedQuests(){
        return this.relatedQuests;
    }

    setRelatedQuests(quests){
        this.relatedQuests = quests;
    }

    getAdjacentZones(){
        return this.adjacentZones;
    }

    setAdjacentZones(zones){
        this.adjacentZones = zones;
    }

    getRespawnTimer(){
        return this.respawnTimer;
    }

    setRespawnTimer(timer){
        this.respawnTimer = timer;
    }

    getZem(){
        return this.zem;
    }

    setZem(zem){
        this.zem = zem;
    }
}
module.exports = EqZone