const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const InterestedProperty = sequelize.define('InterestedProperty', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    property_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    property_user_id: {
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
})

module.exports = InterestedProperty;
