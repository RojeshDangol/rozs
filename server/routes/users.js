var express = require('express');
var router = express.Router();
var controller = require('../controller/user.ctrl');
var authVerify = require('../middleware/verifyToken.mw');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', controller.register); 
router.post('/login', controller.login);
router.get('/profile',authVerify.verifyToken, controller.profile);



module.exports = router;
