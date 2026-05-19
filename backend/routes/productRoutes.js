const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: 获取产品列表
 *     tags: [Products]
 *     parameters:
 *       - name: keyword
 *         in: query
 *         type: string
 *         description: 搜索关键词
 *       - name: page
 *         in: query
 *         type: integer
 *         default: 1
 *       - name: limit
 *         in: query
 *         type: integer
 *         default: 20
 *     responses:
 *       200:
 *         description: 成功获取产品列表
 */
router.get('/', ProductController.getAllProducts);

/**
 * @swagger
 * /api/products/{asin}:
 *   get:
 *     summary: 获取产品详情
 *     tags: [Products]
 *     parameters:
 *       - name: asin
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取产品详情
 *       404:
 *         description: 产品不存在
 */
router.get('/:asin', ProductController.getProductByAsin);

/**
 * @swagger
 * /api/products/search:
 *   post:
 *     summary: 搜索产品
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyword:
 *                 type: string
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               minRating:
 *                 type: number
 *               maxRating:
 *                 type: number
 *               minSales:
 *                 type: integer
 *               maxSales:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 搜索成功
 */
router.post('/search', ProductController.searchProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: 创建产品
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               asin:
 *                 type: string
 *               title:
 *                 type: string
 *               brand:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: 产品创建成功
 */
router.post('/', auth, ProductController.createProduct);

/**
 * @swagger
 * /api/products/{asin}:
 *   put:
 *     summary: 更新产品
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: asin
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               sales:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 产品更新成功
 */
router.put('/:asin', auth, ProductController.updateProduct);

/**
 * @swagger
 * /api/products/{asin}:
 *   delete:
 *     summary: 删除产品
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: asin
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 产品删除成功
 */
router.delete('/:asin', auth, ProductController.deleteProduct);

module.exports = router;