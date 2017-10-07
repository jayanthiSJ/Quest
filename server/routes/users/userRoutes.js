var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
let dataController = require('../../controller/dataController');
router.post('/search', dataController.getSearch);
router.post('/question', dataController.addQuestion);
router.post('/answer/:questionid', dataController.addAnswer);
router.get('/answer/:questionid', dataController.getAnswer);
router.get('/question/:name', dataController.getQuestions);
router.post('/followQuestion/:questionid', dataController.addFollow);

module.exports = router;
