import { Router } from 'express';
var users = require('./users.js');

let router = new Router();

var auth = users.authenticate;
//Serve the basic pages
//index
router.get('/',auth, function(req, res) {
  console.log(req.session);
    res.redirect('/devices')
});

//device page
router.get('/devices',auth, function(req, res) {
  console.log(req.session);
	res.render('pages/main');
});

router.get('/login', function(req,res) {
  console.log(req.session);
  res.render('pages/login');
});

router.get('/register', function(req,res) {
  console.log(req.session);
  res.render('pages/register');
});

// workflow page
router.get('/wflow',auth, function(req, res) {
  console.log(req.session);
	res.render('pages/wflow');
});

module.exports = router;
