var express = require('express');
let multer = require('multer');
var jwt = require('jsonwebtoken');
var router = express.Router();
let dataController = require('../../controller/dataController');
let profileController = require('../../controller/profileController');
router.post('/search', dataController.getSearch);
router.post('/question', dataController.addQuestion);
router.post('/answer/:questionid', dataController.addAnswer);
router.get('/answer/:questionid', dataController.getAnswer);
router.get('/question/:name', dataController.getQuestions);
router.get('/followStatus',dataController.checkFollowStatus)
router.post('/followQuestion/:questionid', dataController.addFollow);
router.post('/unFollowQuestion/:questionid', dataController.unFollow);
router.post('/answerLikes/:answerid', dataController.answerLikes);
router.post('/answerDislikes/:answerid', dataController.answerDislikes);
router.post('/view', profileController.viewProfile);
router.post('/uploadImage', profileController.changeProfilePicture);
let imageArray = '';
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './client/images/')
  },
  filename: function (req, file, cb) {
    /*eslint-disable*/
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    /*eslint-enable*/
    imageArray = Date.now() + '-' + file.originalname;
    //let count=0;
    console.log("imgarr:"+imageArray);
    cb(null, imageArray);
  }
});
const upload = multer({ storage: storage });
router.post('/upload', upload.any('IMG'), function(req, res){
  let uploadedImages = imageArray;
  imageArray = '';
  console.log(uploadedImages);
  res.send(uploadedImages);
});
module.exports = router;
