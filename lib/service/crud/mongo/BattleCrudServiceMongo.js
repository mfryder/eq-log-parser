const logger = require("winston");
const config = require("config");
const ErrorMessageFactory = require("./errors/ErrorFactory");
const BattlesCollection = require("./data/mongo/collections/BattlesCollection");
const AbstratCrudService = require("./service/AbstractCrudService");

class BattleCrudServiceMongo extends AbstratCrudService {

    static store(battle){
        return BattlesCollection.store(battle)
            .then(function success(resultObj){
                return Promise.resolve(resultObj);
            })
            .catch(function error(error){
                let errMsg = ErrorMessageFactory.createError(error);
                errMsg.setStack(error.stack);
                errMsg.setMessage(error.message);
                return Promise.reject(errMsg);
            })
    }

    static findAll(){
        return BattlesCollection.findAll()
            .then(function success(resultArray){
                return Promise.resolve(resultArray);
            })
            .catch(function error(error){
                let errMsg = ErrorMessageFactory.createError(error);
                errMsg.setStack(error.stack);
                errMsg.setMessage(error.message);
                return Promise.reject(errMsg);
            })
    }
}

module.exports = BattleCrudServiceMongo;