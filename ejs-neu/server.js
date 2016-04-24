// server.js
// load the things we need

var APIroutes = require('./rest/router.js')
var express = require('express');
var mongo = require('mongodb');
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
//var user = require('/rest/users.js');

var app = express();

app.use(morgan("combined"));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db_url = "mongodb://localhost/iot";

// set the view engine to ejs
app.set('view engine', 'ejs');

/*// use res.render to load up an ejs view file
app.use((req, res, next) => {
	console.log(req.body);
	res.status(404).send("Nothing found.")
});

// Catch errors
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send("Something went wrong");
});*/

var promise = mongo.MongoClient.connect(db_url)
	.then(function(db){
		app.db = db;
		APIroutes.setUp(app);
		
		app.listen(8088);
		console.log('8088 is the magic port');
	})
	.catch(function (err){
		console.log(err);
	});

module.exports = app;

