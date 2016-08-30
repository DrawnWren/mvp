var request = require('request');
var cheerio = require('cheerio');
var thegoogles = require('./thegoogles.js');
var Result = require('../result/resultModel.js');
var Text = require('../text/textModel.js');
var Promise = require('bluebird');

exports.getAnal = function (req, res) {
    return "Analyze this!";
};

exports.readText = function (text) {
    return thegoogles.readText(text);
};

function changeToFinished (url) {
    Text.findOne({url: url}).then(
        (text) => {
            text.status = 'Finished';
            text.save();
        });
}
//Async get and parse a url into the text table
//Will quickly return the loading entry in the results
exports.getUrl = function (url) {
        request(url, function (err, res, html) {
        if (err) console.log('Get failed for url ', url, err); //exports.getUrl(url);
        else {
            console.log('Type of url is ', typeof url);
            var result = new Result({url: url});
            exports.parseHtml(res.body).then( 
                (text) => {
                    console.log('Type of text is ', typeof text);
                result.fullText = text;
                exports.readText(text).then( 
                    (d) => { 
                        changeToFinished(url); 
                        console.log('Type of results is ', typeof d);
                        result.results = d;
                        result.save();
                    });
                });
            }
    });
};

exports.parseHtml = function (html) {
    return new Promise( function (fulfill, reject) {
        let $ = cheerio.load(html, {xmlMode: false});
        $('script').remove();
        var texts = $('body').text(); //might return all the text elements
        texts = texts.replace(/(\r\n|\n|\r)/gm," ");
        texts = texts.replace(/(?:\b\S{1,2}\b\s*)+/gm, "");
        console.log('Text is , ', texts); 
        fulfill(texts);
    });
};


