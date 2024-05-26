const yup = require('yup');
const { PRICE_TYPES, PROPERTY_TYPE } = require('../models/utils');

const addPropertySchema = yup.object({
    user_id: yup.string().required(),
    property_type: yup.string().equals(PROPERTY_TYPE).required(),
    main_image_url: yup.string().required(),
    price: yup.number().required(),
    price_type: yup.string().equals(PRICE_TYPES).required(),
    place: yup.string().required(),
    area: yup.number().required(),
    
    image_urls: yup.array(yup.string()).optional(),
    description: yup.string().optional(),
    no_of_bedrooms: yup.number().integer().optional(),
    bathroom: yup.boolean().optional(),
    has_nearby_hospital: yup.boolean().optional(),
    nearby_hospital: yup.number().optional(),
    has_nearby_shopping_mart: yup.boolean().optional(),
    nearby_shopping_mart: yup.number().optional(),
    has_nearby_college: yup.boolean().optional(),
    nearby_college: yup.number().optional(),
});

module.exports = {
    addPropertySchema,
}