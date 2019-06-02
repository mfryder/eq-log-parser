const express = require('express');
const router = express.Router();
const BattleCrudServiceMongo = require('../lib/service/crud/mongo/BattleCrudServiceMongo');
const EqLogFileParser = require('../lib/service/parser/EqLogFileParser');
const ErrorMessageFactory = require("../lib/errors/ErrorFactory");
const logger = require('winston');

//express setting the route path information and what function will be called
router.get('/all', getAllBattleRecords);

router.get('/parseFiles', parseBattleFiles); // to be automated

function getAllBattleRecords(req, res, next){                                         //node contains the request object, response object, and the next in chain
    BattleCrudServiceMongo.findAll()
        .then(function success(results){
            res.send(results);                                                  //node sending response object
        })
        .catch(function error(err){
            handleErrors(err, res);
        });
}

function parseBattleFiles(req, res, next){
    EqLogFileParser.parse()
        .then(function success(results){
            res.send(results);
        })
        .catch(function error(err){
            handleErrors(err, res);
        });
}

function handleErrors(err, res){
    let errMsg = ErrorMessageFactory.createError(err);
    errMsg.setStack(err.stack);
    errMsg.setMessage(err.message);
    var statusCode = 500;
    var message = "The system failed to respond correctly";
    if(errMsg.statusCode){
        statusCode = err.statusCode;
    }
    if(errMsg.message){
        message = err.message;
    }
    if(errMsg.stack){
        logger.error(err.stack)
    }
    res.status(statusCode).send(message);
}

module.exports = router;                       