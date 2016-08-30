var Result = require('./resultModel.js');
var giphy = require('../giphy/giphy.js');
var Promise = require('bluebird');

exports.getAllResults = function (req, res, next) {
    Result.find().then( (d) =>{
        res.json(d);
    })
    .catch( (e) => next(e) );
}

function takeTopFive (result) { 
    result.entities.sort( (b, a) => a.salience - b.salience );
    result.entities = result.entities.slice(0, 5);
    return result.entities;
}

exports.getByUrlTopFive = function (url) {
    return new Promise( function(fulfill, reject) {

            Result.findOne({url: url}).then( (r) => {
                var ent = takeTopFive(r.results);
                var result = {url: r.url, entities: ent};
                fulfill(result);
            });
    });
}

var gifResult = function (name) {
    return giphy.getGifs(name)
            .then( (d) => {
                console.log('Giphy api returned ', d);
                console.log('El is ', name);
                return {name: name, gif: d};
            }); 
}
exports.getTopFiveGifs = function (topFive) {

   return new Promise(function (fulfill, reject) {

        var url = topFive.url;
        var actualResults = [];
        var results = topFive.entities.map( (el) => actualResults.push( gifResult(el.name) ) ); 
        Promise.all(results)
            .then( () => {
                Promise.all(actualResults)
                .then( (d) => fulfill({url: url, entities: d}) );
                }) 
            .catch( (e) => reject(e) );
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
