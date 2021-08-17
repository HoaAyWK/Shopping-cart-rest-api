const express = require('express');

const productController = require('../controllers/product');
const product = require('../models/product');

const router = express.Router();

//router.get('/', productController.getAllProducts);
router.post('/', productController.createNewProduct);

module.exports = router;