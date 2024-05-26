const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const { INTERACTION_TYPES } = require('./utils');

const PropertyInteractions = sequelize.define('PropertyInteractions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    interaction_type: {
        type: DataTypes.STRING,
        values: INTERACTION_TYPES,
    },
    property_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = PropertyInteractions;
