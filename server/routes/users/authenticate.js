var express = require('express');
var router = express.Router();
let userController = require('../../controller/userController');
let profileController = require('../../controller/profileController');

module.exports = function(passport) {
    {/*router.post('/login',
        passport.authenticate('login', {
            session: false
        }), (req, res) => {
            res.send(req.user);
        }
    );

  /* Handle Registration POST  ', */}
    router.post('/signup',userController.signup);
    router.post('/login',userController.login);
    router.post('/logOut', userController.logOut);
    router.post('/updateProfile', profileController.updateProfile);
    return router;
}
