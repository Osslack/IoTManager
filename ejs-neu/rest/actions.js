import { Router } from 'express';
import { Action } from '../Core/action.js';

const router = new Router;

router.post('/', (req,res) => {
  let action = new Action(req.body);
  console.log(action);
  console.log(req.body);
  //let {name, type, route, deviceID} = req.body;
  req.app.core.addAction(action)
  .then( (action) => {
    console.log(action)
    res.send(action);
  })
  .catch( (e) => {
    console.error(e);
    res.status(500).send('Could not add Action');
  })
});


module.exports = router;
