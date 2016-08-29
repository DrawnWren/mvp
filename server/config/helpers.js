var request = require('request');

exports.getAnal = function (req, res) {
    return "Analyze this!";
};

//Async get and parse a url into the text table
//Will quickly return the loading entry in the results
exports.getUrl = function (url) {
        request(url, function (err, res, html) {
        if (err) exports.getUrl(url);
        else {
            console.log('Time to parse: ', res);
        }
    });
};
