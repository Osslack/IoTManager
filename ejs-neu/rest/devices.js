import { Router } from 'express';
import Device from '../Core/device.js';

const router = new Router;
var count = 0;

router.post('/', (req,res) => {
	let {name, adress, port } = req.body;
	req.app.core.createDevice(name, adress, port, req.session.user.username)
		.then((device) => {
			res.send('Created Device');
		})
		.catch((e) => {
			console.error(e);
			res.staus(500).send('Something went wrong');
		})
	})
module.exports = router;