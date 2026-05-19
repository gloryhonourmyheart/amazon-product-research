const { Op } = require('sequelize');
const Keyword = require('../models/Keyword');

class KeywordController {
  static async getAllKeywords(req, res) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;
      
      const keywords = await Keyword.findAll({
        offset,
        limit: parseInt(limit),
        order: [['search_volume', 'DESC']]
      });
      
      const total = await Keyword.count();
      
      res.json({
        success: true,
        data: keywords,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async searchKeywords(req, res) {
    try {
      const { keyword, count = 50 } = req.body;
      
      const keywords = await Keyword.findAll({
        where: {
          keyword: { [Op.like]: `%${keyword}%` }
        },
        limit: parseInt(count),
        order: [['search_volume', 'DESC']]
      });
      
      res.json({ success: true, data: keywords });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async reverseAsin(req, res) {
    try {
      const { asin } = req.body;
      
      const keywords = await Keyword.findAll({
        where: { asin },
        order: [['rank', 'ASC']]
      });
      
      res.json({ success: true, data: keywords });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async compareAsins(req, res) {
    try {
      const { asins } = req.body;
      
      const results = await Promise.all(
        asins.map(asin => 
          Keyword.findAll({
            where: { asin },
            order: [['rank', 'ASC']],
            limit: 20
          })
        )
      );
      
      const comparison = asins.map((asin, index) => ({
        asin,
        keywords: results[index]
      }));
      
      res.json({ success: true, data: comparison });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteKeyword(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Keyword.destroy({ where: { id } });
      
      if (deleted === 0) {
        return res.status(404).json({ success: false, message: '关键词不存在' });
      }
      
      res.json({ success: true, message: '关键词删除成功' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = KeywordController;