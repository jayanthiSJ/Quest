const usersModel = require('../models/signup');
let driver = require('../config/neo4j');
//const logger = require('./../../systemAppLogger');
let profile = {
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
