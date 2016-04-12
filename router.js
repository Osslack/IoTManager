var express = require('express');
var http = require('http');
var app = express();
 var options = {
    root: __dirname + '/html/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
   res.sendFile('main.html', options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent');
    }
  });
  //deine funktion hier
});




//Create a server
app.use(express.static('html'));
app.listen(1337);
