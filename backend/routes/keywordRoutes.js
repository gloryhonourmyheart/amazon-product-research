const express = require('express');
const router = express.Router();
const KeywordController = require('../controllers/KeywordController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/keywords:
 *   get:
 *     summary: 获取关键词列表
 *     tags: [Keywords]
 *     parameters:
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
 *         description: 成功获取关键词列表
 */
router.get('/', KeywordController.getAllKeywords);

/**
 * @swagger
 * /api/keywords/search:
 *   post:
 *     summary: 关键词挖掘
 *     tags: [Keywords]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyword:
 *                 type: string
 *                 required: true
 *               count:
 *                 type: integer
 *                 default: 50
 *     responses:
 *       200:
 *         description: 关键词挖掘成功
 */
router.post('/search', auth, KeywordController.searchKeywords);

/**
 * @swagger
 * /api/keywords/reverse:
 *   post:
 *     summary: ASIN反查关键词
 *     tags: [Keywords]
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
 *         description: 反查成功
 */
router.post('/reverse', auth, KeywordController.reverseAsin);

/**
 * @swagger
 * /api/keywords/compare:
 *   post:
 *     summary: 对比多个ASIN的关键词
 *     tags: [Keywords]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               asins:
 *                 type: array
 *                 items:
 *                   type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: 对比成功
 */
router.post('/compare', auth, KeywordController.compareAsins);

/**
 * @swagger
 * /api/keywords/{id}:
 *   delete:
 *     summary: 删除关键词
 *     tags: [Keywords]
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
router.delete('/:id', auth, KeywordController.deleteKeyword);

module.exports = router;