"use strict";
var express = require('express');
var db_users = require('./../dbActions/users.js');
const router = new express.Router();

var count = 0;
router.post('/', (req, res) => {
    console.log(req.body);
    let {username, password} = req.body;
    console.log("Hier");
    if(count == 0){
        db_users.initUserCollection(req.app.db);
        count = 1;
    }
        console.log("Hier");
    db_users.createUser(username, password,req.app.db)
    	.then(function (){
	        res.send('User created.');
    	})
    	.catch(function(){
	        res.status(500).send('Username ' + username +' is already in use');
    	});  
});

router.put("/:userId", (req, res) => {
    let userId = req.params.userId;
    let user = req.body;
    if(req.session.user = userId){
    db_users.updateUser(userId, user, app.db)
        .then(function (){
            res.send('User updated.');
        })
        .catch(function(){
            res.status(500).send('Username ' + username +' is already in use');
        });
    }
    else res.status("403").send('You dont have permission to do that.');  
});

router.delete("/:userId", (req,res) => {
    let userId = req.params.userId;
    if(req.session.user === userId){
    db_users.deleteUser(userId, app.db)
        .then(function(){
            res.send('User ' + userId + ' was succesfully deleted.');
        })
        .catch(function(){
            res.status(500).send('User ' + userId + ' could not be deleted.');
        });
    }
    else res.send(403).send('You do not have permission to do that.');
        
});


router.post("/login", (req, res) => {
    let user = req.body;  
    db_users.authUser(user.username, user.password)
    .then(function() {
            req.session.user = username;
            req.session.authenticated = true;
            res.send('Succesfully authenticated user ' + username );
                
        })
    .catch(function(e){
        console.log(e)
        res.status(403).send('Authentication for user ' + username + ' failed');
        });
});

router.authenticate = (req, res, next) => {
    console.log("authentication: " + req.session);
    if(req.session.authenticated) {
        next();
    }
    else {
        res.status(403).send('Could not authenticate');
    }
};


module.exports = router;