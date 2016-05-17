function initDeviceCollection( ){
	this.db.collection("devices").createIndex( { "adress": 1, "port": 1, "username": 1}, { unique: true } );
	console.log("Created Unique Key");
};

function createDevice(device){
    return this.db.collection("devices").insertOne(device);
}

function getDevices(username){

}


module.exports.createDevice = createDevice;
module.exports.initDeviceCollection = initDeviceCollection;
