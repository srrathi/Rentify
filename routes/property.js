const express = require('express');
const { propertyController } = require('../controllers');
const sellerAuthenticate = require('../middlewares/seller');
const authenticate = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * /property/all:
 *   post:
 *     summary: Get all properties with pagination, filters, and sorting.
 *     tags:
 *       - Properties
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *               filters:
 *                 type: object
 *               sort:
 *                 type: string
 *     responses:
 *       200:
 *         description: Properties retrieved successfully.
 */
router.post('/all', propertyController.getAllProperties);

/**
 * @swagger
 * /property/{id}:
 *   get:
 *     summary: Get property details by ID, including interaction counts.
 *     tags:
 *       - Properties
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID.
 *     responses:
 *       200:
 *         description: Property details retrieved successfully.
 *       404:
 *         description: Property not found.
 */
router.get('/:id', authenticate, propertyController.getPropertyById);

/**
 * @swagger
 * /property/create:
 *   post:
 *     summary: Add a new property.
 *     tags:
 *       - Properties
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Property created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/create', sellerAuthenticate, propertyController.addProperty);


/**
 * @swagger
 * /property/{id}:
 *   post:
 *     summary: Update a property by ID.
 *     tags:
 *       - Properties
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Property updated successfully.
 *       404:
 *         description: Property not found.
 */
router.post('/:id', sellerAuthenticate, propertyController.updateProperty);


/**
 * @swagger
 * /property/{id}:
 *   delete:
 *     summary: Delete a property by ID.
 *     tags:
 *       - Properties
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID.
 *     responses:
 *       200:
 *         description: Property deleted successfully.
 *       404:
 *         description: Property not found.
 */
router.delete('/:id', sellerAuthenticate, propertyController.deleteProperty);

module.exports = router;
