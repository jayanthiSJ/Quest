const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('../../config/auth');
// load up the user model
var User = require('../../models/signup');
module.exports = function(passport) {
  console.log('inside facebook passport');
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    let fbStrategy = configAuth.facebook;
    String.prototype.capitalize = function() {
       return this.replace(/ ( ^|\s)([a-z])/g,
       function(m, p1, p2) { return p1 + p2.toUpperCase(); });
      };
    fbStrategy.passReqToCallback = true;
    // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
      function(req, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {
              return done(null, req.user);
                // User.findOne({
                //     'facebook.id': profile.id
                // }, function(err, user) {
                //     if (user) {
                //         /* if there is a user id already but no token
                //         (user was linked at one point and then removed) */
                //         if (!user.facebook.token) {
                //           user.facebook.token = token;
                //             user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                //             user.facebook.displayName = profile.displayName.toLowerCase().capitalize();
                //             user.facebook.photos = profile.photos[0].value;
                //             user.facebook.authType = 'facebook';
                //             user.save(function(error) {
                //                 if (error) {
                //                     return done(err);
                //                   }
                //                 return done(null, user);
                //             });
                //         }
                //         return done(null, user);
                //         // user found, return that user
                //     } else {
                //         // if there is no user, create them
                //         let newUser = new User();
                //         newUser.facebook.id = profile.id;
                //         newUser.facebook.token = token;
                //         newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                //         newUser.facebook.displayName = profile.displayName.toLowerCase().capitalize();
                //           newUser.facebook.photos = profile.photos[0].value;
                //           newUser.facebook.authType = 'facebook';
                //         newUser.save(function(error) {
                //             if (error) {
                //                 return done(error);
                //               }
                //             return done(null, newUser);
                //         });
                //     }
                //     return done(null, user);
                // });
            } else {
                // user already exists and is logged in, we have to link accounts
                let user = req.user;
                // pull the user out of the session
                // user.facebook.id = profile.id;
                // user.facebook.token = token;
                //   user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                //   user.facebook.displayName = (profile.displayName).toLowerCase().capitalize();
                //   user.facebook.photos = profile.photos[0].value;
                //   user.facebook.authType = 'facebook';
                // user.save(function(err) {
                //     if (err) {
                //         return done(err);
                //       }
                //     return done(null, user);
                // });
                  return done(null, user);
            }
        });
    }));
//     passport.use('signupFacebook',new FacebookStrategy({
//     clientID: configAuth.facebook.clientID,
//     clientSecret: configAuth.facebook.clientSecret,
//     callbackURL: configAuth.facebook.callbackURL,
//     profileFields: ['id', 'name', 'username','email']
//   },
//   function(profile, done) {
//       console.log("llll");
//         process.nextTick(function(){
//             User.findOne({'facebook.id': profile.id}, function(err, user){
//                 if(err)
//                     return done(err);
//                 if(user)
//                     return done(null, user);
//                 else {
//                     var newUser = new User();
//                     newUser.facebook.id = profile.id;
//                     newUser.facebook.name = profile.name;
//                     newUser.facebook.username = profile.displayName;
//                     newUser.facebook.email = profile.email[0].value;
//
//                     newUser.save(function(err){
//                         if(err)
//                             throw err;
//                         return done(null, newUser);
//                     })
//                     console.log(profile);
//                 }
//             });
//         });
//     }
//
// ));
};
