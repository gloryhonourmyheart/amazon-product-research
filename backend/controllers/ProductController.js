const { Op } = require('sequelize');
const Product = require('../models/Product');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const { page = 1, limit = 20, keyword } = req.query;
      const offset = (page - 1) * limit;
      
      let where = {};
      if (keyword) {
        where = {
          [Op.or]: [
            { asin: { [Op.like]: `%${keyword}%` } },
            { title: { [Op.like]: `%${keyword}%` } },
            { brand: { [Op.like]: `%${keyword}%` } }
          ]
        };
      }
      
      const products = await Product.findAll({
        where,
        offset,
        limit: parseInt(limit),
        order: [['sales', 'DESC']]
      });
      
      const total = await Product.count({ where });
      
      res.json({
        success: true,
        data: products,
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

  static async getProductByAsin(req, res) {
    try {
      const { asin } = req.params;
      const product = await Product.findOne({ where: { asin } });
      
      if (!product) {
        return res.status(404).json({ success: false, message: '产品不存在' });
      }
      
      res.json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async searchProducts(req, res) {
    try {
      const { keyword, minPrice, maxPrice, minRating, maxRating, minSales, maxSales } = req.body;
      
      let where = {};
      
      if (keyword) {
        where[Op.or] = [
          { asin: { [Op.like]: `%${keyword}%` } },
          { title: { [Op.like]: `%${keyword}%` } }
        ];
      }
      
      if (minPrice !== undefined) where.price = { ...where.price, [Op.gte]: minPrice };
      if (maxPrice !== undefined) where.price = { ...where.price, [Op.lte]: maxPrice };
      if (minRating !== undefined) where.rating = { ...where.rating, [Op.gte]: minRating };
      if (maxRating !== undefined) where.rating = { ...where.rating, [Op.lte]: maxRating };
      if (minSales !== undefined) where.sales = { ...where.sales, [Op.gte]: minSales };
      if (maxSales !== undefined) where.sales = { ...where.sales, [Op.lte]: maxSales };
      
      const products = await Product.findAll({ where, order: [['sales', 'DESC']] });
      
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const { asin, title, brand, category, price, sales, rating, reviews, bsr, growth_rate, launch_date, fba_fee, image, url } = req.body;
      
      const product = await Product.create({
        asin,
        title,
        brand,
        category,
        price,
        sales,
        rating,
        reviews,
        bsr,
        growth_rate,
        launch_date,
        fba_fee,
        image,
        url
      });
      
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { asin } = req.params;
      const updates = req.body;
      
      const [updated] = await Product.update(updates, { where: { asin } });
      
      if (updated === 0) {
        return res.status(404).json({ success: false, message: '产品不存在' });
      }
      
      const updatedProduct = await Product.findOne({ where: { asin } });
      res.json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { asin } = req.params;
      const deleted = await Product.destroy({ where: { asin } });
      
      if (deleted === 0) {
        return res.status(404).json({ success: false, message: '产品不存在' });
      }
      
      res.json({ success: true, message: '产品删除成功' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = ProductController;