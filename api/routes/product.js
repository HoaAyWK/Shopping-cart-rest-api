const express = require('express');
const multer = require('multer');

const productController = require('../controllers/product');
const product = require('../models/product');
const checkAuth = require('../middlewares/check-auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {

        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getAProduct);
router.post('/', checkAuth, upload.single('productImage'), productController.createNewProduct);
router.patch('/:productId', checkAuth, productController.updateProduct);
router.delete('/:productId', checkAuth, productController.deleteAProduct);

module.exports = router;