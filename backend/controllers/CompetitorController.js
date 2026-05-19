const Competitor = require('../models/Competitor');

class CompetitorController {
  static async getCompetitors(req, res) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;
      
      const competitors = await Competitor.findAll({
        where: { user_id: req.user.id },
        offset,
        limit: parseInt(limit),
        order: [['added_at', 'DESC']]
      });
      
      const total = await Competitor.count({ where: { user_id: req.user.id } });
      
      res.json({
        success: true,
        data: competitors,
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

  static async addCompetitor(req, res) {
    try {
      const { asin, title, price, sales, rating, reviews, bsr, variant_count } = req.body;
      
      const competitor = await Competitor.create({
        user_id: req.user.id,
        asin,
        title,
        price,
        sales,
        rating,
        reviews,
        bsr,
        variant_count: variant_count || 1
      });
      
      res.status(201).json({ success: true, data: competitor });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getCompetitorById(req, res) {
    try {
      const { id } = req.params;
      
      const competitor = await Competitor.findOne({
        where: { id, user_id: req.user.id }
      });
      
      if (!competitor) {
        return res.status(404).json({ success: false, message: '竞品不存在' });
      }
      
      res.json({ success: true, data: competitor });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteCompetitor(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await Competitor.destroy({
        where: { id, user_id: req.user.id }
      });
      
      if (deleted === 0) {
        return res.status(404).json({ success: false, message: '竞品不存在' });
      }
      
      res.json({ success: true, message: '竞品删除成功' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = CompetitorController;