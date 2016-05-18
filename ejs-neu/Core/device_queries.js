import { Device } from './device';

function initDeviceCollection( ){
	this.db.collection("devices").createIndex( { "name": 1, "owner": 1}, { unique: true } );
	console.log("Created Unique Key");
};


function createDevice(device){
	let data = device.dbRepresentation;
    return this.db.collection("devices").insertOne(data)
		.then(cursor => {
            return new Device(cursor.ops[0])
        });
}

function getDevices(username){
	let deviceCursor = this.db.collection("devices").find({"owner" : username});
	let dbResult = deviceCursor.toArray();
	let result = dbResult.then(array => {
		return array
		.map(dbDevice => new Device(dbDevice));
	})
	return result;
}
function deleteDevice(device){
	return this.db.collection("devices").remove(device);
}

module.exports.deleteDevice = deleteDevice;
module.exports.getDevices = getDevices;
module.exports.createDevice = createDevice;
module.exports.initDeviceCollection = initDeviceCollection;
