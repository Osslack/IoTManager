const express = require('express');
const connect = require('connect-mongo');
const server = require('../server.js');
const session = require('express-session');
var users = require('./users.js');
var statics = require('./static.js');

const router = new express.Router();
const MongoStore = connect(session);

function setUp(app){
	console.log(1);
	router.use(session({
		secret: "KappaRino",
		store: new MongoStore({db: app.db}),
		proxy: true,
		resave: true,
		saveUninitialized: true
	}));

	// add the routes
	router.use('/users', users);
	router.use('/',statics);
	// add the router to the app
	var apiBaseUrl = '/api/v1';
	app.use(apiBaseUrl, router);
	//app.use('/',statics);

	

	//app.use(express.static(__dirname + '/public'));
	

	//console.log(1);
};

module.exports.setUp = setUp;

