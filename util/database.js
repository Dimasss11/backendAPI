const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  //connectionLimit: 8,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
});

module.exports = pool.promise();