// Fast html framework
var express = require('express');
var session = require('express-session');
var upload = require('express-fileupload');
var fs = require('fs');
var winston = require('winston');
var winMid = require("express-winston-middleware");
var app = express();

app.use(upload());

app.use(session({
    secret: 'random',
    saveUninitialized: false,
    resave: false
}));

app.use(new winMid.request({
	transports: [
	  new (winston.transports.Console)({ json: true })
	]
}));

// For receiving JSON in posts
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

// For the database
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./db/Employee.db');

app.all('/api/*', function(req, res, next) {
	if(!req.session.name) {
        res.redirect('../index.html');
	} else {
		next();
	}
})

// Create DB Schema
require('./CreateDbController')(db);
// Add restful controller
require('./EmployeeController')(app, db, jsonParser);

require('./ManageFileController')(app, fs);

require('./ReadDirController')(app, fs);

// Serve static files
app.use(express.static('wwwroot'))

app.get('/',function(req,res){

	if(req.session.name) {
        res.redirect('/admin');
	}
	else {
	    res.render('index.html');
	}
});

app.post('/login',function(req,res){
    req.session.name = req.body.name;
    res.redirect('/admin');
});

app.get('/admin',function(req,res){
  
	if(req.session.name) {
		res.write('<h1>Hello '+req.session.name+'</h1>');
		res.write('<a href="/logout">Logout</a>');
		res.end();
	} else {
		res.write('<h1>Please login first.</h1>');
		res.write('<a href="/">Login</a>');
		res.end();
	}
});

app.get('/logout',function(req,res){
	
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});

});


console.log("INIT Express Server: http://localhost:3000");
app.listen(3000);
