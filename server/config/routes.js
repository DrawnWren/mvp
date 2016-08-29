var path = require('path');
//add some constrollers up here
//maybe some helpers/middleware too
var resultController = require('../result/resultController.js');
var textController = require('../text/textController.js');

module.exports = function (app, express) {
    app.get('/', (req, res) => res.sendFile( path.join( __dirname, '../../client/index.html') ) ); //so fancy
    app.post('/api/analysis', textController.addText); 
    app.get('/api/analysis', resultController.getAllResults); 
}
