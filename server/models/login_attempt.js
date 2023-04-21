const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = require('./user');
const Login_attempt = db.define('login_tentatif', {
  id_login_tent: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  id_util: {
    type: DataTypes.INTEGER,
    allowNull: false ,
    references: {
      model: User,
      key: 'id_util'
    }
  },
  
  temps_login_tent: {
    type: DataTypes.DATE,
    allowNull: true
  }
} 

);

Login_attempt.belongsTo(User, { foreignKey: 'id_util' });

module.exports = Login_attempt;

