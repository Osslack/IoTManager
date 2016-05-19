import { Action } from './action.js';
import { Device } from './device.js';
import { Device_Queries } from './device_queries.js'

function addAction(action, deviceName, owner){
	let data = action.dbRepresentation;
  return this.db.collection("devices").findOne({ "name" : deviceName, "owner" : owner})
  .then(deviceDB => {
          let device = new Device(deviceDB);
					device.addAction(action);
					return this.updateDevice(device);
      });
}

function runAction(actionName, deviceName, owner) {
	return this.db.collection("devices").findOne({ "name" : deviceName, "owner" : owner})
	.then(deviceDB => {
		let device = new Device(deviceDB);
		let actionDB = device.actions.find((action) => {
			return action.name === actionName;
		})
		let action = new Action(actionDB);
		let adress = device.adress;
		let port = device.port;
		return {action, adress, port};
	})
}

module.exports.runAction = runAction;
module.exports.addAction = addAction;
