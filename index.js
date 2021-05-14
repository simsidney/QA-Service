const fastify = require('fastify')({
  logger: true
})
const newrelic = require('newrelic')
const controller = require('./controllers');

fastify.register(require('fastify-cors'), (instance) => (req, callback) => {
  let corsOptions;
  corsOptions = { origin: true }
  callback(null, corsOptions)
})

fastify.get('/qa/question', controller.questions.getQuestions);
fastify.get('/qa/question/:question_id/answers', controller.answers.getAnswers);
fastify.post('/qa/question', controller.questions.postQuestion)
fastify.post('/qa/question/:question_id/answers', controller.answers.postAnswers);
fastify.put('/qa/question/:question_id/helpful', controller.questions.questionHelpfulness);
fastify.put('/qa/question/:question_id/report', controller.questions.questionReport);
fastify.put('/qa/answer/:answer_id/helpful', controller.answers.answerHelpfulness);
fastify.put('/qa/answer/:answer_id/report', controller.answers.answerReport);


fastify.get('/loaderio-3aaffa4a945924ae072583b47170f92b.txt', (req, res) => {
  res.status(200).send('loaderio-3aaffa4a945924ae072583b47170f92b')
})


const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log(err)
    process.exit(1)
  }
}

start()