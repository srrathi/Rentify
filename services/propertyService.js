const { v4 } = require('uuid');
const Property = require('../models/property');

const addProperty = async (data) => {
    try {
        const { property_type, user_id, main_image_url, image_urls, place, area, description, no_of_bedrooms,
            bathroom, has_nearby_hospital, nearby_hospital, has_nearby_college, nearby_college, price, price_type,
            nearby_shopping_mart, has_nearby_shopping_mart
        } = data

        const propertData = {
            property_id: v4(),
            user_id,
            property_type,
            main_image_url,
            place,
            area,
            price,
            price_type,
            ...(image_urls && image_urls?.length > 0 && { image_urls: JSON.stringify(image_urls) }),
            ...(description && { description }),
            ...(no_of_bedrooms && { no_of_bedrooms }),
            ...(bathroom && { bathroom }),
            ...(has_nearby_hospital && { has_nearby_hospital, nearby_hospital }),
            ...(has_nearby_college && { has_nearby_college, nearby_college }),
            ...(has_nearby_shopping_mart && { has_nearby_shopping_mart, nearby_shopping_mart }),
        }
        const property = await Property.create(propertData);
        return property;
    } catch (err) {
        throw err
    }
}

module.exports = {
    addProperty
}