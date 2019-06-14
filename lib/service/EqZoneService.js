const EqWikiZoneSink = require('../sink/EqWikiZoneSink');

class EqZoneService{
    static async parseZones(){
        return await EqWikiZoneSink.retrieve();
    }

    static async findAllZones(){
        return await EqWikiZoneSink.findAll();
    }
}

module.exports = EqZoneService;