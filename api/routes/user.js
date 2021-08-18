const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.createNewUser);
router.post('/signin', userController.postLogin);
router.delete('/:userId', userController.deleteUser);

module.exports = router;