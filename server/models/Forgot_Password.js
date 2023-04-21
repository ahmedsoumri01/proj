const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Forgot_Password = sequelize.define('mdp_oublie', {
  id_mdp_oublie: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  email_mdp_oublie: {
    type: DataTypes.STRING,
    allowNull: false},
  
  date_mdp_oublie: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = Forgot_Password;