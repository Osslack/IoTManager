import { Device } from './device';
import { ObjectId } from 'mongodb';

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
		.map(dbDevice => new Device(dbDevice))
		.map(device => device.userRepresentation);
	})
	return result;
}
function deleteDevice(name, owner){
	return this.db.collection("devices").remove({ "name" : name, "owner" : owner});
}

function updateDevice(device){
    let data = device.dbRepresentation;
    let id = ObjectId(device.id.toString());
		console.log(id);

    delete data._id;

    //  $set specifies the data to change, fields not supplied in data will not be changed
    return this.db.collection("entries").findAndModify(
        {'_id': id }, [], {"$set": data}, { "new" : true }
    ).then(cursor => {
        let newData = cursor.value;
				console.log(newData);
        let newDevice = new Device(newData);
        return newDevice;
    });
}

module.exports.updateDevice = updateDevice;
module.exports.deleteDevice = deleteDevice;
module.exports.getDevices = getDevices;
module.exports.createDevice = createDevice;
module.exports.initDeviceCollection = initDeviceCollection;
