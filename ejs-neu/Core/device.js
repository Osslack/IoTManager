import { ObjectId } from 'mongodb';

class Device {

	constructor(dbDevice = {}) {
		this._obj = dbDevice;
		this._obj.name = this._obj.name || '';
		this._obj.adress = this._obj.adress || [];
		this._obj.port = this._obj.port || '';
		this._obj.actions = this._obj.actions || [];
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

	get actions(){
		return this._obj.actions;
	}

	set actions(value){
		this._obj.actions = value;
	}

	addAction(action){
		this._obj.actions.push(action);
	}

	get dbRepresentation() {

        // assemble the object for the database.
        let dbObj = Object.assign({}, this._obj);

        dbObj._id = new ObjectId(dbObj._id);

        // return
        return dbObj;
    }

	get userRepresentation() {
		let actions = this.actions.map(
			action => action.userRepresentation
		);
	  let result = {
	      id: this.id,
	      name: this.name,
	      adress: this.adress,
				port : this.port,
				actions : actions,
				owner : this.owner
	  };
	  return result;
	  }

	  set userRepresentation(obj) {
			console.log('userRepresentation');
			console.log(obj)
	      if (obj.id)     this.id = ObjectId(obj.id);
	      if (obj.name !== undefined)  this.name = obj.name;
	      if (obj.adress !== undefined) this.adress = obj.adress;
				if (obj.port !== undefined) this.port = obj.port;
				if (obj.actions){
            let actions = this.actions;
            let newActions = [];
            for (let action of obj.actions) {
                let oldAction = actions.find(element => element.id == action.id);
                let actionToAdd;
                if (oldAction) {
                    oldAction.userRepresentation = action;
                    actionToAdd = oldAction;
                } else {
										console.log(action);
                    let type = action.type;
                    actionToAdd = new Action();
										actionToAdd.type = type;
                    actionToAdd.userRepresentation = action;
                }
                newActions.push(actionToAdd);
            }
            this.actions = newActions;
        }
				if (obj.owner !== undefined) this.owner = obj.owner;
	  }
}

module.exports.Device = Device;
