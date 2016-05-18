import { Action } from './action.js';
import { Device } from './device.js';
import { Device_Queries } from './device_queries.js'


function initActionCollection( ){
	this.db.collection("actions").createIndex( {"name" : 1, "deviceID" : 1}, { unique: true } );
	console.log("Created Unique Key");
};

function addAction(action){
	console.log(action);
	let data = action.dbRepresentation;
	console.log(data);
  return this.db.collection("devices").findOne({ "name" : data.deviceName, "owner" : data.owner})
  .then(deviceDB => {
		console.log(deviceDB);
          let device = new Device(deviceDB);
					console.log(device);
					device.addAction(action);
					console.log(device);
					return this.updateDevice(device.userRepresentation);
      });
}

module.exports.initActionCollection = initActionCollection;
module.exports.addAction = addAction;
