const yup = require('yup');
const { PRICE_TYPES, PROPERTY_TYPE } = require('../models/utils');

const addPropertySchema = yup.object({
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

const getAllPropertiesSchema = yup.object({
    page: yup.number().optional(),
    limit: yup.number().optional(),
    sort: yup.object({
        by: yup.string().optional(),
        order: yup.string().optional().equals(['asc', 'desc'])
    }).optional(),
    filters: yup.object({
        price: yup.object({
            min: yup.number().optional(),
            max: yup.number().optional(),
        }).optional(),
        area: yup.object({
            min: yup.number().optional(),
            max: yup.number().optional(),
        }).optional(),
        no_of_bedrooms: yup.number().integer().optional(),
        bathroom: yup.boolean().optional(),
        has_nearby_hospital: yup.boolean().optional(),
        nearby_hospital: yup.object({
            min: yup.number().optional(),
            max: yup.number().optional(),
        }).optional(),
        has_nearby_college: yup.boolean().optional(),
        nearby_college: yup.object({
            min: yup.number().optional(),
            max: yup.number().optional(),
        }).optional(),
        has_nearby_shopping_mart: yup.boolean().optional(),
        nearby_shopping_mart: yup.object({
            min: yup.number().optional(),
            max: yup.number().optional(),
        }).optional(),

    }).optional(),
});

const updatePropertySchema = yup.object({
    property_id: yup.string().required(),
    property_type: yup.string().equals(PROPERTY_TYPE).optional(),
    main_image_url: yup.string().optional(),
    price: yup.number().optional(),
    price_type: yup.string().equals(PRICE_TYPES).optional(),
    place: yup.string().optional(),
    area: yup.number().optional(),

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
    getAllPropertiesSchema,
    updatePropertySchema,
}