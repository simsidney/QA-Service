const express = require('express');
const app = express()
const newrelic = require('newrelic')
const bodyParser = require('body-parser');
const router = require('./routes/index.js')
const cors = require('cors');
const port = 3000;

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/qa', router);

app.get('/loaderio-3aaffa4a945924ae072583b47170f92b.txt', (req, res) => {
  res.status(200).send('loaderio-3aaffa4a945924ae072583b47170f92b')
})

app.listen(port, () => console.log(`Listening on localhost:${port}`));