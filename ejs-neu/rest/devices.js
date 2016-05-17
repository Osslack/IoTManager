import { Router } from 'express';
import Device from '../Core/device.js';

const router = new Router;

router.post('/', (req,res) => {
	let {name, adress, port } = req.body;
	let username = req.session.user.username;
	let device = {name, adress, port, username};
	req.app.core.createDevice(device)
		.then((dbDevice) => {
			console.log(dbDevice);
			let device = new Device(dbDevice);
			res.send(device);
		})
		.catch((e) => {
			console.error(e);
			res.staus(500).send('Could not create device');
		})
	})
module.exports = router;

router.get('/', (req,res) => {
	req.app.core.getDevices(req.session.user.username)
		.then((devices) => {
				res.send(devices);
		})
		.catch((e) => {
			console.error(e);
			res.staus(500).send('Could not fetch devices')
		})
})
