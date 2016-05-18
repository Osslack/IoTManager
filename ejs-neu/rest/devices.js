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
	req.app.core.getDevices(req.session.user.username)
		.then((devices) => {
				res.send(devices);
		})
		.catch((e) => {
			console.error(e);
			res.status(500).send('Could not fetch devices')
		})
})

router.delete('/', (req,res) => {
	let {name, adress, port } = req.body;
	let owner = req.session.user.username;
	let device = new Device({name, adress, port, owner});
	req.app.core.deleteDevice(device)
	.then(() => {
		res.send('Deleted Device.');
	})
	.catch((e) => {
		console.error(e);
		res.status(500).send('Could not delete device');
	})

})

module.exports = router;
