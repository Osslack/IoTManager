function initDeviceCollection( ){
	this.db.collection("devices").createIndex( { "adress": 1, "port": 1, "username": 1}, { unique: true } );
	console.log("Created Unique Key");
};

function createDevice(device){
	console.log(device);
    return this.db.collection("devices").insertOne(device);
}


module.exports.createDevice = createDevice;
module.exports.initDeviceCollection = initDeviceCollection;