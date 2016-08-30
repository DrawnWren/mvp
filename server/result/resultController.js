var Result = require('./resultModel.js');


var getAllResults = function (req, res, next) {
    Result.find().then( (d) =>{
        res.json(d);
    })
    .catch( (e) => next(e) );
}

module.exports = {getAllResults: getAllResults};
