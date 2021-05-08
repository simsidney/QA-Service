const MongoClient = require('mongodb').MongoClient

module.exports = {
  getQuestions: ({product_id, page = 1, count = 5}) => {
      return MongoClient.connect('mongodb://localhost:27017/finalQA')
      .then((db) => {
        console.log('Successfully connected to MongoDB')
        var qaService = db.db("qaService");
        var query = {product_id: parseInt(product_id)}
        return qaService.collection("finalQA").find(query).toArray()
        db.close();

      })
      .then((result) => {
        return result[0]
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