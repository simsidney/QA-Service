const express = require('express');
const db = require('./db')
const app = express()
const bodyParser = require('body-parser');
const router = require('../routes/index.js')
const port = 33212;
