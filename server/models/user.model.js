var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    //password: String
    hash: String,
    salt: String
})

var userModel = mongoose.model('user', userSchema, 'userCollection');

module.exports = userModel;