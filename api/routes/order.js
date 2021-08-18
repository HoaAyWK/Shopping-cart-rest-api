const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');

router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getAOrder);
router.post('/', orderController.createNewOrder);
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;