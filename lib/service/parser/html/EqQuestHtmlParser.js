const config = require('config');
const htmlParser = require("htmlparser2");
const logger = require('../../../../config/logger');
const EqQuest = require('../../../domain/EqQuest');
const GenericHtmlParser = require('./GenericHtmlParser');
const _ = require("lodash");

class EqQuestHtmlParser extends GenericHtmlParser{
    constructor(unparsedHtml){
        super(unparsedHtml);
        let that = this;
        this.original = unparsedHtml;
        
        this.titleSelection = {'h1': false, 'span':false};
        this.isStartZone = false;
        this.isQuestGiver = false;
        this.isMinimumLevel = false;
        this.isClasses = false;
        this.isRelatedZones = false;
        this.isRelatedNPCs = false;
        this.isReward = false;
        this.isWalkthrough = false;
        this.startZone = [];
        this.questGiver = [];
        this.minimumLevel = [];
        this.classes = [];
        this.relatedZones = [];
        this.relatedNPCs = [];
        this.reward = [];
        this.walkthrough = "";
        this.quest = new EqQuest();
        this.parser = new htmlParser.Parser({
            onopentag: function(name, attribs){
                if(_.isEmpty(attribs)){
                    return;
                }
                if(that.quest.getName() === "Unknown Quest"){
                    that.checkForQuestNameFlags(name, attribs, that);
                }
                if(that.quest.getWalkthrough() === ""){
                    that.checkForQuestWalkthroughTags(name, attribs, that);
                }
                if(that.quest.getReward().length === 0){
                    that.checkForIntermitantImagesForRewardFlags(name, attribs, that);
                }
                logger.info(name, attribs);
            },
            ontext: function(text){
                if(that.junkText(text)){
                    return;
                }
                that.determineQuestName(text, that);
                that.determineStartZone(text, that);
                that.determineQuestGiver(text, that);
                that.determineMinimumLevel(text, that);
                that.determineClasses(text, that);
                that.determineRelatedZones(text, that);
                that.determineRelatedNPCs(text, that);
                that.determineReward(text, that);
                that.determineQuestWalkthrough(text, that);
                logger.info(text);
            },
            onclosetag: function(tagname){
                if(tagname === "table" && that.isRelatedNPCs){
                    that.isRelatedNPCs = false;
                    that.quest.setRelatedNPCs(that.relatedNPCs);
                    logger.info("Related NPCs:");
                    logger.info(that.quest.getRelatedNPCs());
                }
            }
        }, {decodeEntities: true});
    }

    junkText(text){
        return config.get('junkText').indexOf(text) > -1;
    }

    checkForQuestNameFlags(name, attribs, that){
        if(name === "h1" && attribs["id"] === "firstHeading"){
            that.titleSelection.h1 = true;
        }
        if(name === "span" && that.titleSelection.h1 === true){
            that.titleSelection.span = true;
        }
    }

    checkForQuestWalkthroughTags(name, attribs, that){
        if(attribs["id"] === "Walkthrough" && name === "span"){
            that.isWalkthrough = true;
            logger.info("Walkthrough Started");
        }else if(that.isWalkthrough && name === "div"){
            that.isWalkthrough = false;
            logger.info("Walkthrough Ended");
            logger.info("WALKTHROUGH: ");
            logger.info(that.walkthrough);
            that.quest.setWalkthrough(that.walkthrough);
        }
    }

    checkForIntermitantImagesForRewardFlags(name, attribs, that){
        if(name === "img"){
            that.isReward = false;
        }else if(name === "div" && attribs['class'] && attribs['class'].indexOf("itembotbg") > -1){
            that.isReward = true;
        }
    }

    determineQuestName(text, that){
        if(that.quest.getName() === "Unknown Quest"){
            if(this.titleSelection.h1 && this.titleSelection.span){
                that.quest.setName(text);
            }
        }else{
            this.titleSelection.h1 = false;
            this.titleSelection.span = false;
        }
    }

    determineStartZone(text, that){
        let zoneMonArray = that.quest.getStartZone();
        let startFlag = "Start Zone:"
        let endFlag = "Quest Giver:"
        if(zoneMonArray === "Unknown StartZone"){
            if(that.isStartZone === true){
                if(text.indexOf(endFlag) > -1){
                    that.isStartZone = false;
                    that.quest.setStartZone(that.startZone[0]);
                    logger.info(startFlag);
                    logger.info(that.quest.getStartZone());
                    return;
                }
                if(that.startZone.indexOf(text) === -1){
                    that.startZone.push(text);
                }
                
            }
            if(that.isStartZone === false && text.indexOf(startFlag) > -1){
                that.isStartZone = true;
            }
        }
    }

