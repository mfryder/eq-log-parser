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
}
module.exports = Battle