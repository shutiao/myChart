var SessionHandler = require('./routes/session.js');

function routes(app, db){
    var sessionHandler = new SessionHandler(db);
    
    app.get('/', function(req, res){
	    res.redirect("/login");
	});
    app.get('/login', sessionHandler.displaySignupPage);
    app.post('/login', sessionHandler.handleLoginRequest);
    app.get('*', function(req, res){
	    res.send("Page not found", 404);
	});
}

module.exports = routes;