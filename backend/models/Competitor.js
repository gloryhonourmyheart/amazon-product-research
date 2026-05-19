const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Competitor = sequelize.define('Competitor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  asin: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DECIMAL(10, 2)
  },
  sales: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2)
  },
  reviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  bsr: {
    type: DataTypes.INTEGER
  },
  variant_count: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'competitors',
  timestamps: true,
  createdAt: 'added_at',
  updatedAt: 'updated_at'
});

module.exports = Competitor;