const nconf = require('nconf');
const mysql = require("mysql");
 
 
// Load configuration values from command line arguments, environment variables, and a config file
nconf.argv().env().file({ file: 'config.json' });
//data loaded with nconf.get
const database = nconf.get('database');
const username = nconf.get('username');
const password = nconf.get('password');

//  connect to the database
const connection = mysql.createConnection({
  host: database.host,
  user: username,
  password: password,
  database: database.name
});
//verif cnx 
connection.connect((err) => {
  if (err) throw err;
  console.log('Successfully connected to the database!' + connection.threadId);
});

//make values and functions defined indatabse available to use in other files. 
//The value assigned to module.exports becomes the exported value of the module.

module.exports = connection;
