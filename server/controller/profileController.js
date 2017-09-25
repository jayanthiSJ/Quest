let driver = require('../config/neo4j');
let session = driver.session();
module.exports={
updateProfile: function (req, res) {
        console.log('update');

        // let username = '';
        // let data = JSON.parse(req.body.data1);
        // console.log(JSON.parse(req.body.data1));
        // User.findOne({
        //     email: req.params.emails
        // }, function(err, user) {
        //     username = user.name;
        // })
        // UserProfile.findOne({
        //     'emailId': req.params.emails
        // }, function(err, userProfile) {
        //     if (err) {
        //         res.send(err);
        //     } else {
        //         console.log(req.body.country);
        //         userProfile.profile.dob = data.dateofbirth;
        //         userProfile.profile.gender = data.gender;
        //         userProfile.profile.country = req.body.country;
        //         userProfile.profile.name = username;
        //         userProfile.save(function() {
        //             if (err) {
        //                 console.log("error occured in update")
        //             }
        //             console.log(userProfile.profile.dob);
        //             res.cookie('email', req.params.emails);
        //             res.send('Profile updaed successfully');
        //         });
        //     }
        // });
    },
  };
