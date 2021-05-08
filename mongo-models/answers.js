const MongoClient = require('mongodb').MongoClient


//Need to figure out how to limit the number of answers based on the count
module.exports = {
  getAnswers: ({question_id}, {page = 1, count = 5}) => {
      count = parseInt(count)
      return MongoClient.connect('mongodb://localhost:27017/finalQA')
      .then((db) => {
        console.log('Successfully connected to MongoDB')
        var qaService = db.db("qaService");
        var query = {question: parseInt(question_id)}
        return qaService.collection("question_id").find(query).limit(count).toArray()
        db.close();

      })
      .then((result) => {
        console.log(result[0].results)
        return result[0].results
      })
      .catch((err) => {
        console.log(err)
      })
  }
}