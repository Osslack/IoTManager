import { Action } from './action.js';


function initActionCollection( ){
	this.db.collection("actions").createIndex( {"name" : 1, "deviceID" : 1}, { unique: true } );
	console.log("Created Unique Key");
};

function addAction(action){
  console.log(action);
  return this.db.collection("actions").insertOne(action)
  .then(cursor => {
          return new Action(cursor.ops[0])
      });
}

module.exports.initActionCollection = initActionCollection;
module.exports.addAction = addAction;
