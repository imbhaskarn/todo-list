require('dotenv').config()
const mysql = require("mysql2");
const dbconfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: 'todos'
};

let conn = mysql.createConnection(dbconfig);

conn.connect((err) => {
  if (err) {
    return console.log(err)
  }
  return console.log('connected to database!')
})


module.exports = conn