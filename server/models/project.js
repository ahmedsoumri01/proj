const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');
 const Project = sequelize.define('Projet', {
    id_projet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom_projet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // add any other project fields here
  });
  
  module.exports = Project;