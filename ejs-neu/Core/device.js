class Device {

	constructor(dbDevice = {}) {
		this._obj = dbDevice;
		this._obj.name = this._obj.name || '';
		this._obj.adress = this._obj.adress || [];
		this._obj.port = this._obj.port || '';
		this._obj.owner = this._obj.owner || '';
	}

	get id() {
		//db id, might be undefined !
		return this._obj._id;
	}

	//Name of the device
	get name(){
		return this._obj.name;
	}

	set name(value){
		this._obj.name = value;
	}

	//Ip adress, split into an array, because I couldn't get it to work otherwise
	get adress(){
		return this._obj.adress;
	}

	set adress(value){
		this._obj.adress = value;
	}

	//The Port the device is listening on
	get port() {
		return this._obj.port;
	}

	set port(value) {
		this._obj.port = value;
	}

	//The "Owner" of the device
	get owner(){
		return this._obj.owner;
	}

	set owner(value){
		this._obj.owner = value;
	}

	get dbRepresentation() {

        // assemble the object for the database.
        let dbObj = Object.assign({}, this._obj);

        dbObj._id = new ObjectID(dbObj._id);

        // return
        return dbObj;
    }

}

module.exports.Device = Device;
