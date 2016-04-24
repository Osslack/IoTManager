var express = require('express');

const router = new express.Router();

// index page = login page
	router.get('/', function(req, res) {
		res.send('kappa');
		//res.render('pages/index');
	});

	// main page 
	router.get('/main', function(req, res) {
		res.send('kappa');
		//res.render('pages/main');
	});

	// wflow page 
	router.get('/wflow', function(req, res) {
		res.render('pages/wflow');
	});
module.exports = router;