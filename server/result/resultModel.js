var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//all you need is a String ... right?
var ResultSchema = mongoose.Schema({
    results: String
});

module.exports = mongoose.model('Result', ResultSchema);
