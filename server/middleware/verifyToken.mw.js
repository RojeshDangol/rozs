var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
require('dotenv').config();

function verifyToken (req, res, next){
    // console.log("verification part");
    //console.log(req.headers.token);
    console.log(req.headers.authorization);
    var authorization = req.headers.authorization;
    var token =  authorization.split(' ')[1];
    console.log(token);

    if(!token){
        return res.status(401).send('No token');
    }else{
   
try{
    console.log("verifying part");
        var verifyJWT = jwt.verify(token, process.env.SECRET);
    console.log(verifyJWT);
        if(verifyJWT.subject === undefined){
            return res.status(488).send('Invalid Token')
        }else{
            userModel.findOne({_id: verifyJWT.subject}, (err, result) => {
                if(err){
                    return res.status(490).send('Not Authorized');
                    done();
                }else if(!result){
                    console.log('wrong token')
                    return res.status(401).send('false');
                }else{
                    res.status(200);
                    console.log('right token');
                    next();
                }
             })
            }
   
        } 
        catch(err){
            return res.status(403).send('Not Authorized Must Be Logged In');
        }
   }
}

module.exports = {
    verifyToken
}