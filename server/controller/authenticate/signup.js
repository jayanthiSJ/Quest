var LocalStrategy   = require('passport-local').Strategy;
var User = require('./../../models/signup');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
           console.log("reqst" +req.body.username);
            findOrCreateUser = function(){
              
                // find a user in Mongo with provided username
                User.findOne({ 'email' :  username }, function(err, user) {
                  
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                  
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false);
                    } else {
                      
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.firstname = req.body.firstname,
                        newUser.lastname = req.body.lastname,
                        newUser.password = password;
                        newUser.email = username;

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in saving user in the database: '+err);
                                throw err;
                            }
                            console.log('New user registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };
      
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}

