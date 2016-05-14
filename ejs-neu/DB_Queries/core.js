import mongo from 'mongodb';
import users from './user_queries';


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



/**
 * createCore:
 * A utility method that creates a core using
 * the default database connection configured
 * at 'database.url' in the config file.
 */

const db_url = "mongodb://localhost/iot";

function createCore() {
	// connect to the database
	var promise = mongo.MongoClient.connect(db_url)
		.then(function(db){
			var core = new Core(db);
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
