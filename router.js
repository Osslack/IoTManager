var express = require('express');
var http = require('http');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var options = {
    root: __dirname + '/html/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
  }
};
var mongoose = require('mongoose/');
var Schema = mongoose.Schema;
var app = express();

mongoose.connect('mongodb://localhost/iot');
console.log('connected');

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
var Schema = mongoose.Schema;


var UserDetail = new Schema({
    username: String,
    password: String
}, {collection: 'userInfo'});

var UserDetails = mongoose.model('userInfo',UserDetail);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new LocalStrategy(
  function(username, password, done) {
   
    process.nextTick(function () {
    UserDetails.findOne({'username':username},
    function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
    });
  }
));



app.get('/auth', function(req, res, next) {
  res.sendfile('views/login.html');
});


app.get('/loginFailure' , function(req, res, next){
  res.send('Failure to authenticate');
});

app.get('/loginSuccess' , function(req, res, next){
  res.send('Successfully authenticated');
});

app.post('/',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  }));

//Create a server
app.use(express.static('html'));
app.listen(1337);
