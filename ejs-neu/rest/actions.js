import { Router } from 'express';
import { Action } from '../Core/action.js';

const router = new Router;

router.post('/', (req,res) => {
  // check the request
  let userObject = req.body
  // create device
  let owner = req.session.user.username;
  let action = new Action();
  action.userRepresentation = userObject;
  action.owner = owner;
  req.app.core.addAction(action)
  .then( (device) => {
    console.log(device)
    res.send(device.userRepresentation);
  })
  .catch( (e) => {
    console.error(e);
    res.status(500).send('Could not add Action');
  })
});


module.exports = router;
