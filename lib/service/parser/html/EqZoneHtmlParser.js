const config = require('config');
const htmlParser = require("htmlparser2");
const logger = require('../../../../config/logger');
const EqZone = require('../../../domain/EqZone');
const GenericHtmlParser = require('./GenericHtmlParser');
const TimeUtil = require('../../../util/TimeUtil');
const _ = require("lodash");

class EqZoneHtmlParser extends GenericHtmlParser{
    constructor(unparsedHtml){
        super(unparsedHtml);
        let that = this;
        this.original = unparsedHtml;
        this.titleSelection = {'h1': false, 'span':false};
        this.descriptionSelection = {'id': false};
        this.descriptionText = "";
        this.monsterArray = [];
        this.notableNPC = [];
        this.uniqueItems = [];
        this.relatedQuests = [];
        this.adjacentZones = [];
        this.respawnTimer = [];
        this.zem = [];
        this.isMonsterLevel = false;
        this.isMonsterType = false;
        this.isNoticableNpc = false;
        this.isUniqueItems = false;
        this.isRelatedQuests = false;
        this.isAdjacentZones = false;
        this.isRespawnTimer = false;
        this.isZem = false;
        this.zone = new EqZone();
        this.parser = new htmlParser.Parser({
            onopentag: function(name, attribs){
                if(_.isEmpty(attribs)){
                    return;
                }
                if(that.zone.getName() === "Unknown Zone"){
                    that.checkForZoneNameFlags(name, attribs, that);
                }
                if(that.zone.getDescription() === "Unknown Description"){
                    that.checkForZoneDescriptionFlags(name, attribs, that);
                }
                if(that.zone.getUniqueItems().length === 0){
                    that.checkForIntermitantImagesForUniqueItemFlags(name, attribs, that);
                }
                logger.info(name, attribs);
            },
            ontext: function(text){
                if(that.junkText(text)){
                    return;
                }
                that.determineZoneName(text, that);
                that.determineZoneDescription(text, that);
                that.determineZoneMonsterLevel(text, that);
                that.determineZoneTypeOfMonster(text, that);
                that.determineZoneNotableNPC(text, that);
                that.determineZoneUniqueItems(text, that);
                that.determineZoneRelatedQuests(text, that);
                that.determineAdjacentZones(text, that);
                that.determineRespawnTimer(text, that);
                that.determineZEM(text, that);
                logger.info(text);
            }
        }, {decodeEntities: true});
    }

    parse(){
        this.parser.write(this.original);
    }

    junkText(text){
        return config.get('junkText').indexOf(text) > -1;
    }

    checkForZoneNameFlags(name, attribs, that){
        if(name === "h1"){
            that.titleSelection.h1 = true;
          }
          if(name === "span" && that.titleSelection.h1 === true){
            that.titleSelection.span = true;
          }
    }

    determineZoneName(text, that){
        if(that.titleSelection.h1 && that.titleSelection.span){
            logger.info("Zone Name:");
            logger.info(text);
            that.zone.setName(text)
            that.titleSelection.h1 = false;
            that.titleSelection.span = false;
        }
    }

    checkForZoneDescriptionFlags(name, attribs, that){
        if(attribs["id"] === "mw-content-text"){
            that.descriptionSelection.id = true;
        }
        if(that.descriptionSelection.id === true){
            if(attribs["id"] === "toc"){
                that.descriptionSelection.id = false;
                //that.descriptionSelection.endParenth = false;
                if(that.descriptionText.indexOf('\n') > -1){
                    that.descriptionText = that.descriptionText.substring(0, that.descriptionText.indexOf('\n'));
                }
                that.zone.setDescription(that.descriptionText);
                logger.info("Zone Description:");
                logger.info(that.zone.getDescription());
            }
        }
    }

    determineZoneDescription(text, that){
        if(that.descriptionSelection.id){
            that.descriptionText+=text;
        }
    }

    determineZoneMonsterLevel(text, that){
        if(that.zone.monsterLevelMin === -1 && that.zone.monsterLevelMax === -1){
            if(!that.isMonsterLevel){
                if(text.indexOf("Level of Monsters:") > -1){
                    that.isMonsterLevel = true;
                    return;
                }
            }
            if(that.isMonsterLevel){
                logger.info("Pre-Split Monster Min/Max")
                logger.info(text);
                if(text.indexOf("\n")>-1){
                    text = text.substring(0, text.indexOf("\n"));
                }
                let splitToken = text.split("-");
                let minNum = Number.parseInt(splitToken[0]);
                let maxNum = Number.parseInt(splitToken[1]);
                if(!isNaN(minNum)){
                    that.zone.setMonsterLevelMin(minNum);
                }
                if(!isNaN(maxNum)){
                    that.zone.setMonsterLevelMax(maxNum);
                }
                logger.info(that.zone.getMonsterLevelMin());
                logger.info(that.zone.getMonsterLevelMax());
                that.isMonsterLevel = false;
            }
        }
    }

    determineZoneTypeOfMonster(text, that){
        let zoneMonArray = that.zone.getTypeOfMonsters();
        if(zoneMonArray.length === 0){
            if(that.isMonsterType === true){
                if(text.indexOf("Notable NPCs") > -1){
                    that.isMonsterType = false;
                    that.zone.setTypeOfMonsters(that.monsterArray);
                    logger.info("Type of Monsters:");
                    logger.info(that.zone.getTypeOfMonsters());
                    return;
                }
                if(text.indexOf(',') > -1){
                    let splitText = text.split(',')
                    for(let item of splitText){
                        that.monsterArray.push(item.trim());
                    }
                
                }else{
                    that.monsterArray.push(text);
                }
            }
            if(that.isMonsterType === false && text.indexOf("Types of Monsters:") > -1){
                that.isMonsterType = true;
            }
        }
    }

