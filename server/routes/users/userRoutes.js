var express = require('express');
var router = express.Router();
let dataController = require('../../controller/dataController');
router.post('/question', dataController.addQuestion);
router.post('/answer/:questionid', dataController.addAnswer);
router.get('/answer/:questionid', dataController.getAnswer);
router.get('/question/:name', dataController.getQuestions);
router.post('/search', dataController.getSearch);
router.post('/followQuestion/:questionid', dataController.addFollow);
router.post('/unFollowQuestion/:questionid', dataController.unFollow);
router.post('/answerLikes/:answerid', dataController.answerLikes);
router.post('/answerDislikes/:answerid', dataController.answerDislikes);

module.exports = router;
