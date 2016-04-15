// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page = login page
app.get('/', function(req, res) {
    res.render('pages/index');
});


// main page 
app.get('/main', function(req, res) {
    res.render('pages/main');
});

// wflow page 
app.get('/wflow', function(req, res) {
    res.render('pages/wflow');
});

function sayHello(){
		$("#myModal").modal("show");
	}

app.use(express.static(__dirname + '/public'));
app.listen(8088);
console.log('8088 is the magic port');