const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user') ;
const Sequelize = require('sequelize')  
 
  const Departement = sequelize.define('departement', {
    id_departement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
   nom_departement: {
      type: Sequelize.ENUM('IT', 'recherche et developement', 'systeme information' , 'HR'),
      allowNull: false,
      defaultValue: 'IT'
     
    },
    id_responsable_departement: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },


      
   
   
  });
  module.exports = Departement; 