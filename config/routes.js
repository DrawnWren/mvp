//add some constrollers up here
//maybe some helpers/middleware too

module.exports = function (app, express) {
    app.get('/', (req, res) => res.sendFile('../client/index.html') ); //so fancy
}
