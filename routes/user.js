const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser)
router.get('/:id', userController.getUserById);

module.exports = router;
