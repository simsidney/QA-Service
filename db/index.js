const { Pool } = require('pg');
const { host, user, database, password, port } = require('../config.js')

const pool = new Pool ({
  host,
  user,
  database,
  password,
  port
})

module.exports = {pool}