const express = require('express');

const productController = require('../controllers/product');
const product = require('../models/product');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getAProduct);
router.post('/', productController.createNewProduct);
router.patch('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteAProduct);

module.exports = router;