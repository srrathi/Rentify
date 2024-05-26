// models.js
const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/db');
const { PRICE_TYPES, PROPERTY_TYPE } = require('./utils');

const Property = sequelize.define('Property', {
    property_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    property_type: {
        type: DataTypes.STRING,
        values: PROPERTY_TYPE,
    },
    seller_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    main_image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_urls: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    area: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    no_of_bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bathroom: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    has_nearby_hospital: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    nearby_hospital: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    has_nearby_college: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    nearby_college: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    has_nearby_shopping_mart: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    nearby_shopping_mart: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    price_type: {
        type: DataTypes.STRING,
        values: PRICE_TYPES,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    no_of_likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
    no_of_comments: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
    no_of_interests: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    }
});

module.exports = Property;
