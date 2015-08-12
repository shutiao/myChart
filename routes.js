var SessionHandler = require('./routes/session.js');

module.exports = exports = function(app, db){
    var sessionHandler = new SessionHandler(db);
    
    app.get('/', function(req, res){
	    res.redirect('/login');
	});
    app.get('/login', sessionHandler.displayLoginPage);
    app.post('/login', sessionHandler.handleLoginRequest);
    app.get('*', function(req, res){
	    res.send("Page not found", 404);
	});
}
