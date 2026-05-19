const express = require('express');
const router = express.Router();
const CompetitorController = require('../controllers/CompetitorController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/competitors:
 *   get:
 *     summary: 获取竞品列表
 *     tags: [Competitors]
 *     security:
 *       - bearerAuth: []
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
 *         description: 成功获取竞品列表
 */
router.get('/', auth, CompetitorController.getCompetitors);

/**
 * @swagger
 * /api/competitors:
 *   post:
 *     summary: 添加竞品
 *     tags: [Competitors]
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
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: 添加成功
 */
router.post('/', auth, CompetitorController.addCompetitor);

/**
 * @swagger
 * /api/competitors/{id}:
 *   get:
 *     summary: 获取竞品详情
 *     tags: [Competitors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功获取详情
 */
router.get('/:id', auth, CompetitorController.getCompetitorById);

/**
 * @swagger
 * /api/competitors/{id}:
 *   delete:
 *     summary: 删除竞品
 *     tags: [Competitors]
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
router.delete('/:id', auth, CompetitorController.deleteCompetitor);

module.exports = router;