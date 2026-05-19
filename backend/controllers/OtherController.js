const Store = require('../models/Store');
const WordBank = require('../models/WordBank');

class StoreController {
  static async getStores(req, res) {
    try {
      const stores = await Store.findAll({
        where: { user_id: req.user.id },
        order: [['created_at', 'DESC']]
      });
      
      res.json({ success: true, data: stores });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async addStore(req, res) {
    try {
      const { store_name, url, rating, review_count, product_count } = req.body;
      
      const store = await Store.create({
        user_id: req.user.id,
        store_name,
        url,
        rating,
        review_count,
        product_count
      });
      
      res.status(201).json({ success: true, data: store });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getStoreById(req, res) {
    try {
      const { id } = req.params;
      
      const store = await Store.findOne({
        where: { id, user_id: req.user.id }
      });
      
      if (!store) {
        return res.status(404).json({ success: false, message: '店铺不存在' });
      }
      
      res.json({ success: true, data: store });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteStore(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await Store.destroy({
        where: { id, user_id: req.user.id }
      });
      
      if (deleted === 0) {
        return res.status(404).json({ success: false, message: '店铺不存在' });
      }
      
      res.json({ success: true, message: '店铺删除成功' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

class WordBankController {
  static async getWordBank(req, res) {
    try {
      const { category } = req.query;
      
      let where = { user_id: req.user.id };
      if (category) {
        where.category = category;
      }
      
      const words = await WordBank.findAll({
        where,
        order: [['added_at', 'DESC']]
      });
      
      res.json({ success: true, data: words });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async addToWordBank(req, res) {
    try {
      const { keyword, category = 'other', notes } = req.body;
      
      const word = await WordBank.create({
        user_id: req.user.id,
        keyword,
        category,
        notes
      });
      
      res.status(201).json({ success: true, data: word });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateWordBank(req, res) {
    try {
      const { id } = req.params;
      const { category, notes } = req.body;
      
      const [updated] = await WordBank.update(
        { category, notes },
        { where: { id, user_id: req.user.id } }
      );
      
      if (updated === 0) {
        return res.status(404).json({ success: false, message: '词库项不存在' });
      }
      
      const updatedWord = await WordBank.findByPk(id);
      res.json({ success: true, data: updatedWord });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteFromWordBank(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await WordBank.destroy({
        where: { id, user_id: req.user.id }
      });
      
      if (deleted === 0) {
        return res.status(404).json({ success: false, message: '词库项不存在' });
      }
      
      res.json({ success: true, message: '词库项删除成功' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = { StoreController, WordBankController };