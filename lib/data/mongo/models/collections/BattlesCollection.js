const mongoose = require('mongoose');
const Battles = mongoose.model("Battles");
const AbstractCollection = require("./AbstractCollection");
const logger = require('winston');

class ProfilesCollection extends AbstractCollection{
    static store(profile){
        return Profiles.insert({"name": profile.getName()}, profile, {"upsert": true}, function(err, doc){
            if(err){
                return Promise.reject(err);
            }   
            return Promise.resolve(doc);
        });
    }

    static findAll(){
        return Profiles.find();
    }

    static findByType(type){
        return Profiles.find({"name": type})
            .then(function returnedResults(results){
                return Promise.resolve(results);
            });
    }
}

module.exports = ProfilesCollection;