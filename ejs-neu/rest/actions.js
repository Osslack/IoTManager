import { Router } from 'express';
import { Action } from '../Core/action.js';

const router = new Router;

router.post('/', (req,res) => {
  // check the request
  let {name, type, route, deviceName} = req.body
  let userObject = {name, type, route}
  // create device
  let owner = req.session.user.username;
  let action = new Action();
  action.userRepresentation = userObject;
  req.app.core.addAction(action, deviceName, owner)
  .then( (device) => {
    res.send(device.userRepresentation);
  })
  .catch( (e) => {
    console.error(e);
    res.status(500).send('Could not add Action');
  })
});


module.exports = router;
