var Text = require('./textModel.js');

//yay middleware
var findByTitle = (title) => Text.find({title: title});

var byTitleMiddleware = (req, res, next) => {
    var title = req.body.title;
    findByTitle(title).then( (d) => res.json(d) )
    .catch( (e) => next(e) );
};

var addText = (req, res, next) => {
    Text.find({url: req.body.url}).then( (r) => { 
        //If the url is already in the database, return a trimmed item to be 
        //used on the front end
        if (r) {
            r = {status: r.status, url: r.url, title: r.title};
            res.json(r);
        } else {
            return url;
        }
    }).then( r => {
        //If we didn't find this url in the database already,
        //send the url request, and add a pending entry to the db
        if (r) {
            help.getUrl(r);
            new Link({url: r, status: 'Loading'}).save()
            .then( d => res.json(d) );
        }
    })
    .catch( e => next(e) );
};

var findAll = (req, res, next) => {
    Text.find().then( (d) => res.json(d) )
    .catch( (e) => next(e) );
}

module.exports = {
    findByTitle: byTitleMiddleware,
    findAll: findAll,
    addText: addText
}