    determineZoneNotableNPC(text, that){
        let zoneMonArray = that.zone.getNotableNPCs();
        if(zoneMonArray.length === 0){
            if(that.isNoticableNpc === true){
                if(text.indexOf("Unique Items:") > -1){
                    that.isNoticableNpc = false;
                    that.zone.setNotableNPCs(that.notableNPC);
                    logger.info("Notable NPCs:");
                    logger.info(that.zone.getNotableNPCs());
                    return;
                }
                that.notableNPC.push(text);
            }
            if(that.isNoticableNpc === false && text.indexOf("Notable NPCs") > -1){
                that.isNoticableNpc = true;
            }
        }
    }

    checkForIntermitantImagesForUniqueItemFlags(name, attribs, that){
        if(name === "img"){
            that.isUniqueItems = false;
        }else if(name === "div" && attribs['class'] && attribs['class'].indexOf("itembotbg") > -1){
            that.isUniqueItems = true;
        }
    }

    determineZoneUniqueItems(text, that){
        let zoneMonArray = that.zone.getUniqueItems();
        if(zoneMonArray.length === 0){
            if(that.isUniqueItems === true){
                if(text.indexOf("Related Quests:") > -1){
                    that.isUniqueItems = false;
                    that.zone.setUniqueItems(that.uniqueItems);
                    logger.info("UniqueItems:");
                    logger.info(that.zone.getUniqueItems());
                    return;
                }
                if(that.uniqueItems.indexOf(text) === -1){
                    that.uniqueItems.push(text);
                }
                
            }
            if(that.isUniqueItems === false && text.indexOf("Unique Items:") > -1){
                that.isUniqueItems = true;
            }
        }
    }

    determineZoneRelatedQuests(text, that){
        let zoneMonArray = that.zone.getRelatedQuests();
        if(zoneMonArray.length === 0){
            if(that.isRelatedQuests === true){
                if(text.indexOf("Adjacent Zones:") > -1){
                    that.isRelatedQuests = false;
                    that.zone.setRelatedQuests(that.relatedQuests);
                    logger.info("Related Quests:");
                    logger.info(that.zone.getRelatedQuests());
                    return;
                }
                if(that.relatedQuests.indexOf(text) === -1){
                    that.relatedQuests.push(text);
                }
                
            }
            if(that.isRelatedQuests === false && text.indexOf("Related Quests:") > -1){
                that.isRelatedQuests = true;
            }
        }
    }

    determineAdjacentZones(text, that){
        let zoneMonArray = that.zone.getAdjacentZones();
        if(zoneMonArray.length === 0){
            if(that.isAdjacentZones === true){
                if(text.indexOf("Name in /who:") > -1){
                    that.isAdjacentZones = false;
                    that.zone.setAdjacentZones(that.adjacentZones);
                    logger.info("Adjacent Zones:");
                    logger.info(that.zone.getAdjacentZones());
                    return;
                }
                if(that.adjacentZones.indexOf(text) === -1){
                    that.adjacentZones.push(text);
                }
                
            }
            if(that.isAdjacentZones === false && text.indexOf("Adjacent Zones:") > -1){
                that.isAdjacentZones = true;
            }
        }
    }
    
    determineRespawnTimer(text, that){
        let zoneMonArray = that.zone.getRespawnTimer();
        if(zoneMonArray === -1){
            if(that.isRespawnTimer === true){
                if(text.indexOf("ZEM") > -1 || text.indexOf("Succor/Evacuate:") > -1){
                    that.isRespawnTimer = false;
                    let time = that.respawnTimer[0].substring(0, that.respawnTimer[0].indexOf('\n'))
                    let num = TimeUtil.translateMinutesFromStringToMillis(time);
                    if(!isNaN(num)){
                        that.zone.setRespawnTimer(num);
                    }
                    logger.info("Zone spawn timer:");
                    logger.info(that.zone.getRespawnTimer());
                    return;
                }
                if(that.respawnTimer.indexOf(text) === -1){
                    if(text.length > 2){
                        that.respawnTimer.push(text);
                    }
                }
            }
            if(that.isRespawnTimer === false && text.toLowerCase().indexOf("zone spawn timer") > -1){
                that.isRespawnTimer = true;
            }
        }
    }

    determineZEM(text, that){
        let zoneMonArray = that.zone.getZem();
        if(zoneMonArray === -1){
            if(that.isZem === true){
                if(text.indexOf('Map') > -1){
                    that.isZem = false;
                    let num = that.zem[1].substring(0, that.zem[1].indexOf(' '))
                    let zem = Number.parseInt(num)
                    if(!isNaN(zem)){
                        that.zone.setZem(num);
                    }
                    logger.info("ZEM");
                    logger.info(that.zone.getZem());
                    return;
                }
                if(that.zem.indexOf(text) === -1){
                    that.zem.push(text);
                }
                
            }else if(that.isZem === false && text.indexOf("ZEM") > -1){
                that.isZem = true;
            }
        }
    }
}

module.exports = EqZoneHtmlParser