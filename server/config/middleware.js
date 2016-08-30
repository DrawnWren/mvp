var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function (app, express) {
    app.use( morgan('dev') );
    app.use( express.static( __dirname + '/../../client') );
    app.use( bodyParser.json() );
    return "MANY USEFUL THOUGHTS!";
}
