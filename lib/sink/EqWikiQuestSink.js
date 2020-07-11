const config = require('config');
const ServiceTemplate = require('./ServiceTemplate');
const EqWikiHtmlParserFactory = require('../service/parser/html/EqWikiHtmlParserFactory');
const ParserTypeEnumeration = require('../domain/ParserTypeEnumeration');
const EqQuestCrudServiceMongo = require('../service/crud/mongo/EqQuestCrudServiceMongo');
const AbstractSink = require('./AbstractSink');

class EqWikiQuestSink extends AbstractSink {
    static async retrieve(){
        return await EqQuestCrudServiceMongo.drop()
            .then(async dropResults =>{
            let urls = config.get("eqUrls.quests");
            let quests = [];
            for(let url of urls){
                let unparsedHtml = await ServiceTemplate.get(url, []);
                let parser = EqWikiHtmlParserFactory.createParser(ParserTypeEnumeration.QUEST_LIST, unparsedHtml);
                parser.parse();
                let links = parser.links;
                if(links && links.length > 1){
                    for(let link of links){
                        let unparsedQuest = await ServiceTemplate.get(config.get("eqUrls.base") + link.href, []);
                        let questParser = EqWikiHtmlParserFactory.createParser(ParserTypeEnumeration.QUEST, unparsedQuest);
                        questParser.parse();
                        quests.push(await EqQuestCrudServiceMongo.store(questParser.quest));
                    }
                }

            }
            return quests;
        });
    }

    static async findAll(){
        return await EqQuestCrudServiceMongo.findAll();
    }
}

module.exports = EqWikiQuestSink;