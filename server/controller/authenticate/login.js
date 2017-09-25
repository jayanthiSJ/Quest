var LocalStrategy = require('passport-local').Strategy;
var User = require('./../../models/signup');


module.exports = function(passport) {

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {
            console.log("in login.js:  " + username + "====" + password);

            // check in mongo if a user with username exists or not
            User.findOne({
                    'email': username
                },

                function(err, user) {
                    console.log(user)
                        // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User Not Found with the given username ' + username);
                        return done(null, false);
                    }
                    // User exists but wrong password, log the error
                    if (!validPassword(user, password)) {
                        console.log('Invalid Password !!!!');
                        return done(null, false); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    console.log("login check success");
                   
                    return done(null, user);
                }
            );
        }));

    var validPassword = function(user, password) {
        console.log("user.password: == " + user.password + "+++password-==" + password);
        return password == user.password;
    }
}
