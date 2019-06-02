class Battle {
    constructor(object){
        this.playerName = object.playerName;
        this.targetName = object.targetName;
        this.targetLevel = object.targetLevel;
        this.victory = object.victory;
        this.playerDPS = object.playerDPS;
        this.targetDPS = object.targetDPS;
        this.playerHPConsumption = object.playerHPConsumption;
        this.playerMPConsumption = object.playerMPConsumption;
        this.playerXPEarned = object.playerXPEarned;
        this.moneyEarned = object.moneyEarned;
        this.startTime = object.startTime;
        this.endTime = object.endTime;
        this.loot = object.loot !== null ? object.loot : [];
        this.location = object.location !== null ? 
            object.location : { x:0, y:0, z:0};
        this.zone = object.zone;
        this.continent = object.continent;
        this.server = object.server;
    }

    getPlayerName(){
        return this.playerName;
    }
    setPlayerName(playerName){
        this.playerName = playerName;
    }

    getTargetName(){
        return this.targetName;
    }

    setTargetName(targetName){
        this.targetName = targetName;
    }

    getTargetLevel(){
        return targetLevel;
    }

    setTargetLevel(targetLevel){
        this.targetLevel = targetLevel;
    }

    getVictory(){
        return this.victory;
    }

    setVictory(victory){
        this.victory = victory;
    }

    getPlayerDPS(){
        return this.playerDPS;
    }

    setPlayerDPS(playerDPS){
        this.playerDPS = playerDPS;
    }

    getTargetDPS(){
        return this.targetDPS;
    }

    setTargetDPS(targetDPS){
        this.targetDPS = targetDPS;
    }

    getPlayerHPConsumption(){
        return this.playerHPConsumption;
    }

    setPlayerHPConsumption(playerHPConsumption){
        this.playerHPConsumption = playerHPConsumption;
    }

    getPlayerMPConsumption(){
        return this.playerMPConsumption;
    }

    setPlayerMPConsumption(playerMPConsumption){
        this.playerMPConsumption = playerMPConsumption;
    }

    getPlayerXPEarned(){
        return this.playerXPEarned;
    }

    setPlayerXPEarned(playerXPEarned){
        this.playerXPEarned = playerXPEarned;
    }

    getMoneyEarned(){
        return this.moneyEarned;
    }

    setMoneyEarned(moneyEarned){
        this.moneyEarned = moneyEarned;
    }

    getStartTime(){
        return this.startTime;
    }

    setStartTime(startTime){
        this.startTime = startTime;
    }

    getEndTime(){
        return this.endTime;
    }

    setEndTime(endTime){
        this.endTime = endTime;
    }

    getLoot(){
        return this.loot;
    }

    setLoot(loot){
        this.loot = loot;
    }

    getLocation(){
        return this.location;
    }

    setLocation(location){
        this.location = location;
    }

    getZone(){
        return this.zone;
    }

    setZone(zone){
        this.zone = zone;
    }

    getContinent(){
        return this.continent;
    }

    setContinent(continent){
        this.continent = continent;
    }

    getServer(){
        return this.server;
    }

    setServer(server){
        this.server = server;
    }
}
module.exports = Battle