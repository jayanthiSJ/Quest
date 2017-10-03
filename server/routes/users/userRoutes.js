var express = require('express');
var router = express.Router();
let dataController = require('../../controller/dataController');
router.post('/question', dataController.addQuestion);
router.get('/answer/:questionid', dataController.getAnswer);
router.get('/question/:name', dataController.getQuestions);
router.post('/search', dataController.getSearch);
router.post('/followQuestion/:questionid', dataController.addFollow);

module.exports = router;
