var express = require('express');
var http = require('http');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});




//Create a server
app.use(express.static('html'))
app.listen(8080);
