const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  store_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(500)
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2)
  },
  review_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  product_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'stores',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Store;