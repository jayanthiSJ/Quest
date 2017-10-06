var express = require('express');
var router = express.Router();
var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
};
module.exports = function(passport) {
    //router.get('/facebook', passportFacebook.authenticate('facebook'), (req, res) => {
    //  console.log("hiiii");
      //  res.json(req.user);
  //  });
    // handle the callback after facebook has authenticated the user
    router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/#/'}), (req, res) => {
        // res.cookie('token', req.user.facebook.token);
        // res.cookie('authType', req.user.facebook.authType);
        res.cookie('username', req.user.facebook.displayName);
        // res.cookie('profilepicture', req.user.facebook.photos);
        res.cookie('email', req.user.facebook.email);
        // RegisteredUser.update({
        //     'facebook.email': req.user.facebook.email
        // }, {
        //     $set: {
        //         'local.loggedinStatus': true
        //     }
        // }, function(error) {
        //     if (error) {
        //         logger.debug('status not updated');
        //     } else {
        //         logger.debug('LoginStatus updated Successfully');
        //     }
        // });
        res.redirect('/');
    });
      return router;
}
