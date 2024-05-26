const express = require('express');
const { propertyController } = require('../controllers');
const sellerAuthenticate = require('../middlewares/seller');
const router = express.Router();

// get all properties with pagination, filters and sorting

// get property by id - property + interations

// add property
router.post('/create', sellerAuthenticate, propertyController.addProperty);

// update property

// delete property

module.exports = router;
