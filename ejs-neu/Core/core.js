import mongo 	from 'mongodb';
import users 	from './user_queries';
import devices 	from './device_queries';
import actions from './action_queries';


/**
 * Core:
 * A core object is a collection of functions
 * working on a database that is stored in
 * an instance of this class.
 */
function Core(dbConnection){
	this.db = dbConnection;
};

// Assign the modules to the core
Object.assign(Core.prototype, users);
Object.assign(Core.prototype, devices);
Object.assign(Core.prototype, actions);



const db_url = "mongodb://localhost/iot";

function createCore() {
	// connect to the database
	var promise = mongo.MongoClient.connect(db_url)
		.then(function(db){
			var core = new Core(db);
			core.initUserCollection();
			core.initDeviceCollection();
			core.initActionCollection();
			return core;
		})
		.catch( (e) => {
			console.error(e);
		});

	// return the final promise.
	return promise;
};


module.exports.Core = Core;
module.exports.createCore = createCore;
