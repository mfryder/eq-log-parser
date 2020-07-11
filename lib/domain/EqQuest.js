class EqQuest {
    constructor(object){
        if(object){
            this.name = object.name;
            this.walkthrough = object.walkthrough;
            this.startZone = object.startZone;
            this.questGiver = object.questGiver;
            this.reward = object.reward;
            this.minLevel = object.minLevel;
            this.classes = object.classes;
            this.relatedNPCs = object.relatedNPCs;
            this.positiveFaction = object.positiveFaction;
            this.negativeFaction = object.negativeFaction;
            this.relatedZones = object.relatedZones;
        }else{
            this.name = "Unknown Quest";
            this.walkthrough = "";
            this.startZone = "Unknown StartZone";
            this.questGiver = "Unknown QuestGiver";
            this.minLevel = -1;
            this.reward = [];
            this.relatedNPCs = [];
            this.positiveFaction = [];
            this.negativeFaction = [];
            this.classes = [];
            this.relatedZones = [];
        }
    }
    
    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getWalkthrough(){
        return this.walkthrough;
    }

    setWalkthrough(walkthrough){
        this.walkthrough = walkthrough;
    }

    getStartZone(){
        return this.startZone;
    }

    setStartZone(startZone){
        this.startZone = startZone;
    }

    getQuestGiver(){
        return this.questGiver;
    }

    setQuestGiver(questGiver){
        this.questGiver = questGiver;
    }

    getReward(){
        return this.reward;
    }

    setReward(reward){
        this.reward = reward;
    }

    getMinLevel(){
        return this.minLevel;
    }

    setMinLevel(minLevel){
        this.minLevel = minLevel;
    }

    getClasses(){
        return this.classes;
    }

    setClasses(classes){
        this.classes = classes;
    }

    getRelatedNPCs(){
        return this.relatedNPCs;
    }

    setRelatedNPCs(relatedNPCs){
        this.relatedNPCs = relatedNPCs;
    }

    getPositiveFaction(){
        return this.positiveFaction;
    }

    setPositiveFaction(positiveFaction){
        this.positiveFaction = positiveFaction;
    }

    getNegativeFaction(){
        return this.negativeFaction;
    }

    setNegativeFaction(negativeFaction){
        this.negativeFaction = negativeFaction;
    }

    getRelatedZones(){
        return this.relatedZones;
    }

    setRelatedZones(relatedZones){
        this.relatedZones = relatedZones;
    }
}
module.exports = EqQuest