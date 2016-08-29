var path = require('path');
//add some constrollers up here
//maybe some helpers/middleware too

module.exports = function (app, express) {
    app.get('/', (req, res) => res.sendFile( path.join( __dirname, '../../client/index.html') ) ); //so fancy
}
