var Result = require('./resultModel.js');


exports.getAllResults = function (req, res, next) {
    Result.find().then( (d) =>{
        res.json(d);
    })
    .catch( (e) => next(e) );
}

function takeTopFive (result) {
    result.entities.sortBy( (a, b) => a.salience - b.salience );
    result.entities = result.entities.slice(0, 5);
    return result.entities;
}

exports.getResultById = function (req, res, next) {
    Result.findOne({id: req.params.entityId})
    .then( r => {
        var ent = takeTopFive(r);
        var result = {url: r.url, entities: ent};
        res.send(result);
    })
    .catch( e => next(e) );
}; 

