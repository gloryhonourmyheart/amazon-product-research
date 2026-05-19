const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  asin: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING(100)
  },
  category: {
    type: DataTypes.STRING(200)
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
  growth_rate: {
    type: DataTypes.DECIMAL(5, 2)
  },
  launch_date: {
    type: DataTypes.DATE
  },
  fba_fee: {
    type: DataTypes.DECIMAL(10, 2)
  },
  image: {
    type: DataTypes.STRING(500)
  },
  url: {
    type: DataTypes.STRING(500)
  }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Product;