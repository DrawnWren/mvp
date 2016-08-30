var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);


mongoose.connect('mongodb://localhost/fangu');

app.listen(8080);

module.exports = app;
