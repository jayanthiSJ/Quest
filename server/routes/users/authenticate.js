var express = require('express');
var jwt = require('jsonwebtoken');
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

   /* signup action */
    router.post('/signup',function(req,res,next){
      passport.authenticate('signup',function(err,newUser,info){
        if(newUser){
           return res.status(200).json({status:'Successfully registered'});
        }
        else if(err){
          return res.status(500).json({status: 'Signup failed'});
        }
        else{
          return res.status(500).json({status:'User exists'});
        }
      })(req,res,next);
    });

    /* signupFacebook action */
    router.post('/signupFacebook',passport.authenticate('signupFacebook',{
        successRedirect:'/home',
        failureRedirect:'/users/loginfailed',
    }));

    /*login action*/
    router.post('/login',function(req,res,next){
      passport.authenticate('login',function(err,user,info){
        console.log(user);
        if(user){
           var token = jwt.sign({user: user}, 'MyS3CR3T', {expiresIn: 7200});
           return res.status(200).json({user: user, token: token});
        }
        else{
          return res.status(500).json(err);
        }
      })(req,res,next);
    });

    /*logout action*/
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
