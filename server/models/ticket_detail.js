const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ticket = require ('./ticket') ;
const Sequelize = require('sequelize')
const SubCategory = require ('./subCategory') ;

 

const Ticket_Detail = sequelize.define('ticket_detail', {
    id_ticket_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    titre_ticket:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description_ticket:{
      type: DataTypes.STRING,
      allowNull: false
    },
   
  id_sous_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SubCategory,
        key: 'id_sous_categorie'
      }
    } ,

    id_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ticket',
        key: 'id_ticket'
      },
      onDelete: 'CASCADE'
    },
    
   
    deadline_ticket: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attachement_ticket: {
      type: Sequelize.STRING,
      allowNull: true
      
    }

  });
  
  // Add reference keys
  Ticket_Detail.belongsTo(Ticket, { foreignKey: 'id_ticket' });
  
  Ticket_Detail.belongsTo(SubCategory, { foreignKey: 'id_sous_categorie' });
 
  module.exports = Ticket_Detail;

