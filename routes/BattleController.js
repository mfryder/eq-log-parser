const express = require('express');
const router = express.Router();
const BattleCrudServiceMongo = require('../lib/RecordsCollectionService');
const ErrorMessageFactory = require("./errors/ErrorFactory");
const logger = require('winston');

//express setting the route path information and what function will be called
router.get('/all', getAllBattleRecords);

function getAllBattleRecords(req, res, next){                                         //node contains the request object, response object, and the next in chain
    BattleCrudServiceMongo.findAll()
        .then(function success(results){
            res.send(results);                                                  //node sending response object
        })
        .catch(handleErrors(err));
}

function handleErrors(err){
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