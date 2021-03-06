import { Router } from 'express';
import assert from 'assert';

const router = new Router;
var count = 0;

router.post('/', (req, res) => {
    let { username, password } = req.body;
    req.app.core.createUser(username, password)
        .then(function (){
            res.send('User created.');
        })
        .catch(function(e){
            res.status(500).send('Username ' + username +' is already in use');
        });
});

router.put('/', (req, res) => {
    let { password_old, password_new } = req.body;
    req.app.core.authUser(req.session.user.username, password_old)
    .then(user => {
        req.app.core.updateUser(user.username, password_new)
        .then(() => {
             res.send('User updated.');
        })
        .catch(e => {
            console.error(e);
            res.status(500).send("Could not update");
        })
    })
    .catch(e => {
            console.error(e);
            res.status(500).send("Could not update");
    })
});

router.delete("/", (req,res) => {
    req.app.core.deleteUser(req.session.user.username)
        .then(function(){
            req.session = null;
            res.send('User was succesfully deleted.');
        })
        .catch(function(){
            res.status(500).send('User ' + req.session.user.username + ' could not be deleted.');
        });
});

router.post("/login", (req, res) => {
    console.log(req.body);
    let {username, password} = req.body;
    if (username === undefined || password === undefined) {
        res.status(400).send('Both username and password have to be provided.');
        return;
    }
    req.app.core.authUser(username, password)
        .then(user => {
            req.session.user = {
                id      : user._id,
                username: user.username
            };
            req.session.authenticated = true;
            res.send('Succesfully authenticated user ' + username );
        })
        .catch(function(e){
            console.log(e);
            res.status(403).send('Authentication for user ' + username + ' failed');
        });
});

router.post("/logout" ,(req,res) =>{
    delete req.session.authenticated
    delete req.session.user;
    res.send('User succesfully logged out');
})

router.authenticate = (req, res, next) => {
    if(req.session.authenticated) {
        console.log('Authenticated ' + req.session.user.username);
        next();
    }
    else {
        console.log('Authentication failed.');
        res.status(403).send('Could not authenticate');
    }
};

module.exports = router;
