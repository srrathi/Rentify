const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser)

// get user by id API


module.exports = router;
