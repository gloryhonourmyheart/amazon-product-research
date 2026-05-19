const sequelize = require('./config/database');
const Product = require('./models/Product');
const Keyword = require('./models/Keyword');
const Review = require('./models/Review');
const User = require('./models/User');
const Competitor = require('./models/Competitor');
const Store = require('./models/Store');
const WordBank = require('./models/WordBank');
const { products, keywords, reviews, stores } = require('../data/mockData');

async function initializeDatabase() {
  try {
    console.log('正在连接数据库...');
    await sequelize.authenticate();
    console.log('数据库连接成功');

    console.log('正在创建数据表...');
    await sequelize.sync({ force: true });
    console.log('数据表创建成功');

    console.log('正在导入Mock数据...');
    
    await Product.bulkCreate(products);
    console.log('产品数据导入完成');

    await Keyword.bulkCreate(keywords);
    console.log('关键词数据导入完成');

    await Review.bulkCreate(reviews);
    console.log('评论数据导入完成');

    await Store.bulkCreate(stores.map(s => ({ ...s, user_id: 1 })));
    console.log('店铺数据导入完成');

    console.log('数据库初始化完成！');
    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

initializeDatabase();