import { Action } from './action.js';
import { Device } from './device.js';
import { Device_Queries } from './device_queries.js'


function initActionCollection( ){
	this.db.collection("actions").createIndex( {"name" : 1, "deviceID" : 1}, { unique: true } );
	console.log("Created Unique Key");
};

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
	this.db.collection.findOne({ "name" : deviceName, "owner" : owner})
	.then(deviceDB => {
		let device = new Device(deviceDB);
		console.log(device);
		let action = device.actions.find((action) => {
			return action.name === actionName;
		})
		return action.run(device.adress, device.port);
	})
}

module.exports.runAction = runAction;
module.exports.initActionCollection = initActionCollection;
module.exports.addAction = addAction;