    determineQuestGiver(text, that){
        let zoneMonArray = that.quest.getQuestGiver();
        let startFlag = "Quest Giver:"
        let endFlag = "Minimum Level:"
        if(zoneMonArray === "Unknown QuestGiver"){
            if(that.isQuestGiver === true){
                if(text.indexOf(endFlag) > -1){
                    that.isQuestGiver = false;
                    that.quest.setQuestGiver(that.questGiver[0]);
                    logger.info(startFlag);
                    logger.info(that.quest.getQuestGiver());
                    return;
                }
                if(that.questGiver.indexOf(text) === -1){
                    that.questGiver.push(text);
                }
                
            }
            if(that.isQuestGiver === false && text.indexOf(startFlag) > -1){
                that.isQuestGiver = true;
            }
        }
    }

    determineMinimumLevel(text, that){
        let zoneMonArray = that.quest.getMinLevel();
        let startFlag = "Minimum Level:";
        let endFlag = "Classes:"
        if(zoneMonArray === -1){
            if(that.isMinimumLevel === true){
                if(text.indexOf(endFlag) > -1){
                    that.isMinimumLevel = false;
                    if(that.minimumLevel.length > 0){
                        let num =that.minimumLevel[0].trim();
                        num = Number.parseInt(num);
                        if(!isNaN(num)){
                            that.quest.setMinLevel(num);
                        }
                        logger.info(startFlag);
                        logger.info(that.quest.getMinLevel());
                    }
                    return;
                }
                if(that.minimumLevel.indexOf(text) === -1){
                    that.minimumLevel.push(text);
                }
                
            }
            if(that.isMinimumLevel === false && text.indexOf(startFlag) > -1){
                that.isMinimumLevel = true;
            }
        }
    }

    determineClasses(text, that){
        let zoneMonArray = that.quest.getClasses();
        let startFlag = "Classes:"
        let endFlag = "Related Zones:"
        if(zoneMonArray.length === 0){
            if(that.isClasses === true){
                if(text.indexOf(endFlag) > -1){
                    that.isClasses = false;
                    that.quest.setClasses(that.classes);
                    logger.info(startFlag);
                    logger.info(that.quest.getClasses());
                    return;
                }
                if(that.classes.indexOf(text) === -1){
                    text = text.trim();
                    if(text.length > 0){
                        that.classes.push(text);
                    }
                    
                }
                
            }
            if(that.isClasses === false && text.indexOf(startFlag) > -1){
                that.isClasses = true;
            }
        }
    }

    determineRelatedZones(text, that){
        let zoneMonArray = that.quest.getRelatedZones();
        let startFlag = "Related Zones:";
        let endFlag = "Related NPCs:";
        if(zoneMonArray.length === 0){
            if(that.isRelatedZones === true){
                if(text.indexOf(endFlag) > -1){
                    that.isRelatedZones = false;
                    that.quest.setRelatedZones(that.relatedZones);
                    logger.info(startFlag);
                    logger.info(that.quest.getRelatedZones());
                    return;
                }
                if(that.relatedZones.indexOf(text) === -1){
                    text = text.trim();
                    if(text.length > 0){
                        that.relatedZones.push(text);
                    } 
                }
                
            }
            if(that.isRelatedZones === false && text.indexOf(startFlag) > -1){
                that.isRelatedZones = true;
            }
        }
    }

    determineRelatedNPCs(text, that){
        let zoneMonArray = that.quest.getRelatedNPCs();
        let startFlag = "Related NPCs:";
        let endFlag = "Reward";
        if(zoneMonArray.length === 0){
            if(that.isRelatedNPCs === true){
                if(that.relatedNPCs.indexOf(text) === -1){
                    text = text.trim();
                    if(text.length > 0){
                        that.relatedNPCs.push(text);
                    }
                }
                
            }
            if(that.isRelatedNPCs === false && text.indexOf(startFlag) > -1){
                that.isRelatedNPCs = true;
            }
        }
    }

    determineReward(text, that){
        let zoneMonArray = that.quest.getReward();
        let startFlag = "Reward";
        let endFlag = "Walkthrough";
        let endFlag2 = "Checklist";
        if(zoneMonArray.length === 0){
            if(that.isReward === true){
                if(text.indexOf(endFlag) > -1 || text.indexOf(endFlag2) > -1){
                    that.isReward = false;
                    that.quest.setReward(that.reward);
                    logger.info(startFlag);
                    logger.info(that.quest.getReward());
                    return;
                }
                if(that.reward.indexOf(text) === -1){
                    text=text.trim();
                    if(text.length > 0){
                        that.reward.push(text);
                    }
                }
            }
            if(that.isReward === false && text.indexOf(startFlag) > -1){
                that.isReward = true;
            }
        }
    }

    determineQuestWalkthrough(text, that){
        if(that.isWalkthrough){
            logger.info("Walkthrough Adding Text");
            that.walkthrough += text;
        }
    }
}

module.exports = EqQuestHtmlParser;