const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }]
        }
      });
      
      if (existingUser) {
        return res.status(400).json({ success: false, message: '用户名或邮箱已存在' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });
      
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      
      res.status(201).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          token
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return res.status(401).json({ success: false, message: '邮箱或密码错误' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ success: false, message: '邮箱或密码错误' });
      }
      
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      
      res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          token
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'username', 'email', 'role', 'created_at']
      });
      
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { username, email } = req.body;
      
      const [updated] = await User.update(
        { username, email },
        { where: { id: req.user.id } }
      );
      
      if (updated === 0) {
        return res.status(404).json({ success: false, message: '用户不存在' });
      }
      
      const updatedUser = await User.findByPk(req.user.id, {
        attributes: ['id', 'username', 'email', 'role', 'created_at']
      });
      
      res.json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      
      const user = await User.findByPk(req.user.id);
      
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ success: false, message: '旧密码错误' });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      await User.update(
        { password: hashedPassword },
        { where: { id: req.user.id } }
      );
      
      res.json({ success: true, message: '密码修改成功' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = UserController;