const ParserType = require("../../../domain/ParserTypeEnumeration");
const GenericHtmlParser = require("./GenericHtmlParser");
const EqZoneHtmlParser = require("./EqZoneHtmlParser");

class EqWikiHtmlParserFactory{

    static createParser(type, unparsedHtml){
        let parser;
        switch(type){
            case ParserType.ZONE:
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