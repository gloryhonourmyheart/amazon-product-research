const { Op } = require('sequelize');
const Review = require('../models/Review');

class ReviewController {
  static async getReviewsByAsin(req, res) {
    try {
      const { asin } = req.params;
      const { page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;
      
      const reviews = await Review.findAll({
        where: { asin },
        offset,
        limit: parseInt(limit),
        order: [['date', 'DESC']]
      });
      
      const total = await Review.count({ where: { asin } });
      
      res.json({
        success: true,
        data: reviews,
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

  static async analyzeReviews(req, res) {
    try {
      const { asin } = req.body;
      
      const reviews = await Review.findAll({ where: { asin } });
      
      const total = reviews.length;
      const ratingSum = reviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = total > 0 ? (ratingSum / total).toFixed(2) : 0;
      
      const sentimentCounts = {
        positive: 0,
        neutral: 0,
        negative: 0
      };
      
      reviews.forEach(r => {
        sentimentCounts[r.sentiment]++;
      });
      
      const variantStats = {};
      reviews.forEach(r => {
        if (r.variant) {
          if (!variantStats[r.variant]) {
            variantStats[r.variant] = { count: 0, avgRating: 0, totalRating: 0 };
          }
          variantStats[r.variant].count++;
          variantStats[r.variant].totalRating += r.rating;
        }
      });
      
      Object.keys(variantStats).forEach(v => {
        variantStats[v].avgRating = (variantStats[v].totalRating / variantStats[v].count).toFixed(2);
      });
      
      res.json({
        success: true,
        data: {
          total,
          avgRating,
          sentimentCounts,
          variantStats,
          reviews: reviews.slice(0, 50)
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createReview(req, res) {
    try {
      const { asin, rating, content, date, verified, variant, helpful } = req.body;
      
      const review = await Review.create({
        asin,
        rating,
        content,
        date,
        verified: verified || false,
        variant,
        helpful: helpful || 0,
        sentiment: rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative'
      });
      
      res.status(201).json({ success: true, data: review });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Review.destroy({ where: { id } });
      
      if (deleted === 0) {
        return res.status(404).json({ success: false, message: '评论不存在' });
      }
      
      res.json({ success: true, message: '评论删除成功' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = ReviewController;