var Text = require('./textModel.js');

//yay middleware
var findByTitle = (title) => Text.find({title: title});

var byTitleMiddleware = (req, res, next) => {
    var title = req.body.title;
    findByTitle(title).then( (d) => res.json(d) )
    .catch( (e) => next(e) );
};

var findAll = (req, res, next) => {
    Text.find().then( (d) => res.json(d) )
    .catch( (e) => next(e) );
}

module.exports = {
    findByTitle: byTitleMiddleware,
    findAll: findAll
}
