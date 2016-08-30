var Result = require('./resultModel.js');
var giphy = require('../giphy/giphy.js');
var Promise = require('bluebird');
var thegoogles = require('../config/thegoogles.js');

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
function mergeTranslated(entities, translated) {
    return entities.map( 
        (el, i) => {
                el.name = translated[i]; 
                return el;
    });
}
function makeEnglish (entities) {
    var names = [];
    entities.forEach( (e) => names.push(e.name) );

    return new Promise( function (fulfill, reject) {
        thegoogles.translateTexts(names).then( 
            (translated) => { 
                console.log('Translated ',translated);
            fulfill( mergeTranslated(entities, translated) );     
            }).catch( (err) => console.log('ERROR ', err) );
    });
};

exports.getByUrlTopFive = function (url) {
    return new Promise( function(fulfill, reject) {

            Result.findOne({url: url}).then( (r) => {
                var ent = takeTopFive(r.results);
                var result = {url: r.url, entities: ent};
                if ( result.entities[0].metadata.wikipedia_url.match(/(http:\/\/ja\.)/) ) {

                    makeEnglish(result.entities).then(
                        (english) => {
                            console.log('English is ', english);
                            result.entities = english;
                            fulfill(result);
                        }
                    );
                } else {

                fulfill(result);
                }
            });
    });
}

var gifResult = function (name) {
    return giphy.getGifs(name)
            .then( (d) => {
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

        var ent = takeTopFive(r);
        var result = {url: r.url, entities: ent};
        res.json(result);
    })
    .catch( e => next(e) );
}; 
