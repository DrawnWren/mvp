var request = require('request');
var cheerio = require('cheerio');

exports.getAnal = function (req, res) {
    return "Analyze this!";
};

//Async get and parse a url into the text table
//Will quickly return the loading entry in the results
exports.getUrl = function (url) {
        request(url, function (err, res, html) {
        if (err) console.log('Get failed for url ', url, err); //exports.getUrl(url);
        else {
            exports.parseHtml(res.body);
        }
    });
};

//html in, text out
//it mostly works or your money back (not really)
exports.parseHtml = function (html) {
    let $ = cheerio.load(html);
    var texts = $('body').children.map( (i, el) => {
        return $(this).text();
    });
    //texts should now be an array of text
    texts = texts.join('');
    console.log('Instead of analyzing, logging ', texts);
    return texts;
};
