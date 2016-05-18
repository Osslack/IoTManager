import { Router } from 'express';
import { Device } from '../Core/device.js';

const router = new Router;

router.post('/', (req,res) => {
	// check the request
  let userObject = req.body;

  // create device
  let owner = req.session.user.username;
  let device = new Device();
  device.userRepresentation = userObject;
  device.owner = owner;
	req.app.core.createDevice(device)
		.then((device) => {
			res.send(device.userRepresentation);
		})
		.catch((e) => {
			console.error(e);
			res.status(500).send('Could not create device');
		})
	})

router.get('/', (req,res) => {
  console.log(req.session.user);
	req.app.core.getDevices(req.session.user.username)
		.then((devices) => {
      console.log(devices);
				res.send(devices);
		})
		.catch((e) => {
			console.error(e);
			res.status(500).send('Could not fetch devices')
		})
})

router.delete('/', (req,res) => {
	let { name } = req.body;
	let owner = req.session.user.username;
	req.app.core.deleteDevice(name, owner)
	.then(() => {
		res.send('Deleted Device.');
	})
	.catch((e) => {
		console.error(e);
		res.status(500).send('Could not delete device');
	})

})

module.exports = router;
