var userDao = require('../dao/userDao.js');
var tokenDao = require('../dao/tokenDao.js');

exports.list = function(callback){
	userDao.getAllUser(function(resp) {
		callback(resp);
	});
};

exports.getUser = function(xToken, callback) {
	if (xToken ==  null){
		var response = {};
		response.cod = 0;
		response.msg = 'Token can not be null.';
		callback(response);
	} else {
		tokenDao.findById(xToken, function(resp){
			if (resp.cod != 1){
				callback(resp);
			} else {
				userDao.getUserById(resp.obj.idUser, function (resp) {
					callback(resp);
				});
			}
		});
	}
};

exports.login = function(mLogin, callback) {
	// Decode the password from Base64 to String
	mLogin.password = Buffer.from(mLogin.password, 'base64').toString('ascii');
	userDao.findByLogin(mLogin, function(resp){
		if (resp.cod == 1){
			tokenDao.createToken(resp.obj, function(resp){
				callback(resp);
			});
		} else {
			callback(resp);
		}
	});	
};

exports.newUser = function(mUser, callback){
	// Decode the password from Base64 to String
	mUser.password = Buffer.from(mLogin.password, 'base64').toString('ascii');

	// Check if the e-mail exists on database
	userDao.findByEmail(mUser, function(exists){
		if (exists){
			var response = {};
			response.cod = 0;
			response.msg = "This e-mail it's already registered";
			callback(response);
		} else {
			// If don't exists, create a new user
			userDao.createUser(mUser, function(resp){
				callback(resp);
			});
		}
	});
};