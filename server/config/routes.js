var path = require('path');
//add some constrollers up here
//maybe some helpers/middleware too
var resultController = require('../result/resultController.js');
var textController = require('../text/textController.js');

module.exports = function (app, express) {
    app.get('/', (req, res) => res.sendFile( path.join( __dirname, '../../client/index.html') ) ); //so fancy
    app.get('/api/byId/:entityId', function (req, res, next) {
        textController.getById(req.params.entityId).then( (r) => {
            resultController.getByUrlTopFive(r.url).then( (r) => {
                res.json(r);
            });
        });
    });
    app.post('/api/analysis', textController.addText); 
    app.get('/api/analysis/short', textController.findTitlesAndStatus);
    app.get('/api/analysis', resultController.getAllResults); 
}
