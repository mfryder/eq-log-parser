const config = require('config');
const htmlParser = require("htmlparser2");
const GenericHtmlParser = require("./GenericHtmlParser");
const logger = require('../../../../config/logger');

class EqZoneListHtmlParser extends GenericHtmlParser{
    constructor(unparsedHtml){
        super(unparsedHtml);
        let that = this;
        this.original = unparsedHtml;
        this.beginParsing = false;
        this.links = [];
        this.parser = new htmlParser.Parser({
            onopentag: function(name, attribs){
                if(name === "a"){
                    logger.info(attribs);
                    if(attribs.title && attribs.title ==="The Arena"){
                        that.beginParsing = true;
                    }
                    if(that.beginParsing === true){
                        that.links.push(attribs);
                    }
                    if(attribs.title && attribs.title === "Plane of Mischief"){
                        that.beginParsing = false;
                    }
                }
            }
        }, {decodeEntities: true});
    }

    parse(){
        this.parser.write(this.original);
    }
}

module.exports = EqZoneListHtmlParser