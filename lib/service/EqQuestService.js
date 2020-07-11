const EqWikiQuestSink = require('../sink/EqWikiQuestSink');

class EqQuestService{
    static async parse(){
        return await EqWikiQuestSink.retrieve();
    }

    static async findAll(){
        return await EqWikiQuestSink.findAll();
    }
}

module.exports = EqQuestService;