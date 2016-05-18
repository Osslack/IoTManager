import { Mongo } from 'mongodb';

class Action {

	constructor(dbAction = {}) {
		this._obj = dbAction;
		this._obj.name = this._obj.name || '';
    this._obj.type = this._obj.type || 'GET';
    this._obj.route = this._obj.route || '/';
    this._obj.deviceName = this._obj.deviceName || '';
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
	get type(){
		return this._obj.type;
	}

	set type(value){
		this._obj.type = value;
	}

	//The Port the device is listening on
	get route() {
		return this._obj.route;
	}

	set route(value) {
		this._obj.route = value;
	}

	//The "Owner" of the device
	get deviceName(){
		return this._obj.deviceName;
	}

	set deviceName(value){
		this._obj.deviceName = value;
	}

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
		get userRepresentation() {
					let result = {
							id: this.id,
							name: this.name,
							type: this.type,
							route : this.route,
							deviceName : this.deviceName,
							owner : this.owner
					};
					return result;
			}

			set userRepresentation(obj) {
					if (obj.id)     this.id = ObjectID(obj.id);
					if (obj.name !== undefined)  this.name = obj.name;
					if (obj.type !== undefined) this.type = obj.type;
					if (obj.route !== undefined) this.route = obj.route;
					if (obj.deviceName !== undefined) this.deviceName = obj.deviceName;
					if (obj.owner !== undefined) this.owner = obj.owner;
			}

}

module.exports.Action = Action;