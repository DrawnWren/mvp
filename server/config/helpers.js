var request = require('request');
var cheerio = require('cheerio');
var thegoogles = require('./thegoogles.js');
var Result = require('../result/resultModel.js');

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
                        new Result({results: d, url: url}).save();
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
    thegoogles.readText(text);
};
