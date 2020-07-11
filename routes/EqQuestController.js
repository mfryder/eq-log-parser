const express = require('express');
const router = express.Router();
const logger = require('../config/logger');
const EqQuestService = require('../lib/service/EqQuestService');
const ErrorMessageFactory = require("../lib/errors/ErrorFactory");

//express setting the route path information and what function will be called
router.get('/all', getAll);

router.get('/parse', parse); // to be automated

function getAll(req, res, next){                                         //node contains the request object, response object, and the next in chain
    EqQuestService.findAll()
        .then(function success(results){
            res.send(results);                                                  //node sending response object
        })
        .catch(function error(err){
            handleErrors(err, res);
        });
}

function parse(req, res, next){
    EqQuestService.parse()
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