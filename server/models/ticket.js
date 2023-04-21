const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sequelize = require('sequelize') 

const User = require ('./user') ;
const Category = require ('./category') ;
const Project = require ('./project') ;
const Departement = require('./departement')

const Ticket = sequelize.define('ticket', {
    id_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    id_initiateur_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false , 
      references: {
        model: User,
        key: 'id_util'
      }
    },
    id_validateur_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: User,
        key: 'id_util'
      }
    },
    id_superviseur_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: User,
        key: 'id_util'
      }
    },
   

    
      id_departement: {
        type: DataTypes.INTEGER,
        allowNull: false ,
        references:{
          model : Departement,
          key : "id_departement"
        }
      },
      id_projet: {
        type: DataTypes.INTEGER,
        allowNull:false ,
        references:{
          model : Project,
          key : "id_projet"
        }
      },
      id_categorie: {
        type: DataTypes.INTEGER,
        allowNull: false ,
        references:{
          model : Category,
          key : "id_categorie"
        }
      },
    

   
    date_cloture_ticket: {
      type: DataTypes.DATE,
      allowNull: true
    },
    statut_ticket: {
      type: Sequelize.ENUM('En attente', 'En Cours', 'Resolu' , 'Annulé'),
      allowNull: false,
      defaultValue: 'En attente'
    },
    date_creation_ticket: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }

  });
  
  // Add reference keys
  Ticket.belongsTo(User, { foreignKey: 'id_initiateur_ticket' });
  Ticket.belongsTo(User, { foreignKey: 'id_validateur_ticket' });
  Ticket.belongsTo(User, { foreignKey: 'id_superviseur_ticket' });
  Ticket.belongsTo(Departement , {foreignKey:'id_departement'})
  Ticket.belongsTo(Category , {foreignKey:'id_categorie'})
  Ticket.belongsTo(Project , {foreignKey:'id_projet'})
  module.exports = Ticket;

