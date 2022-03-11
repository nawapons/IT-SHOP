const express = require('express');
const productController = require('../controller/product');
const router = express.Router();

router.get('/product/:type_id',productController.getProductbyID);
router.post('/product/',productController.searchProduct);
module.exports = router;