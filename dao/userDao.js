var db = require('../database/db_config.js');

exports.getAllUser = function(callback) {
    db.User.find({}, function(error, users) {
        var response = {};
        if (error) {
            response.cod = 0;
            response.msg = 'Could not return all users';
        } else {
            response.cod = 1;
            response.msg = 'Success'
            response.resposta = users;
        }
        callback(response);
    });
};

exports.getUserById = function(id, callback) {
    db.User.findById(id, function(error, user) {
        var response = {};
        if (error) {
            response.cod = 0;
            response.msg = 'There was a problem accessing the data';
        } else {
            if (user == null) {
                response.cod = 0;
                response.msg = 'User not found';
            } else {
                response.cod = 1;
                response.msg = 'User successfully found'
                response.resposta = user;
            }
        }
        callback(response);
    });
};

exports.findByLogin = function(mLogin, callback) {
    db.User.findOne(mLogin, function(error, user) {
        var response = {};
        if (error) {
            response.cod = 0;
            response.msg = 'There was a problem accessing the data';
        } else {
            if (user == null) {
                response.cod = 0;
                response.msg = 'User not found. Check your data';
            } else {
                response.cod = 1;
                response.msg = 'User successfully found';
                response.obj = user;
            }
        }
        callback(response);
    });
};

exports.createUser = function(mUser, callback) {
    mUser.createdAt = new Date();
    new db.User(mUser).save(function(error, user) {
        var response = {};
        if (error) {
            response.cod = 0;
            response.msg = 'Could not save user';
        } else {
            response.cod = 1;
            response.msg = 'User save successfully';
            response.obj = user;
        }
        callback(response);
    });
};

exports.findByEmail = function(mLogin, callback) {
    db.User.findOne({
        'email': mLogin.email
    }, function(error, user) {
        var response = {};
        if (error)
            callback(false);
        else
            callback(user != null);
    });
};