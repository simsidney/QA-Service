const models = require('../models');

module.exports = {
  getAnswers: async (req, res) => {
    const {rows} = await models.answers.getAnswers(req.params, req.query)
    return {
              'question': req.params['question_id'],
              'page': req.query['page'] || 1,
              'count': req.query['count'] || 5,
              'results': rows
            }
  },

  postAnswers: async (req, res) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newDate = day + "/" + month + "/" + year;

    const {rows} = await models.answers.postAnswers(req.params, req.body, newDate)
    var data;
    req.body.photos.map ((photo) => {
      data = models.photos.postPhotos(rows[0], photo)
    })
    return {rows, data}
  },

  answerHelpfulness: async (req, res) => {
    return models.answers.answerHelpfulness(req.params)
  },

  answerReport: async (req, res) => {
    return models.answers.answerReport(req.params)
  }
}