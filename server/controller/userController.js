
// let loginschema = require('../models/signup');
// let authenuser = {};
// module.exports = {
//     signup: function(req, res) {
//         {/*console.log("hi");
//         var newUser = {
//             // set the user's local credentials
//             firstname: req.body.firstname,
//             lastname: req.body.lastname,
//             password: req.body.password,
//             email: req.body.email
//         }
//             loginschema.findOne({
//             email: newUser.email
//         }, function(err, data) {
//             if (data == null) {
//                 var db = new loginschema(newUser);
//                 db.save().then((doc) => {
//                     res.send(doc);
//                 }, (err) => {
//                     res.send(err);
//                 });
//             } else {
//                 res.send('User Exists');
//             }
//         });*/}
//     },
//     login: function(req, res) {
//         console.log(req.body.email);
//         loginschema.findOne({
//         email: req.body.email
//         }, function(err, data) {
//           console.log("data: "+ JSON.stringify(data));
//         if (data != null) {
//             if(data.password == req.body.password) {
//               res.json(data);
//             }
//             else{
//                 res.status(400).send('Invalid credentials');
//             }
//         }
//         else if(err){
//           res.send(err);
//         }
//         else {
//           res.status(400).send('User doesnt exits!!!');
//         }
//     });
//    },
//
//
//     updateProfile:function(req,res){
//       console.log("hi");
//     },
//     logOut:function(req,res){
//       console.log("hi");
//
//     },
// };
