const express = require('express');
const connect = require('connect-mongo');
const server = require('../server.js');
const session = require('express-session');
var users = require('./users.js');

const router = new express.Router();
const MongoStore = connect(session);

function setUp(app){
	console.log(1);
	router.use(session({
		secret: "KappaRino",
		store: new MongoStore({db: app.core.db}),
		proxy: true,
		resave: true,
		saveUninitialized: true
	}));

	// add the routes
	router.use('/users', users);
	// add the router to the app
	var apiBaseUrl = '/api/v1';
	app.use(apiBaseUrl, router);
	//app.use('/',statics);
	app.use('/', function(req, res) {
		//res.send('kappa');
		res.render('pages/index');
	});

	// main page 
	app.use('/main', function(req, res) {
		//res.send('kappa');
		res.render('pages/main');
	});

	// wflow page 
	app.use('/wflow', function(req, res) {
		res.render('pages/wflow');
	});
	app.use((req, res, next) => {
		res.status(404).send("Nothing found.")
	});

	// Catch errors
	app.use((err, req, res, next) => {
		console.error(err);
		res.status(500).send("Something went wrong");
	})
};

module.exports.setUp = setUp;

