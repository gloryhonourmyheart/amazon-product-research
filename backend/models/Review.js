const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  asin: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  date: {
    type: DataTypes.DATE
  },
  variant: {
    type: DataTypes.STRING(100)
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  helpful: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sentiment: {
    type: DataTypes.STRING(20),
    defaultValue: 'neutral'
  }
}, {
  tableName: 'reviews',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Review;