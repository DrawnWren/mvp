var path = require('path');
//add some constrollers up here
//maybe some helpers/middleware too
var resultController = require('../result/resultController.js');
var textController = require('../text/textController.js');

function textIdToTopFiveResult (entityId) {
        return new Promise( function(fulfill, reject) {
                textController.getById(entityId).then( (r) => {
                resultController.getByUrlTopFive(r.url).then( (r) => {
                    fulfill(r);
                });
            });
        });
}

module.exports = function (app, express) {
    app.get('/', (req, res) => res.sendFile( path.join( __dirname, '../../client/index.html') ) ); //so fancy
    app.get('/api/byId/:entityId', function (req, res, next) {  
       textIdToTopFiveResult(req.params.entityId).then( (r) => res.json(r) )
        .catch( (e) => next(e) );
    });
    app.get('/api/byId/:entityId/gifs', (req, res, next) => {
    });
    app.post('/api/analysis', textController.addText); 
    app.get('/api/analysis/short', textController.findTitlesAndStatus);
    app.get('/api/analysis', resultController.getAllResults); 
}
