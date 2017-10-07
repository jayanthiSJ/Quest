var LocalStrategy = require('passport-local').Strategy;
var User = require('./../../models/signup');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({
                    'username': username
                },
                function(err, user) {
                        // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User Not Found with the given username ' + username);
                        user = 'No user';
                        return done(null,user );
                    }
                    // User exists but wrong password, log the error
                    if (!validPassword(user, password)) {
                        user =  'Invalid credentials';
                        return done(null,user); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );
        }));

    var validPassword = function(user, password) {
        return password == user.password;
    }
}
