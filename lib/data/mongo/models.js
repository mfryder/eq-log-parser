const models = ['./schemas/battlesSchema', './schemas/eqZoneSchema'];

exports.initialize = function() {
    let l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i])();
    }
};