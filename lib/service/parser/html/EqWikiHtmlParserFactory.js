const ParserType = require("../../../domain/ParserTypeEnumeration");
const GenericHtmlParser = require("./GenericHtmlParser");
const EqZoneHtmlParser = require("./EqZoneHtmlParser");
const EqZoneListHtmlParser = require('./EqZoneListHtmlParser');

class EqWikiHtmlParserFactory{

    static createParser(type, unparsedHtml){
        let parser;
        switch(type){
            case ParserType.ZONE_LIST:
                parser = new EqZoneListHtmlParser(unparsedHtml);
                break;
            case ParserType.ZONE:
                parser = new EqZoneHtmlParser(unparsedHtml);
                break;
            case ParserType.QUEST:
            case ParserType.NPC:
            case ParserType.ITEM:
            default:
                parser = new GenericHtmlParser(unparsedHtml);
        }
        return parser;
    }
}
module.exports = EqWikiHtmlParserFactory;