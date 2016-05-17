import { Device } from './device';

function initDeviceCollection( ){
	this.db.collection("devices").createIndex( { "adress": 1, "port": 1, "owner": 1}, { unique: true } );
	console.log("Created Unique Key");
};

function createDevice(device){
    return this.db.collection("devices").insertOne(device)
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

module.exports.getDevices = getDevices;
module.exports.createDevice = createDevice;
module.exports.initDeviceCollection = initDeviceCollection;
