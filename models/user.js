// models.js
const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/db');
const { USER_TYPE_BUYER, USER_TYPE_SELLER } = require('./utils');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_type: {
        type: Sequelize.ENUM,
        values: [USER_TYPE_BUYER, USER_TYPE_SELLER],
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = User;
