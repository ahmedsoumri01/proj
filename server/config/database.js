//dotenv import and calls config() method to load environment variables from .env file.
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql" ,
        define: {
          //do not add two columns updatedAt , createdAt  auto
          timestamps: false,
          //to prevent sequelize from making table names plural 
          freezeTableName: true
        }
       
    }

   
);
//test 
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = db;