const usersModel = require('../models/signup');
let driver = require('../config/neo4j');
//const logger = require('./../../systemAppLogger');
let profile = {
  viewProfile: function(req, res) {
  //     if(req.body.userType == "User"){
  //   logger.info(req.body.userType+" - "+req.body.userName+" - select - profile");
  // }
        console.log("getalldata:",req.body.picture);
        usersModel.find({username:req.body.name},(function(err, profile) {
            if (err) {
                res.send(err);
                //console.log(err);
            } else {
                // send the datas of user
                console.log("data from db",profile);
                // $set: {
                //     pic: req.body.picture
                // }
                res.json(profile);
            }
        })
    )
    },
    changeProfilePicture: function(req, res) {
  console.log("changeProfilePicture success");
    console.log("pic name:"+req.body.picture);
        usersModel.update({
          username: req.body.name
        }, {
            $set: {
                picture: req.body.picture

            }

        }, function(err) {
            if (err) {
                res.send('Error:' + err);
            }else {
            res.send('Updated userinfo successfully');
          }
        });

    },

  };
  module.exports = profile;
