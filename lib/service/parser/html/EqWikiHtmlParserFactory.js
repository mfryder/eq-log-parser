const ParserType = require("../../../domain/ParserTypeEnumeration");
const GenericHtmlParser = require("./GenericHtmlParser");
const EqZoneHtmlParser = require("./EqZoneHtmlParser");
const EqZoneListHtmlParser = require('./EqZoneListHtmlParser');
const EqQuestListHtmlParser = require('./EqQuestListHtmlParser');
const EqQuestHtmlParser = require('./EqQuestHtmlParser');

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
            case ParserType.QUEST_LIST:
                parser = new EqQuestListHtmlParser(unparsedHtml);
                break;
            case ParserType.QUEST:
                parser = new EqQuestHtmlParser(unparsedHtml);
                break;
            case ParserType.NPC:
            case ParserType.ITEM:
            default:
                parser = new GenericHtmlParser(unparsedHtml);
        }
        return parser;
    }
}
module.exports = EqWikiHtmlParserFactory;