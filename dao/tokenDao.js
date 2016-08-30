var db = require('../database/db_config.js');

exports.createToken = function(mUser, callback){
		var token = {};
		token.idUser = mUser._id;
		token.createdAt = new Date();
	new db.Token(token).save(function(error, token) {		
		var response = {};
		if(error) {
			response.cod = 0;
			response.msg = 'Could not possible generate the Token';
		} else {
			response.cod = 1;
			response.msg = 'Token generated successfully';
			response.obj = token._id;
		}
		callback(response);
	});
};

exports.findById = function(id, callback){
	db.Token.findById(id, function(error, token) {
		var response = {};
		if (error){
			response.cod = 0;
			response.msg = 'Could not get the Token';
		} else {
			if (token == null){
				response.cod = 0;
				response.msg = 'Token not found';
			} else {
				response.cod = 1;
				response.msg = 'Token successfully found';
				response.obj = token;
			}
		}
		callback(response);
	});
};