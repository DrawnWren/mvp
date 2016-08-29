var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var TextSchema = new mongoose.Schema({
    title: String,
    fullText: String,
    url: String
});

module.exports = mongoose.model('Text', TextSchema);
