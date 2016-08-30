var app = require('../app_config.js');

var userController = require('../controller/userController.js');
var validator = require('validator');
var patch = '/user';

// Generate X-Token
app.post('/login', function(req, res) {
    userController.login(req.body, function(resp) {
        res.json(resp);
    });
});

// Get User information with your X-Token
app.get(patch, function(req, res) {
    var xToken = req.headers['x-token'];
    userController.getUser(xToken, function(resp) {
        res.json(resp);
    });
});

// Add new User
app.post(patch, function(req, res) {
    userController.newUser(req.body, function(resp) {
        res.json(resp);
    });
});