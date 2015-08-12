// express is a nodejs library handling the routing and detailed web app
// get a refernce to the module express.
var express = require('express')
    , app = express()
    // consolidate is a set of wrapper for a number of template library for express   
    , cons = require('consolidate')
    , MongoClient = require('mongodb').MongoClient
    , routes = require('./routes.js');

MongoClient.connect('mongodb://localhost:27017/myChart', function(err, db){
	"use strict";
	if(err) throw err;

	// register the template engine, cons.swig based on file extension.
	app.engine('html', cons.swig);
	// view engine extension for express would be html by defalut.
	app.set('view engine', 'html');
	// set the directory for the application's view
	app.set('views',process.cwd() + "/views");
	app.set('port', (process.env.PORT || 8080));
	app.use(express.bodyParser());
	// register a handle for the routes
	/*
	app.get('/', function(req, res1){
		//res.send("Hello, World!");
		db.collection('helloworld').findOne({}, function(err, doc){
			res1.render('hello', doc);
		    });
	    });
	app.get('*', function(req1, res){
		res.send("Page not found", 404);
	    });
	
	*/
	routes(app, db);

	app.listen(app.get('port'));
	console.log("Exress server started on port 8080");
    });