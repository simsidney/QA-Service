// const models = require('../models');
const mongoModels = require('../mongo-models')

module.exports = {
  // getAnswers: (req, res) => {
  //   mongo-models.allQA.getAnswers(req.params, req.query)
  //     .then((data) => {
  //       res.status(200).send({
  //           'question': req.params['question_id'],
  //           'page': req.query['page'] || 1,
  //           'count': req.query['count'] || 5,
  //           'results': data.rows
  //         })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       res.status(500).send('Could not retrieve answers')
  //     });
  // },

  getAnswers: (req, res) => {
    mongoModels.answers.getAnswers(req.params, req.query)
      .then((data) => {
        res.status(200).send({
            'question': req.params['question_id'],
            'page': req.query['page'] || 1,
            'count': req.query['count'] || 5,
            'results': data
          })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send('Could not retrieve answers')
      });
  },

  postAnswers: (req, res) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newDate = day + "/" + month + "/" + year;

    models.answers.postAnswers(req.params, req.body, newDate)
      .then((data) => {
        var rowName = data.rows[0]
        req.body.photos.map((photo) => {
          models.photos.postPhotos(rowName, photo)
        })
      })
      .then(() => {
        res.status(201).send('Answer added to db')
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send('Could not post answer')
      });
  },

  answerHelpfulness: (req, res) => {
    models.answers.answerHelpfulness(req.params)
      .then(() => {
        res.status(204).send('Answer marked as helpful')
      })
      .catch(() => {
        res.status(500).send('Failed to mark answer as helpful')
      });
  },

  answerReport: (req, res) => {
    models.answers.answerReport(req.params)
      .then(() => {
        res.status(204).send('Answer flagged for internal review')
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send('Failed to flag answer for internal review')
      });
  }
}