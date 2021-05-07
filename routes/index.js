const express = require('express');
const router = express.Router()
const controller = require('../controllers');
const db = require('../db')

router.get('/questions', controller.questions.getQuestions);
router.get('/questions/:question_id/answers', controller.answers.getAnswers);

router.post('/questions', controller.questions.postQuestion);
router.post('/questions/:question_id/answers', controller.answers.postAnswers);

// router.put('/questions/:question_id/helpful', controller.questions.questionHelpfulness);
// router.put('/questions/:question_id/report', controller.questions.questionReport);

// router.put('/answers/:answer_id/helpful', controller.answers.answerHelpfulness);
// router.put('/answers/:answer_id/report', controller.answers.answerReport);

module.exports = router