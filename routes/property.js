const express = require('express');
const { propertyController } = require('../controllers');
const sellerAuthenticate = require('../middlewares/seller');
const authenticate = require('../middlewares/auth');
const router = express.Router();

// get all properties with pagination, filters and sorting
router.post('/all', authenticate, propertyController.getAllProperties);

// get property by id - property + interations count
router.get('/:id', authenticate, propertyController.getPropertyById);

// add property
router.post('/create', sellerAuthenticate, propertyController.addProperty);

// update property
router.post('/:id', sellerAuthenticate, propertyController.updateProperty);

// delete property
router.delete('/:id', sellerAuthenticate, propertyController.deleteProperty);

module.exports = router;
