const express = require('express');
const app = express()
const newrelic = require('newrelic')
const bodyParser = require('body-parser');
const router = require('./routes/index.js')
const port = 33212;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/qa', router);

app.listen(port, () => console.log(`Listening on localhost:${port}`));