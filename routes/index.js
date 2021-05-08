const express = require('express');
const router = express.Router()
const controller = require('../controllers');
const db = require('../db')

router.get('/question', controller.questions.getQuestions);
router.get('/question/:question_id/answers', controller.answers.getAnswers);

router.post('/question', controller.questions.postQuestion);
router.post('/question/:question_id/answers', controller.answers.postAnswers);

router.put('/question/:question_id/helpful', controller.questions.questionHelpfulness);
router.put('/question/:question_id/report', controller.questions.questionReport);

router.put('/answer/:answer_id/helpful', controller.answers.answerHelpfulness);
router.put('/answer/:answer_id/report', controller.answers.answerReport);

module.exports = router