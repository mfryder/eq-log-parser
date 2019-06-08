const config = require('config');
const ServiceTemplate = require('./ServiceTemplate');
const EqWikiHtmlParserFactory = require('../service/parser/html/EqWikiHtmlParserFactory');
const ParserTypeEnumeration = require('../domain/ParserTypeEnumeration');
const EqZoneCrudServiceMongo = require('../service/crud/mongo/EqZoneCrudServiceMongo');
const AbstractSink = require('./AbstractSink');

class EqWikiZoneSink extends AbstractSink {
    static async retrieve(){
        return await ServiceTemplate.get(config.get("eqUrls.zones"), [])
            .then(unparsedHtml =>{
                let parser = EqWikiHtmlParserFactory.createParser(ParserTypeEnumeration.ZONE, unparsedHtml);
                return parser.parse();
            })
    }

    static async findAll(){
        return await EqZoneCrudServiceMongo.findAll();
    }
}

module.exports = EqWikiZoneSink;