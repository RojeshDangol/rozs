const { doesNotMatch } = require('assert');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
require('dotenv').config();

function genPassword(password){
    var salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {hash, salt};
}

function validatePassword(password, hash, salt){
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return hash === hashVerify;
}

function genJWT(id){

    var payload = {subject: id};
    console.log(payload);
    var token = jwt.sign(payload, process.env.SECRET);
    return token;
}


  

module.exports = { 
    genPassword,
    validatePassword,
    genJWT
}