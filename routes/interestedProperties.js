const express = require('express');
const { interactionController } = require('../controllers');
const authenticate = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * /interest/show:
 *   post:
 *     summary: Show interest in a property.
 *     tags:
 *       - Interested Properties
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Interest shown successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/show', authenticate, interactionController.showInterest);


/**
 * @swagger
 * /interest/remove:
 *   post:
 *     summary: Remove interest in a property.
 *     tags:
 *       - Interested Properties
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Interest removed successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/remove', authenticate, interactionController.removeInterest);

/**
 * @swagger
 * /interest/all:
 *   post:
 *     summary: List all properties a user has shown interest in, with pagination.
 *     tags:
 *       - Interested Properties
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Interested properties retrieved successfully.
 */
router.post('/all', authenticate, interactionController.getAllInterestedProperties);

module.exports = router;