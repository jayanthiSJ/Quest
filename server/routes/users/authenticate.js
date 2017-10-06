var express = require('express');
var router = express.Router();
let profileController = require('../../controller/profileController');
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

   {/*} router.post('/signup', function(req, res, next) {
    passport.authenticate('signup', function(err, newUser, info){
      if(err) return res.status(500).json({status: 'signup failed'});
      else if(newUser) return res.status(200).json({status:'signup success'});
      else return res.status(500).json({status:'username already exsist'});
    })(req,res,next);
  });*/}


   /* signup action */
    router.post('/signup',function(req,res,next){
      passport.authenticate('signup',function(err,newUser,info){
        if(newUser){
          res.send("Successfully registered");
        }
        else if(err){
          res.send(err);
        }
        else{
          res.send("User exists");
        }
      })(req,res,next);
    });
    router.get('/signupFacebook', passport.authenticate('facebook',{
      session: false,
      scope: 'email'
  }), (req, res) => {
    console.log('inside sign up fb auth');
      res.json(req.user);
  });
    // handle the callback after facebook has authenticated the user
    router.get('/signupFacebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/#/'}), (req, res) => {
        // res.cookie('token', req.user.facebook.token);
        // res.cookie('authType', req.user.facebook.authType);
        console.log("facebook");
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
    // router.post('/auth/facebook/callback',passport.authenticate('signupFacebook',{
    //     successRedirect:'/home',
    //     failureRedirect:'/users/loginfailed',
    // }));
    router.post('/login',passport.authenticate('login',{
        successRedirect:'/home',
        failureRedirect:'/users/loginfailed',
    }));
    router.get('/logOut',function(request, response) {
     console.log("in logout");
     request.session.destroy(function(req,res,err) {
       if(err) {
        console.log("status of error in logout" + err);
         response.status(500).json({status: 'error in logout'});
       } else {
         console.log("success in logout");
         response.status(200).json({status:'success'});
       }
     });
   });
    router.post('/updateProfile', profileController.updateProfile);
    return router;
}
