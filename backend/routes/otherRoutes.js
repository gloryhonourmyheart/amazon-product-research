const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/StoreController');
const WordBankController = require('../controllers/WordBankController');
const auth = require('../middleware/auth');

// 店铺路由
router.get('/stores', auth, StoreController.getStores);
router.post('/stores', auth, StoreController.addStore);
router.get('/stores/:id', auth, StoreController.getStoreById);
router.delete('/stores/:id', auth, StoreController.deleteStore);

// 词库路由
router.get('/wordbank', auth, WordBankController.getWordBank);
router.post('/wordbank', auth, WordBankController.addToWordBank);
router.put('/wordbank/:id', auth, WordBankController.updateWordBank);
router.delete('/wordbank/:id', auth, WordBankController.deleteFromWordBank);

module.exports = router;