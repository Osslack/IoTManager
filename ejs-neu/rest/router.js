const express = require('express');
const connect = require('connect-mongo');
const server = require('../server.js');
const session = require('express-session');
const views = require('./views.js');
const actions = require('./actions.js');
var users = require('./users.js');
var devices = require('./devices.js');

const router = new express.Router();
const MongoStore = connect(session);

function setUp(app){
	router.use(session({
		secret: "KappaRino",
		store: new MongoStore({db: app.core.db}),
		proxy: true,
		resave: true,
		saveUninitialized: true
	}));
	 // auth
    var auth = users.authenticate;

		// add the router to the app
		var apiBaseUrl = '/api/v1';

	// add the routes
	router.use(apiBaseUrl + '/actions', auth, actions);
	router.use(apiBaseUrl + '/users', users);
	router.use(apiBaseUrl + '/devices', auth, devices);
	router.use('/', views);


	app.use(router);



	//Handle nonexisting routes
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
