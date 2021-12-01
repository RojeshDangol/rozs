var mongoose = require('mongoose');
const userModel = require('../models/user.model');
var auth = require('../config/auth.config');
var jwt = require('jsonwebtoken')
require('dotenv').config();

function register (req, res, next){
    var userData = req.body;

    userModel.exists({username: userData.username}, (err, result)=>{
        if(err){
            console.log(err);
        }else if(result !== null){
            console.log("username taken");
            res.status(401).send("Username taken");
        }else{
            var saltHash = auth.genPassword(req.body.password);
                    var salt = saltHash.salt;
                    var hash = saltHash.hash;

            var newUser = new userModel({
                username: userData.username,
                salt: salt,
                hash: hash
            });

            newUser.save((err, newUser) => {
                if(err){
                    console.log(err)
                }else{
                    var token = auth.genJWT(userData._id);
                    // res.status(200).send({token}, newUser);
                    res.status(200).send({token});
                }
                
            });
                       
        }
    })
}

function login ( req, res, next) {
    var userData = req.body;

    userModel.findOne({username: userData.username}, (err, result) => {
        if(err){
            res.status(401).send("Errorrr");
        }else if(result === null){
            res.status(401).send("No user found");
        }else{
            var password = req.body.password;
            var hash = result.hash;
            var salt = result.salt;
            if(auth.validatePassword(password, hash, salt) === false){
                res.status(401).send("Invalid Password")
            }else{
                console.log('id in login', result._id);
                var token = auth.genJWT(result._id);
                console.log('id in login',result._id);
                res.status(200).send({token});
            }
           // console.log(req.headers.token);
        }
    })

}

function profile (req, res, next){
    console.log("profile");

    var authorization = req.headers.authorization;
    var token =  authorization.split(' ')[1];
    var decodeJWT = jwt.verify(token, process.env.SECRET);
    var id = decodeJWT.subject;
    //decodeJWT will give Subject { id };
     userModel.findById({_id: id}, (err, result) => {
                if(err){
                    return res.status(490).send('Not Authorized');
                    done();
                }else if(!result){
                    console.log('wrong token')
                    return res.status(401).send('false');
                }else{
                    
                   // console.log("user", result);
                    res.status(200).json(result);
                    //console.log('right token');
                }
             })
            
    
   
}

module.exports =  {
    register,
    login,
    profile
};