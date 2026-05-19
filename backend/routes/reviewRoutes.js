const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/reviews/{asin}:
 *   get:
 *     summary: 获取产品评论
 *     tags: [Reviews]
 *     parameters:
 *       - name: asin
 *         in: path
 *         required: true
 *         type: string
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
 *         description: 成功获取评论列表
 */
router.get('/:asin', ReviewController.getReviewsByAsin);

/**
 * @swagger
 * /api/reviews/analyze:
 *   post:
 *     summary: 分析评论
 *     tags: [Reviews]
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
 *                 required: true
 *     responses:
 *       200:
 *         description: 分析成功
 */
router.post('/analyze', auth, ReviewController.analyzeReviews);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: 添加评论
 *     tags: [Reviews]
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
 *               rating:
 *                 type: integer
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *               verified:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: 评论添加成功
 */
router.post('/', auth, ReviewController.createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: 删除评论
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 删除成功
 */
router.delete('/:id', auth, ReviewController.deleteReview);

module.exports = router;