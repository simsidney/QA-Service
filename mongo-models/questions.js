const MongoClient = require('mongodb').MongoClient

var qaService;
MongoClient.connect('mongodb://localhost:27017/finalQA', (err, db) => {
  if (err) {
    console.log(err)
  } else {
    qaService = db.db("qaService")
    qaIndex = db.db("indices")
  }
})

module.exports = {
  getQuestions: ({product_id, page = 1, count = 5}) => {
      var query = {product_id: parseInt(product_id)}
      return qaService.collection("finalQA").find(query).toArray()

      .then((result) => {
        return result[0]

      })
      .catch((err) => {
        console.log(err)
      })
  },

  postQuestion: ({product_id, name, email, body}, date) => {
    var nextQuestion;
    var todayDate = new Date().toISOString().slice(0, 10);
    return qaService.collection("indices").find({}).toArray()
    .then ((result) => {
      nextQuestion = result[0].questionIndex + 1
      var query = {product_id: parseInt(product_id)}
      return qaService.collection("finalQA").update(query,
        {$push: { "results":
          {
            "question_id": nextQuestion,
            "question_body": body,
            "question_date": todayDate,
            "asker_name": name,
            "asker_email": email,
            "question_reported": 0,
            "question_helpful": 0,
            "answers": []
          }
      }})
    })
    .then ((data) => {
      return data
    })
    .catch ((err) => {
      console.log(err)
    });
  },

  questionHelpfulness: ({ question_id }) => {
    var query = {"results.question_id": parseInt(question_id)}
    return qaService.collection("finalQA").update(query,
      {
        $inc: { "results.$.question_helpful": 1},
      })

    .then((result) => {
      return result.result

    })
    .catch((err) => {
      console.log(err)
    })
  },

  questionReport: ({ question_id }) => {
    var query = {"results.question_id": parseInt(question_id)}
    return qaService.collection("finalQA").update(query,
      {
        $set: { "results.$.question_reported": 1}
      })

    .then((result) => {
      return result.result

    })
    .catch((err) => {
      console.log(err)
    })
  }

}

// module.exports = {
//   getQuestions: ({product_id, page = 1, count = 5}) => {
//     let query = finalQA.find({ product_id, reported: false });

//     query.limit(count)
//     query.sort({ helpfulness: -1 })

//     query.exec((err, questions) => {
//       if (err) {
//         console.log (err)
//       } else {
//         console.log(questions)
//       }
//     })
//   }
// }