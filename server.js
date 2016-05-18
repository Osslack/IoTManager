// server.js
// load the things we need

var routes = require('./rest/router.js')
var express = require('express');
var mongo = require('mongodb');
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
import core from './Core/core';

var app = express();

app.use(morgan("combined"));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set the view engine to ejs
app.set('view engine', 'ejs');






core.createCore()
		.then(function(core) {
			// Start the server
			app.core = core;



			app.use('/static', express.static(__dirname + '/public'));
			routes.setUp(app);
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
