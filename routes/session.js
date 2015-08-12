var UsersDAO = require('../dataAccessHelper/users.js').UsersDAO;

function SessionHandler(db){
    // function is a object
    var users = new UsersDAO(db);
    this.displayLoginPage = function(req, res, next){
	return res.render("login", {email:"", password:"", login_error:""})
    }
    this.handleLoginRequest = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	users.validateLogin(email, password, function(err, user){
		if(err){
		    return res.render("login", {login_error: "Try again"});
		}
		else{
		    res.send('Welcome' + email);
		}
	    });
    }
}

module.exports = SessionHandler;