var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({
    title: String,
    fullText: String,
    url: String
});

module.exports = mongoose.model('Text', TextSchema);
