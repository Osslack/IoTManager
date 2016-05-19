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

router.post('/run' ,(req,res)=> {
  let {actionName, deviceName} = req.body;
  let owner = req.session.user.username;
  req.app.core.runAction(actionName, deviceName, owner)
  .then( (status) => {
    res.send("Status " + status);
  })
  .catch((e) => {
    res.status(500).send("Could not run action");
  })
})


module.exports = router;
