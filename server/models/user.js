const { DataTypes } = require('sequelize');
const db = require ('../config/database');
const Departement = require('./departement');
const Sequelize = require('sequelize') ;

// define user model that is compatible with the database table 
const User = db.define('utilisateurs', {
 
 
  id_util: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_util: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  prenom_util: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  email_util: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mdp_util: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_departement: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model : Departement,
      key : "id_departement",
      targetKey: "id_departement"
    }
  },
  
  dernier_login_util: {
    type: DataTypes.DATE(6),
    allowNull: true
  },
  statut_util: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_ban_util: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  type_util: {
    type: Sequelize.ENUM('utilisateur', ' admin'),
    allowNull: false,
    defaultValue:'utilisateur'
  },
  role_util: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reset_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reset_token_expires: {
    type: DataTypes.DATE,
    allowNull: true
  }  , 
 id_super_util: {
    type: DataTypes.INTEGER,
    allowNull: true
   
  }
 ,
 
  
}

);

User.belongsTo(Departement , {foreignKey:'id_departement'})

module.exports = User;