// routes/index.js
const express = require('express');
const userRoutes = require('./user');
const propertyRoutes = require('./property');
// Import other route files as needed

const router = express.Router();

// Add all route handlers here
router.use('/users', userRoutes);
router.use('/property', propertyRoutes);

module.exports = router;
