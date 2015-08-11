function UsersDAO(db){
    var users = db.collection("users");
    
    this.addUser = function(email, password, callback){
	var user = {'_id': email, 'password': password};
	users.insert(user, function(err, result){
		if(!err){
		    console.log("Inserted new user");
		    return callback(null, result[0]);
		}
		return callback(err, null);
	    });
    }

    this.validateLogin = function(email, password, callback){
	users.findOne({'_id': email}, function(err, doc){
		if(err){
		    return callback(err, null);
		}
		if(!doc){
		    var no_such_user_error = new Error("Email: " + email + "doesn't exist");
		    callback(no_such_user_error, null);
		}
		else{
		    if(password != doc.password){
			var invalid_password_error = new Error("Invalid password for the " + email);
			callback(invalid_password_error, null);
		    }
		    else{
			callback(null, doc);
		    }
		}
	    });
    }
}
module.exports.UsersDAO = UsersDAO;