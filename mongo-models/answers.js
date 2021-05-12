// const MongoClient = require('mongodb').MongoClient

// var qaService;
// MongoClient.connect('mongodb://localhost:27017/finalQA', (err, db) => {
//   if (err) {
//     console.log(err)
//   } else {
//     qaService = db.db("qaService")
//     qaIndex = db.db("indices")
//   }
// })

// module.exports = {
//   getAnswers: ({question_id}, {page = 1, count = 5}) => {
//       var query = {"results.question_id": parseInt(question_id)}
//       return qaService.collection('finalQA').aggregate(
//         { "$match": { "$and": [{"results.question_id": parseInt(question_id)}]}},
//         { "$unwind": "$results" },
//         { "$unwind": "$results.answers"},
//         { "$unwind": "$results.answers.results"},
//         {"$replaceRoot": { "newRoot": "$results.answers.results" }},
//         {
//           $project: {
//             "_id": 0,
//             "results": "$results.answers.results",
//           }
//         },
//       ).toArray()

//       .then((result) => {
//         return result
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//     },

//     postAnswers: (params, {question_id, name, email, body, photos}, date) => {

//       var nextAnswer;
//       var todayDate = new Date().toISOString().slice(0, 10);
//       return qaService.collection("indices").find({}).toArray()
//       .then ((result) => {
//         nextAnswer = result[0].answerIndex + 1
//         nextPhoto = result[0].photoIndex
//         var test = []
//         photos.map((photo) => {
//           test.push({
//             "id": nextPhoto + 1,
//             "answer_id": nextAnswer,
//             "url": photo
//           })
//           nextPhoto++
//         })
//         var query = {"results.question_id": parseInt(question_id)}
//         return qaService.collection("finalQA").update(query,
//           {$push: { "results.$.answers.0.results":
//             {
//               "answer_id": nextAnswer,
//               "answer_body": body,
//               "answer_date": todayDate,
//               "answerer_name": name,
//               "answerer_email": email,
//               "answer_reported": 0,
//               "answer_helpful": 0,
//               "answer_photos": test
//             }
//         }})
//       })
//       .then ((data) => {
//         return data
//       })
//       .catch ((err) => {
//         console.log(err)
//       });
//     },

//     answerHelpfulness: ({ answer_id }) => {
//       var answerId = parseInt(answer_id);
//       var query = {"results.answers.results.answer_id": parseInt(answer_id)}
//       return qaService.collection("finalQA").update(query,
//         {$inc: { "results.$.answers.0.results.$[answer].answer_helpful": 1}},
//         { "arrayFilters": [{ "answer.answer_id": answerId }]}
//         )

//       .then((result) => {
//         return result.result

//       })
//       .catch((err) => {
//         console.log(err)
//       })
//     },

//     answerReport: ({ answer_id }) => {
//       var answerId = parseInt(answer_id);
//       var query = {"results.answers.results.answer_id": parseInt(answer_id)}
//       return qaService.collection("finalQA").update(query,
//         {$set: { "results.$.answers.0.results.$[answer].answer_reported": 1}},
//         { "arrayFilters": [{ "answer.answer_id": answerId }]}
//         )

//       .then((result) => {
//         return result.result

//       })
//       .catch((err) => {
//         console.log(err)
//       })
//     }
// }