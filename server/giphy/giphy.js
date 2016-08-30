var request = require('request');
var creds = require('../config/creds.js');

exports.getGifs = function (toSearch) {
    //format for the api call
    toSearch = toSearch.split(' ').join('+');
    toSearch = 'http://api.giphy.com/v1/gifs/translate?s=' + toSearch + '&api_key=' + creds.giphy;
    toSearch += '&rating=PG';
    console.log('In giphy ', toSearch);
    return new Promise( function (fulfill, reject) {
        request.get(toSearch, (err, data) => { 
            if (err) reject(err) 
            else {
                var bodyData = JSON.parse(data.body);
                fulfill(bodyData.data.embed_url);
            }
        });
    });
};
