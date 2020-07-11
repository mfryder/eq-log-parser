const EqWikiZoneSink = require('../sink/EqWikiZoneSink');

class EqZoneService{
    static async parse(){
        return await EqWikiZoneSink.retrieve();
    }

    static async findAll(){
        return await EqWikiZoneSink.findAll();
    }
}

module.exports = EqZoneService;