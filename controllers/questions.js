const models = require('../models');

module.exports = {
  getQuestions: (req, res) => {
    models.questions.getQuestions(req.query)
      .then((data) => {
        res.status(200).json({
          'product_id': req.query['product_id'],
          'results': data.rows
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send('Failed to retrieve questions')
      });
  },

  postQuestion: (req, res) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newDate = day + "/" + month + "/" + year;

    models.questions.postQuestion(req.body, newDate)
      .then((data) => {
        res.status(201).send('Successfully created a question')
      })
      .catch((err) => {
        res.status(400).send('Failed to create a question')
      });
  },

  questionHelpfulness: (req, res) => {
    models.questions.questionHelpfulness(req.params)
      .then(() => {
        res.status(204).send('Question marked as helpful')
      })
      .catch(() => {
        res.status(400).send('Failed to mark question as helpful')
      });
  },

  questionReport: (req, res) => {
    models.questions.questionReport(req.params)
      .then(() => {
        res.status(204).send('Question flagged for internal review')
      })
      .catch(() => {
        res.status(400).send('Failed to flag question for internal review')
      });
  }
}