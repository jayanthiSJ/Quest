var express = require('express');
var router = express.Router();
let dataController = require('../../controller/dataController');


    router.post('/question', dataController.addQuestion);
    router.post('/answer', dataController.addAnswer);
    router.get('/topquestions', dataController.getTopQuestions);
    router.get('/latestQuestions', dataController.getLatestQuestions);
    router.get('/topAnswered', dataController.getTopAnswered);
    router.get('/unanswered', dataController.getUnAnswered);
    router.get('/questions', dataController.getSearch);
    module.exports = router;
