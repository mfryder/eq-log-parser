const config = require('config');
const mongoose = require('mongoose');

mongoose.connect('mongodb://'+ config.get('mongo.hostname') + ':'+config.get('mongo.port')+ '/' + config.get('mongo.db'));  //mongoose
const mongoDb = mongoose.connection;                                 //links in connection with mongo
module.exports = mongoDb;