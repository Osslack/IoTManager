import { Router } from 'express';

let router = new Router();

//Serve the basic pages
//index
router.get('/', function(req, res) {
    res.redirect('/devices')
});

//device page
router.get('/devices', function(req, res) {
	res.render('pages/main');
});

router.get('/login', function(req,res) {
  res.render('pages/login');
});

router.get('/register', function(req,res) {
  res.render('pages/register');
});

// workflow page
router.get('/wflow', function(req, res) {
	res.render('pages/wflow');
});

module.exports = router;
