const express = require('express');
const { interactionController } = require('../controllers');
const authenticate = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * /interaction/like:
 *   post:
 *     summary: Like or dislike a property.
 *     tags:
 *       - Interactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *               like:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Interaction recorded successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/like', authenticate, interactionController.likeDislikeProperty);

// comment add/update by user also update count in property table API

// comment delete also update count in property table API

module.exports = router;