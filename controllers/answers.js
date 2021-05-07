const models = require('../models');

module.exports = {
  getAnswers: (req, res) => {
    models.answers.getAnswers(req.params, req.query)
      .then((data) => {
        res.status(200).send({
            'question': req.params['question_id'],
            'page': req.query['page'] || 1,
            'count': req.query['count'] || 5,
            'results': data.rows
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
}