var request = require('request');
var cheerio = require('cheerio');
var key = require('./creds.js');

exports.getAnal = function (req, res) {
    return "Analyze this!";
};

//Async get and parse a url into the text table
//Will quickly return the loading entry in the results
exports.getUrl = function (url) {
        request(url, function (err, res, html) {
        if (err) console.log('Get failed for url ', url, err); //exports.getUrl(url);
        else {
            exports.parseHtml(res.body).then( 
                (text) => {
                exports.readText(text).then( 
                    (d) => { 
                        console.log(d); //presents go here 
                    });
                });
            }
    });
};

exports.parseHtml = function (html) {
    return new Promise( function (fulfill, reject) {
        let $ = cheerio.load(html);
        var texts = $('body').text(); //might return all the text elements
        fulfill(texts);
    });
};

exports.readText = function (text) {
    let body = {
        document: {
        type: 'PLAIN_TEXT',
        lang: 'EN',
        content: text,
        encodingType: 'UTF16'
        }
    };

    return new Promise(function (fulfill, reject) {
        request({
            method: 'POST',
            uri: 'https://language.googleapis.com/v1beta1/documents:analyzeEntities',
            multipart: [{'content-type': 'application/json',
                key: key,
                body: body}]
        }, function (err, res, body) {
            console.log('Request executed at all.');
            if (err) {
                console.log('POST to google failed, like you expected, ', err);
                reject(err);
            }
            else {
                console.log('Got an actual response from google,', res);
                fulfill(res);
            }
        });
    });

};
