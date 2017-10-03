{/*var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./../../config/facebookAuth.js');
var UserModel = require('../../models/signup');

let log4js = require('log4js');
let logger = log4js.getLogger();
// =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    let fbStrategy = configAuth.FACEBOOK;
    String.prototype.capitalize = function() {
       return this.replace(/ ( ^|\s)([a-z])/g,
       function(m, p1, p2) { return p1 + p2.toUpperCase(); });
      };
    fbStrategy.passReqToCallback = true;
    // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
      function(req, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {
                UserModel.findOne({
                    'facebook.id': profile.id
                }, function(err, user) {
   // @Mayanka: Check if user has been abusive and redirect
                  if(user != null){

				                if(user.abusecount == 4)  {
                          return done(returnAbuseResponse());
                        }
                }
                  else  if (err) {
                        return done(err);}
                    if (user) {
                        /* if there is a user id already but no token
                        (user was linked at one point and then removed) 
                        // if (!user.facebook.token) {
                        //   //user.facebook.token = token;
                        //     user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                        //     user.facebook.displayName = profile.displayName.toLowerCase().capitalize();
                        //     user.facebook.photos = profile.photos[0].value;
                        //     //user.facebook.authType = 'facebook';
                        //     user.save(function(error) {
                        //         if (error) {
                        //             return done(err);
                        //           }
                        //         return done(null, user);
                        //     });
                        user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                        user.facebook.displayName = profile.displayName.toLowerCase().capitalize();
                        user.facebook.photos = profile.photos[0].value;
                        user.save(function(error) {
                        if (error) {
                            return done(err);
                        }
                          return done(null, user);
                        });
                        return done(null, user);
                        // user found, return that user
                    } else {
                        // if there is no user, create them
                        let newUser = new User();
                        newUser.facebook.id = profile.id;
                        //newUser.facebook.token = token;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                        newUser.facebook.displayName = profile.displayName.toLowerCase().capitalize();
                          newUser.facebook.photos = profile.photos[0].value;
                          //newUser.facebook.authType = 'facebook';
                        newUser.save(function(error) {
                            if (error) {
                                return done(error);
                              }
                            return done(null, newUser);
                        });
                    }
                    return done(null, user);
                });
            } else {
                // user already exists and is logged in, we have to link accounts
                let user = req.user;
                // pull the user out of the session
                user.facebook.id = profile.id;
                //user.facebook.token = token;
                  user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                  user.facebook.displayName = (profile.displayName).toLowerCase().capitalize();
                  user.facebook.photos = profile.photos[0].value;
                  //user.facebook.authType = 'facebook';
                user.save(function(err) {
                    if (err) {
                        return done(err);
                      }
                    return done(null, user);
                });
            }
        });
    }));
module.exports = {fbStrategy};*/}
