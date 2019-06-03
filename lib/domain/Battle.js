const logger = require('../../config/logger');

class Battle {
    constructor(object){
        if(object){
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
        }else{
            this.playerName = "Unknown Player";
            this.targetName = "Unknown Target";
            this.targetLevel = 0;
            this.victory = false;
            this.playerDPS = 0;
            this.targetDPS = 0;
            this.playerHPConsumption = 0;
            this.playerMPConsumption = 0;
            this.playerXPEarned = false;
            this.moneyEarned = 0;
            this.startTime = Date.now();
            this.endTime = Date.now();
            this.loot = [];
            this.location = {x:-9999, y:-9999, z:-9999};
            this.zone = "Unknown Zone";
            this.continent = "Unknown Continent";
            this.server = "Unknown Server";
        }
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

    discoverInformationFromBattleText(battleText){
        this.discoverPlayerName(battleText);
        this.discoverTargetName(battleText);
        this.discoverTargetLevel(battleText);
        this.discoverPlayerXPEarned(battleText);
        this.discoverMoneyEarned(battleText);
        this.discoverStartTime(battleText);
        this.discoverEndTime(battleText);
        this.discoverLoot(battleText);
        this.discoverLocation(battleText);
        this.discoverZone(battleText);
        this.discoverContinent(battleText);
        this.discoverServer(battleText);
        this.discoverPlayerDPS(battleText);
        this.discoverTargetDPS(battleText);
        this.discoverPlayerMPConsumption(battleText);
    }

    discoverPlayerName(battleText){
        if(battleText.length > 0){
            let fightStart = battleText[0];
            let name = fightStart.substring(fightStart.indexOf("==")+3, fightStart.lastIndexOf("Fight")-1);
            logger.info("Player Name:");
            logger.info(name)
            this.setPlayerName(name);
        }else{
            this.setTargetName("Unknown Player");
        }
    }

    discoverTargetName(battleText){
        if(battleText.length > 0){
            let fightStart = battleText[0];
            let name = fightStart.substring(fightStart.indexOf("with")+5, fightStart.lastIndexOf(" "));
            logger.info("Target Name:");
            logger.info(name)
            this.setTargetName(name);
        }else{
            this.setTargetName("Unknown Target");
        }

    }
    discoverTargetLevel(battleText){
        let targetLevelArray = [];
        targetLevelArray = battleText
            .filter(text => text.toLowerCase().indexOf("assume level") > -1)
            .map(item => {
                let numberString = item.substring(item.lastIndexOf(" ")+1, item.length-2);
                logger.info("Target Level:");
                logger.info(numberString)
                return Number.parseInt(numberString); 
            });
        if(targetLevelArray.length > 0){
            this.setTargetLevel(targetLevelArray[0]);
        }else{
            this.setTargetLevel(0);
        }
    }
    discoverPlayerDPS(battleText){
        let number = 0;
        let meleeNumber = battleText.filter(text => text.indexOf("You") > -1 && text.indexOf("of damage") > -1)
                                    .reduce(this.obtainDamageFromText,0);
        let spellNumber = battleText.filter(text => text.indexOf("was hit by non-melee for") > -1)
                                    .reduce(this.obtainDamageFromText,0);
        logger.info("Total Damage:");
        logger.info(meleeNumber + spellNumber);
        let startDate = this.getStartTime();
        let endDate = this.getEndTime();
        logger.info("Start Date:");
        logger.info(startDate);
        logger.info("End Date:");
        logger.info(endDate);
        if(startDate && startDate.constructor == Date && endDate && endDate.constructor == Date){
            let millis = endDate.getTime() - startDate.getTime();
            let seconds = millis / 1000;
            let dmg = meleeNumber + spellNumber;
            let dps = Number.parseFloat(dmg / seconds);
            logger.info("Player DPS:");
            logger.info(dps);
            if(!dps || isNaN(dps)){
                this.setPlayerDPS(0.0);
            }
            this.setPlayerDPS(dps);
        }else{
            this.setPlayerDPS(0.0);
        } 
    }
    discoverTargetDPS(battleText){
        let number = 0;
        let dmg = battleText.filter(text => text.indexOf("YOU") > -1 && text.indexOf("of damage") > -1)
                                    .reduce(this.obtainDamageFromText, 0);
        let startDate = this.getStartTime();
        let endDate = this.getEndTime();
        logger.info("Total Damage:");
        logger.info(dmg);
        logger.info("Start Date:");
        logger.info(startDate);
        logger.info("End Date:");
        logger.info(endDate);
        if(startDate && startDate.constructor == Date && endDate && endDate.constructor == Date){
            let millis = endDate.getTime() - startDate.getTime();
            let seconds = millis / 1000;
            let dps = Number.parseFloat(dmg / seconds);
            logger.info("Target DPS:");
            logger.info(dps);
            if(!dps || isNaN(dps)){
                this.setTargetDPS(0.0);
            }
            this.setTargetDPS(dps);
        }else{
            this.setTargetDPS(0.0);
        }
        this.setPlayerHPConsumption(dmg);
    }
    discoverPlayerMPConsumption(battleText){
        let manaStart = 0;
        let manaEnd = 0;
        logger.info("MP Consumption");
        for(let textIdx in battleText){
            if(battleText[textIdx].indexOf("== MANA START ==") > -1 &&
                textIdx+1 !== battleText.length && battleText[textIdx+1]){
                    logger.info(battleText[textIdx+1]);
                    logger.info("ManaStart");
                    manaStart = Number.parseInt(battleText[textIdx+1]
                        .substring(battleText[textIdx+1].indexOf("\r"), battleText[textIdx+1].lastIndexOf("\r")));
                    logger.info(manaStart);
                    continue;
            }
            if(battleText[textIdx].indexOf("==  MANA END ==") > -1 &&
                textIdx+1 !== battleText.length && battleText[textIdx+1]){
                    logger.info(battleText[textIdx+1]);
                    logger.info("ManaEnd");
                    manaEnd = Number.parseInt(battleText[textIdx+1]
                        .substring(battleText[textIdx+1].indexOf("\r"), battleText[textIdx+1].lastIndexOf("\r")));
                    logger.info(manaEnd);
                    continue;
            }
        }
        if(manaStart && !isNaN(manaStart) && manaEnd && !isNaN(manaEnd)){
            this.setPlayerMPConsumption(manaStart - manaEnd);
        }else{
            this.setPlayerMPConsumption(0);
        }
    }
    discoverPlayerXPEarned(battleText){
        let experienceArray = battleText.filter(text => text.indexOf("You gain experience!!") > -1)
        if(experienceArray.length > 0){
            this.setVictory(true);
        }else{
            this.setVictory(false);
        }
    }
    discoverMoneyEarned(battleText){
        let moneyArray = battleText.filter(text => text.indexOf("You receive") > -1 && text.indexOf("from the corpse.") > -1)
                                    .map(text =>{
                                        if(text){
                                            logger.info("Money Text");
                                            logger.info(text);
                                            text = text.substring(text.indexOf("receive")+8, text.indexOf("from")-1);
                                            let textSplit = text.split(" ");
                                            let moneyVal = textSplit.reduce((total, current, currIdx, arr) =>{
                                                if(current === "platinum"){
                                                    return total + (Number.parseInt(arr[currIdx-1]) * 1000);
                                                }
                                                if(current === "gold"){
                                                    return total + (Number.parseInt(arr[currIdx-1]) * 100);
                                                }
                                                if(current === "silver"){
                                                    return total + (Number.parseInt(arr[currIdx-1]) * 10);
                                                }
                                                if(current === "copper"){
                                                    return total + (Number.parseInt(arr[currIdx-1]));
                                                }
                                                return total;
                                            },0);
                                            logger.info("Money Value:");
                                            logger.info(moneyVal);
                                            return moneyVal;
                                        }
                                        else return 0;
                                    })
        if(moneyArray.length > 0){
            this.setMoneyEarned(moneyArray[0]);
        }else{
            this.setMoneyEarned(0);
        }
    }
    discoverStartTime(battleText){
        if(battleText.length > 0){
            let dateTextArray = battleText[0].substring(battleText[0].indexOf("[")+1, battleText[0].indexOf("]")).split(" ");
            logger.info("Date Text Array Start Date:");
            logger.info(dateTextArray);
            if(dateTextArray.length > 4){
                let startDate = new Date();
                let mon = this.convertMonth(dateTextArray[1]);
                let day = Number.parseInt(dateTextArray[2]);
                let timeArray = dateTextArray[3].split(":");
                let hours = Number.parseInt(timeArray[0]);
                let minutes = Number.parseInt(timeArray[1]);
                let seconds = Number.parseInt(timeArray[2]); 
                let year = Number.parseInt(dateTextArray[4]);
                startDate.setMonth(mon);
                startDate.setDate(day);
                startDate.setSeconds(seconds);
                startDate.setMinutes(minutes);
                startDate.setHours(hours);
                startDate.setFullYear(year);
                this.setStartTime(startDate);
            }else{
                this.setStartTime(Date.now());
            }
        }else{
            this.setStartTime(Date.now());
        }
    }
    discoverEndTime(battleText){
        if(battleText.length > 0){
            let dateTextArray = battleText[battleText.length-1].substring(battleText[battleText.length-1].indexOf("[")+1, battleText[battleText.length-1].indexOf("]")).split(" ");
            logger.info("Date Text Array End Date:");
            logger.info(dateTextArray);
            if(dateTextArray.length > 4){
                let startDate = new Date();
                let mon = this.convertMonth(dateTextArray[1]);
                let day = Number.parseInt(dateTextArray[2]);
                let timeArray = dateTextArray[3].split(":");
                let hours = Number.parseInt(timeArray[0]);
                let minutes = Number.parseInt(timeArray[1]);
                let seconds = Number.parseInt(timeArray[2]); 
                let year = Number.parseInt(dateTextArray[4]);
                startDate.setMonth(mon);
                startDate.setDate(day);
                startDate.setSeconds(seconds);
                startDate.setMinutes(minutes);
                startDate.setHours(hours);
                startDate.setFullYear(year);
                this.setEndTime(startDate);
            }else{
                this.setEndTime(Date.now());
            }
        }else{
            this.setEndTime(Date.now());
        }
    }
    discoverLoot(battleText){
        let lootArray = battleText.filter(text => text.indexOf("--You have looted") > -1)
                                    .map(text =>{
                                        return text.substring(text.indexOf("looted")+7, text.lastIndexOf("."));
                                    });
        this.setLoot(lootArray);
    }
    discoverLocation(battleText){
        let location = battleText.filter(text => text.indexOf("Your Location is") > -1)
                                    .map(text => {
                                        text = text.substring(text.indexOf("is")+3);
                                        let textSplit = text.split(", ");
                                        return {
                                            x: Number.parseInt(textSplit[0]),
                                            y: Number.parseInt(textSplit[2]),
                                            z: Number.parseInt(textSplit[1])
                                        };
                                    });
        if(location.length> 0){
            this.setLocation(location[0]);
        }
    }
    discoverZone(battleText){
        let zone = battleText.filter(text => text.indexOf("There is") > -1 && text.indexOf("in") > -1)
                                .map(text => {
                                    return text.substring(text.indexOf("in")+3, text.lastIndexOf("."));
                                });
        if(zone.length > 0){
            this.setZone(zone[0]);
        }else{
            this.setZone("Unknown");
        }
    }
    discoverContinent(battleText){
        //get a zone mapping to set this
        this.setContinent("Faydwer");
    }
    discoverServer(battleText){
        //come up with a good solution here
        this.setServer("p99-red");
    }

    obtainDamageFromText(total, text){
        let start = text.lastIndexOf("for");
        if(start === -1 ){
            return total;
        }
        let end = text.lastIndexOf("point");
        if(end === -1){
            return total;
        }
        let num = text.substring(start+4, end-1);
        logger.info("Damage text:");
        logger.info(num);
        return total + Number.parseInt(num);
    }

    convertMonth(monthText){
        switch(monthText){
            case "Jan":
                return 1;
            case "Feb":
                return 2;
            case "Mar":
                return 3;
            case "Apr":
                return 4;
            case "May":
                return 5;
            case "Jun":
                return 6;
            case "Jul":
                return 7;
            case "Aug":
                return 8;
            case "Sep":
                return 9;
            case "Oct":
                return 10;
            case "Nov":
                return 11;
            case "Dec":
                return 12;
            default:
                return 1;
        }
    }


}
module.exports = Battle