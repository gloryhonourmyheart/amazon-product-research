const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const sequelize = require('./config/database');

const productRoutes = require('./routes/productRoutes');
const keywordRoutes = require('./routes/keywordRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const competitorRoutes = require('./routes/competitorRoutes');
const otherRoutes = require('./routes/otherRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '亚马逊选品工具 API',
      version: '1.0.0',
      description: '亚马逊选品工具后端API文档'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/products', productRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/competitors', competitorRoutes);
app.use('/api', otherRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: '亚马逊选品工具 API 运行中' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`API文档: http://localhost:${PORT}/api-docs`);
  });
}).catch(error => {
  console.error('数据库连接失败:', error);
});