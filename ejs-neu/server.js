// server.js
// load the things we need

var APIroutes = require('./rest/router.js')
var express = require('express');
var mongo = require('mongodb');
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
import core from './DB_Queries/core';

var app = express();

app.use(morgan("combined"));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// set the view engine to ejs
app.set('view engine', 'ejs');

/*app.use('/', function(req, res) {
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
});*/

// use res.render to load up an ejs view file


core.createCore()
		.then(function(core) {
			// Start the server
			app.core = core;
			APIroutes.setUp(app);
			return app.listen(8088);
			
		})
		.then(() => {
			console.log('8088 is the magic port');
		})
		.catch(e => {
			console.error(e);
			console.log("Something went wrong");
		})


module.exports = app;

