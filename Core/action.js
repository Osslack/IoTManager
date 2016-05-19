import { ObjectId } from 'mongodb';
import request from 'request';

class Action {

	constructor(dbAction = {}) {
		this._obj = dbAction;
		this._obj.name = this._obj.name || '';
    this._obj.type = this._obj.type || 'GET';
    this._obj.route = this._obj.route || '';
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

	run(adress, port){
		let url = 'http://' + adress + ':' + port + this._obj.route;
		let status = 500;
		let type = this._obj.type;
		console.log(type);
		console.log(url);
		request(
		{ method: type, uri: url },
		function (error, response, body) {
		if(error){
			return 404;
		}else{
			if(response.statusCode == 200){
				return 200;
			} else {
				return response.statusCode;
				}
			}
		})
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
