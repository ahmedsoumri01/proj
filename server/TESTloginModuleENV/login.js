require('dotenv').config();
const mysql = require("mysql");
  
// dotenv for data security 
 
/*const calling variables in .env file by process.env not direct access  */
 //connect to the database
const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
  }) 
 
  connection.connect((err) => {
    if (err) {
      console.error('error connexion to database ' + err.stack);
      return;
    }
    console.log('Connected successfully ' + connection.threadId);
  });
 
module.exports = connection;