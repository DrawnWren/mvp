var request = require('request');

function getGifs (toSearch) {
    return new Promise( function (fulfill, reject) {
        request({
        url: 'http://giphy.com/v1/gifs/translate',
        });
    });
};
