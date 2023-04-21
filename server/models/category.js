const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Priority = require('./priority')
const Departement = require('./departement')
 
  const Category = sequelize.define('categorie', {
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom_categorie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_priorite : {

   type: DataTypes.INTEGER ,
   allowNull : false,
   references :{
    model : Priority ,
    key : "id_priorite"
   }
  },
   id_departement: {

    type: DataTypes.INTEGER ,
    allowNull : false,
    references :{
     model : Departement ,
     key : "id_departement"
    }
 

  }
      
   
   
  });

  Category.belongsTo(Priority , {foreignKey : 'id_priorite'})
  Category.belongsTo(Departement , {foreignKey : 'id_departement'})

  module.exports = Category; 