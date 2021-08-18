const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.createNewUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;