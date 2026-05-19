const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WordBank = sequelize.define('WordBank', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  keyword: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'other'
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'word_bank',
  timestamps: true,
  createdAt: 'added_at',
  updatedAt: 'updated_at'
});

module.exports = WordBank;