var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../../models/signup');
var driver = require('../../config/neo4j.js');
var session = driver.session();

module.exports = function(passport){
    passport.use('signup', new LocalStrategy({
        passReqToCallback:true
    },
    function(req, username, password, done,res){
        UserModel.findOne({'username':username},function(err,user){
            if(err){
                return done(err);
            }
            // user already exsist
            if(user){
                return done(null,false);
            } else {
                var newUser = new UserModel();
                //set the user's credentials
                newUser.firstname = req.body.firstname;
				newUser.lastname = req.body.lastname;
                newUser.password = password;
                newUser.username = username;
                //saving into databases
                newUser.save(function(err,user){
                    if(err){
                        return done(err);
                    }
                    let query = `CREATE (a:User { name: "${username}"}) RETURN a`;
                    session.run(query).then(function(result){
                        return done(null, newUser);
                    });

                });


            }

        });
    })
    );
}
