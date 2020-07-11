const config = require('config');
const htmlParser = require("htmlparser2");
const GenericHtmlParser = require("./GenericHtmlParser");
const logger = require('../../../../config/logger');

class EqQuestListHtmlParser extends GenericHtmlParser{
    constructor(unparsedHtml){
        super(unparsedHtml);
        let that = this;
        this.startOfContent = false;
        this.table = false;
        this.original = unparsedHtml;
        this.links = [];
        this.parser = new htmlParser.Parser({
            onopentag: function(name, attribs){
                if(attribs['id'] === "mw-pages"){
                    this.startOfContent = true; 
                }
                if(this.startOfContent === true && name === "table"){
                    this.table = true;
                }
                if(name === "a"){
                    if(this.table && this.startOfContent){
                        logger.info(attribs);
                        that.links.push(attribs);
                    }
                }
            },
            onclosetag: function(tagname){
                if(tagname === "table" && this.table){
                    this.table = false;
                }
            }
        }, {decodeEntities: true});
    }

    parse(){
        this.parser.write(this.original);
    }
}

module.exports = EqQuestListHtmlParser