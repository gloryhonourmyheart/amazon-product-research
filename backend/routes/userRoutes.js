const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: 用户注册
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: 注册成功
 *       400:
 *         description: 用户名或邮箱已存在
 */
router.post('/register', UserController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 用户登录
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: 登录成功
 *       401:
 *         description: 邮箱或密码错误
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: 获取用户信息
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功获取用户信息
 */
router.get('/profile', auth, UserController.getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: 更新用户信息
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 更新成功
 */
router.put('/profile', auth, UserController.updateProfile);

/**
 * @swagger
 * /api/users/change-password:
 *   post:
 *     summary: 修改密码
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 required: true
 *               newPassword:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: 密码修改成功
 */
router.post('/change-password', auth, UserController.changePassword);

module.exports = router;