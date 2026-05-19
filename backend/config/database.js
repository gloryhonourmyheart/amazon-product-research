const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_TYPE === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || './database.sqlite',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    timezone: '+08:00'
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      timezone: '+08:00'
    }
  );
}

module.exports = sequelize;