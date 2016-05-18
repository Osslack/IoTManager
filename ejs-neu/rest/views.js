import { Router } from 'express';

let router = new Router();

router.auth = (req, res, next) => {
    if(req.session.authenticated) {
        //console.log('Authenticated ' + req.session.user.username);
        next();
    }
    else {
        console.log('Authentication failed.');
        res.redirect('/login');
    }
};

var auth = router.auth;
//Serve the basic pages
//index
router.get('/',auth, function(req, res) {
    res.redirect('/devices')
});

//device page
router.get('/devices',auth, function(req, res) {
	res.render('pages/main');
});

router.get('/login', function(req,res) {
  res.render('pages/login');
});

router.get('/register', function(req,res) {
  res.render('pages/register');
});

// workflow page
router.get('/wflow',auth, function(req, res) {
	res.render('pages/wflow');
});



module.exports = router;
