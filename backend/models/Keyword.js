const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Keyword = sequelize.define('Keyword', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  keyword: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  search_volume: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  competition: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  conversion_rate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  trend: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  asin: {
    type: DataTypes.STRING(10)
  },
  rank: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'keywords',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Keyword;