const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user')

const Notification = sequelize.define('notification', {
    id_notif: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    message_notif:{
      type: DataTypes.STRING,
      allowNull: false
    },
    ouvert: {
      type: DataTypes.BOOLEAN,
      allowNull: false 
    },
    id_util: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: User,
        key: 'id_util'
      }
    }

  });
  
  // Add reference keys

  Notification.belongsTo(User, { foreignKey: 'id_util' });
  
  module.exports = Notification;

