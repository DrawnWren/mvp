var Result = require('./resultModel.js');


exports.getAllResults = function (req, res, next) {
    Result.find().then( (d) =>{
        res.json(d);
    })
    .catch( (e) => next(e) );
}

function takeTopFive (result) { 
    result.entities.sort( (b, a) => a.salience - b.salience );
    result.entities = result.entities.slice(0, 5);
    console.log(result.entities);
    return result.entities;
}

exports.getByUrlTopFive = function (url) {
    return new Promise( function(fulfill, reject) {
            Result.findOne({url: url}).then( (r) => {
            console.log('Results r.results is ', r.results[0]);
            console.log('Typeof r is ', typeof r.results);
            var ent = takeTopFive(r.results);
            var result = {url: r.url, entities: ent};
            fulfill(result);
        });
    });
}

exports.getResultById = function (req, res, next) {
    console.log('In result by ID for id ', req.params.entityId);
    Result.findById(req.params.entityId)
    .then( (r) => {
        console.log('R is ', r);
        var ent = takeTopFive(r);
        var result = {url: r.url, entities: ent};
        res.json(result);
    })
    .catch( e => next(e) );
}; 

