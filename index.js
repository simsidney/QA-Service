const express = require('express');
const app = express()
const newrelic = require('newrelic')
const bodyParser = require('body-parser');
const router = require('./routes/index.js')
// const db = require('./db')
// const MongoClient = require('mongodb' ).MongoClient
const port = 33212;


// MongoClient.connect('mongodb://localhost:27017/finalQA', (err, db) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('Successfully connected to MongoDB')
//   }
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/qa', router);

app.listen(port, () => console.log(`Listening on localhost:${port}`));