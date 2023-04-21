
const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require("./category")
 
  const SubCategory = sequelize.define('sous_categorie', {
    id_sous_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true
    },
    nom_sous_categorie: {
      type: DataTypes.STRING,
      allowNull: false
    },

    id_categorie: {
        type: DataTypes.INTEGER,
        allowNull: false , 
        references: {
            model: Category,
            key: 'id_categorie'
          }
      },
  

      
   
   
  });

  SubCategory.belongsTo(Category, { foreignKey: 'id_categorie' })
  module.exports = SubCategory;