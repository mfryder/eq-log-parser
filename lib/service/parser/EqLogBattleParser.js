const BattleCrudServiceMongo = require("../crud/mongo/BattleCrudServiceMongo");
const Battle = require("../../domain/Battle");
const logger = require('../../../config/logger');

class EqLogBattleParser {

    static async parseBattles(array){
        let combatStart = false;
        let counter = 0;
        let battleTexts = [];
        for(let val of array) {
            if(!combatStart){
                combatStart = this.determineIfCombatStart(val.toLowerCase());
                if(combatStart){
                    battleTexts.push([val]);
                }
            }
            if(combatStart){
                battleTexts[counter].push(val);
                combatStart = this.determineIfCombatIsNotFinished(val.toLowerCase());
                if(!combatStart){
                    logger.info(battleTexts[counter]);
                    counter++;
                    combatStart = this.determineIfCombatStart(val.toLowerCase());
                    if(combatStart){
                        battleTexts.push([val]);
                    }
                }
            }
        }
        return await this.convertBattleTextToBattles(battleTexts);
    }

    static async convertBattleTextToBattles(battleTexts){
        let promiseArray = [];
        for(let battleText of battleTexts){
            let battleObj = new Battle();
            battleObj.discoverInformationFromBattleText(battleText);
            logger.info("======== Fully Fleshed out Battle Record =========");
            logger.info(battleObj);
            promiseArray.push(BattleCrudServiceMongo.store(battleObj));
        }
        return Promise.all(promiseArray);
    }

    static determineIfCombatStart(lineOfText){
        if(lineOfText.indexOf('fight start with') > -1){
            return true;
        }
        //non explicit
        /*if(lineOfText.indexOf('tries to hit you') > -1){
            return true;
        }*/
        /*if(lineOfText.indexOf('auto attack is on') > -1){
            return true;
        }
        if(lineOfText.indexOf('hit by non-melee for') > -1){
            return true;
        }
        */
        return false;
    }

    static determineIfCombatIsNotFinished(lineOfText){
        if(lineOfText.indexOf('fight ended with') > -1){
            return false;
        }
        if(lineOfText.indexOf('you died') > -1){
            return false;
        }
        /*if(this.determineIfCombatStart(lineOfText)){
            return false;
        }*/
        return true;
    }
}

module.exports = EqLogBattleParser;