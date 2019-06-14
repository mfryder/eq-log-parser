const config = require('config');
const ServiceTemplate = require('./ServiceTemplate');
const EqWikiHtmlParserFactory = require('../service/parser/html/EqWikiHtmlParserFactory');
const ParserTypeEnumeration = require('../domain/ParserTypeEnumeration');
const EqZoneCrudServiceMongo = require('../service/crud/mongo/EqZoneCrudServiceMongo');
const AbstractSink = require('./AbstractSink');

class EqWikiZoneSink extends AbstractSink {
    static async retrieve(){
        return await EqZoneCrudServiceMongo.drop()
        .then(async dropResults =>{
            return await ServiceTemplate.get(config.get("eqUrls.zones"), []);
        })
        .then(async unparsedHtml =>{
            let parser = EqWikiHtmlParserFactory.createParser(ParserTypeEnumeration.ZONE_LIST, unparsedHtml);
            parser.parse();
            let links = parser.links;
            let zones = [];
            for(let link of links){
                let unparsedZone = await ServiceTemplate.get(config.get("eqUrls.base") + link.href, []);
                let zoneParser = EqWikiHtmlParserFactory.createParser(ParserTypeEnumeration.ZONE, unparsedZone);
                zoneParser.parse();
                zones.push(await EqZoneCrudServiceMongo.store(zoneParser.zone));
            }
            return zones;
        });
    }

    static async findAll(){
        return await EqZoneCrudServiceMongo.findAll();
    }
}

module.exports = EqWikiZoneSink;