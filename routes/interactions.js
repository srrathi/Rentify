const express = require('express');
const { interactionController } = require('../controllers');
const authenticate = require('../middlewares/auth');
const router = express.Router();

// property like dislike by user also update count in property table API
router.post('/like', authenticate, interactionController.likeDislikeProperty);

// comment add/update by user also update count in property table API

// comment delete also update count in property table API

module.exports = router;