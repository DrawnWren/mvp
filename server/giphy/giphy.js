var request = require('request');
var creds = require('../config/creds.js');

function getGifs (toSearch) {
    //format for the api call
    toSearch = toSearch.split(' ').join('+');
    toSearch = 'http://giphy.com/v1/gifs/translate?s=' + toSearch + '&api_key=' + creds.giphy;
    toSearch += '&rating=PG-13';
    return new Promise( function (fulfill, reject) {
        request.get(qUrl, (err, data) => { 
            if (err) reject(err) 
            else {
                console.log('Giphy results ', data);
                fulfill(data);
            }
        });
    });
};
