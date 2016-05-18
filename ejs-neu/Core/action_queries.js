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

module.exports.initActionCollection = initActionCollection;
module.exports.addAction = addAction;
