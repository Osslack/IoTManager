var crypto = require('crypto');
var mongo = require('mongodb');

function createUser(username, password,db) {
    password = hashPassword(password);
    return db.collection('users').insertOne({username,password});

}

function initUserCollection(db){
	db.collection('users').createIndex( { "username": 1 }, { unique: true } );
	console.log("Created Unique Key");
};

function updateUser(userId, user, db){
	var toSet = {};
	if(user.password){
	 	user.password = hashPassword(user.password);
        toSet.password = user.password;
    }
    if(user.username) toSet.username = user.username;
    var setObj = { $set : toSet}
	return db.collection("users").updateOne({"username":userId }, setObj);
}

function deleteUser(userId,db){
	console.log(userId);
	return db.collection("users").remove({"username":userId});
}

function authUser(username, password, db){
	password = hashPassword(password);
	return db.collection("users").findOne({username, password},{"_id" :0})
}

function hashPassword(password){
	return crypto.createHash("md5").update(password).digest("hex");
}
module.exports.initUserCollection = initUserCollection;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.authUser = authUser;
