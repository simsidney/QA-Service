const models = require('../models');

module.exports = {
  getQuestions: async (req, res) => {
    const {rows} = await models.questions.getQuestions(req.query)
    return {'product_id': req.query['product_id'],
            'results': rows};
  },

  postQuestion: async (req, res) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newDate = day + "/" + month + "/" + year;

    return await models.questions.postQuestion(req.body, newDate)
  },

  questionHelpfulness: async (req, res) => {
    return await models.questions.questionHelpfulness(req.params)
  },

  questionReport: async (req, res) => {
    return await models.questions.questionReport(req.params)
  }
}