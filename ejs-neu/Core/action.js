import { ObjectId } from 'mongodb';

class Action {

	constructor(dbAction = {}) {
		this._obj = dbAction;
		this._obj.name = this._obj.name || '';
    this._obj.type = this._obj.type || 'GET';
    this._obj.route = this._obj.route || '/';
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




	get dbRepresentation() {

        // assemble the object for the database.
        let dbObj = Object.assign({}, this._obj);

        dbObj._id = new ObjectId(dbObj._id);

        // return
        return dbObj;
    }

	get userRepresentation() {
				let result = {
						name: this.name,
						type: this.type,
						route : this.route,
				};
				return result;
		}

		set userRepresentation(obj) {
				if (obj.name !== undefined)  this.name = obj.name;
				if (obj.type !== undefined) this.type = obj.type;
				if (obj.route !== undefined) this.route = obj.route;
		}

}

module.exports.Action = Action;
