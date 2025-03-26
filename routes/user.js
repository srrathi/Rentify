const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a user as a buyer or seller.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               user_type:
 *                 type: string
 *                 enum: [buyer, seller]
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/register', userController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user and get an access token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 */
router.post('/login', userController.loginUser)

/**
 * @swagger
 * /users/refresh-token:
 *   post:
 *     summary: Refresh the access token.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Token refreshed successfully.
 *       401:
 *         description: Invalid or expired token.
 */
router.post('/refersh-token', userController.refreshToken);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user details by user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *       404:
 *         description: User not found.
 */
router.get('/:id', userController.getUserById);

module.exports = router;
