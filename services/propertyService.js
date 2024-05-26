const { v4 } = require('uuid');
const Property = require('../models/property');
const { PAGE_SIZE } = require('./utils');
const { Sequelize } = require('sequelize');
const PropertyInteractions = require('../models/interactions');
const { INTERACTION_TYPES } = require('../models/utils');
const InterestedProperty = require('../models/interestedProperties');

const addProperty = async (data) => {
    try {
        const { property_type, seller_id, main_image_url, image_urls, place, area, description, no_of_bedrooms,
            bathroom, has_nearby_hospital, nearby_hospital, has_nearby_college, nearby_college, price, price_type,
            nearby_shopping_mart, has_nearby_shopping_mart
        } = data

        const propertData = {
            property_id: v4(),
            seller_id,
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
};

const getAllProperties = async (data) => {
    try {
        const { sort, filters } = data;
        let page = data?.page;
        if (!page) page = 1;
        const offset = (page - 1) * PAGE_SIZE;
        const order = [
            ['createdAt', 'DESC'],
        ]
        if (sort && sort?.by && sort?.order) {
            order.push([sort?.by, sort?.order]);
        }
        const whereClause = {}
        whereClause.is_active = true;
        if (filters?.price) {
            whereClause.price = {
                ...(filters?.price?.min && { [Sequelize.Op.gte]: filters?.price?.min }),
                ...(filters?.price?.max && { [Sequelize.Op.lte]: filters?.price?.max }),
            }
        }
        if (filters?.area) {
            whereClause.area = {
                ...(filters?.area?.min && { [Sequelize.Op.gte]: filters?.area?.min }),
                ...(filters?.area?.max && { [Sequelize.Op.lte]: filters?.area?.max }),
            }
        }
        if (filters?.no_of_bedrooms) {
            whereClause.no_of_bedrooms = no_of_bedrooms;
        }
        if (filters?.bathroom === true || filters?.bathroom === false) {
            whereClause.bathroom = bathroom
        }
        if (filters?.has_nearby_hospital) {
            whereClause.nearby_hospital = {
                ...(filters?.nearby_hospital?.min && { [Sequelize.Op.gte]: filters?.nearby_hospital?.min }),
                ...(filters?.nearby_hospital?.max && { [Sequelize.Op.lte]: filters?.nearby_hospital?.max }),
            }
        }
        if (filters?.has_nearby_college) {
            whereClause.nearby_college = {
                ...(filters?.nearby_college?.min && { [Sequelize.Op.gte]: filters?.nearby_college?.min }),
                ...(filters?.nearby_college?.max && { [Sequelize.Op.lte]: filters?.nearby_college?.max }),
            }
        }
        if (filters?.has_nearby_shopping_mart) {
            whereClause.nearby_shopping_mart = {
                ...(filters?.nearby_shopping_mart?.min && { [Sequelize.Op.gte]: filters?.nearby_shopping_mart?.min }),
                ...(filters?.nearby_shopping_mart?.max && { [Sequelize.Op.lte]: filters?.nearby_shopping_mart?.max }),
            }
        }

        // Fetch data with pagination, multiple ordering, and filters
        const result = await Property.findAndCountAll({
            where: whereClause,
            order: order,
            limit: PAGE_SIZE,
            offset: offset,
        });
        const resp = {
            totalItems: result.count,
            totalPages: Math.ceil(result.count / PAGE_SIZE),
            currentPage: page,
            data: result.rows,
        };
        return resp;
    } catch (err) {
        throw err
    }
};

const getPropertyById = async (id, user_id) => {
    try {
        const [property, isLiked, interested] = await Promise.all([
            Property.findOne({
                where: {
                    property_id: id,
                    is_active: true,
                }
            }),
            PropertyInteractions.findOne({
                where: {
                    property_id: id,
                    user_id: user_id,
                    interaction_type: INTERACTION_TYPES[0],
                    is_active: true,
                }
            }),
            InterestedProperty.findOne({
                where: {
                    property_id: id,
                    user_id: user_id,
                    is_active: true,
                }
            })
        ]);

        property.is_liked = isLiked ? true : false;
        property.is_interested = interested ? true : false;
        return property;
    } catch (err) {
        throw err
    }
};

const updateProperty = async (data) => {
    try {
        const { property_id, property_type, seller_id, main_image_url, image_urls, place, area, description, no_of_bedrooms,
            bathroom, has_nearby_hospital, nearby_hospital, has_nearby_college, nearby_college, price, price_type,
            nearby_shopping_mart, has_nearby_shopping_mart
        } = data

        const propertData = {
            ...(property_type && { property_type }),
            ...(main_image_url && { main_image_url }),
            ...(place && { place }),
            ...(area && { area }),
            ...(price && { price }),
            ...(price_type && { price_type }),
            ...(image_urls && image_urls?.length > 0 && { image_urls: JSON.stringify(image_urls) }),
            ...(description && { description }),
            ...(no_of_bedrooms && { no_of_bedrooms }),
            ...(bathroom && { bathroom }),
            ...(has_nearby_hospital && { has_nearby_hospital, nearby_hospital }),
            ...(has_nearby_college && { has_nearby_college, nearby_college }),
            ...(has_nearby_shopping_mart && { has_nearby_shopping_mart, nearby_shopping_mart }),
        }
        const property = await Property.update(propertData, {
            where: {
                property_id,
                seller_id,
                is_active: true,
            }
        });
        return property;
    } catch (err) {
        throw err;
    }
}

const deleteProperty = async (id, seller_id) => {
    try {
        const property = await Property.findOne({
            where: {
                property_id: id,
                seller_id,
                is_active: true,
            }
        });
        if (!property) {
            throw new Error('Property not found');
        }
        await property.update({ is_active: false });
        return { message: 'Property deleted successfully' };
    } catch (err) {
        throw err
    }
}

module.exports = {
    addProperty,
    getAllProperties,
    getPropertyById,
    deleteProperty,
    updateProperty,
}