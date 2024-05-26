// routes/index.js
const express = require('express');
const userRoutes = require('./user');
const propertyRoutes = require('./property');
const interestRoutes = require('./interestedProperties');
const interactionRoutes = require('./interactions');
// Import other route files as needed

const router = express.Router();

// Add all route handlers here
router.use('/users', userRoutes);
router.use('/property', propertyRoutes);
router.use('/interest', interestRoutes);
router.use('/interaction', interactionRoutes);

module.exports = router;
