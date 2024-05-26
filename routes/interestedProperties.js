const express = require('express');
const { interactionController } = require('../controllers');
const authenticate = require('../middlewares/auth');
const router = express.Router();

// show/remove interest in a property + update the count in property table API
router.post('/show', authenticate, interactionController.showInterest);
router.post('/remove', authenticate, interactionController.removeInterest);

// list all the properties in which a user has shown interest with pagination
router.post('/all', authenticate, interactionController.getAllInterestedProperties);

module.exports = router;