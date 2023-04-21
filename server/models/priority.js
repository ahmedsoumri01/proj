const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');

 
  const Priority = sequelize.define('priorite', {
    id_priorite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom_priorite: {
      type: DataTypes.STRING,
      allowNull: false
    },

      
   
   
  });

  module.exports = Priority;