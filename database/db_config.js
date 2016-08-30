var db_string = 'mongodb://192.168.1.109:27017/db_node';
var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting'));

db.once('open', function() {
    console.log("Successfully connected");

    var userSchema = mongoose.Schema({
        fullname: String,
        email: String,
        password: String,
        createdAt: Date
    }, {
        versionKey: false
    });

    var tokenSchema = mongoose.Schema({
        idUser: String,
        createdAt: Date
    }, {
        versionKey: false
    });

    exports.User = mongoose.model('User', userSchema);
    exports.Token = mongoose.model('Token', tokenSchema);
});