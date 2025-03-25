const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const { TOKEN_TYPES } = require("./utils");

const Token = sequelize.define('Token', {
    token: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        primtaryKey: true,
    },
    user: {
        type: DataTypes.STRING,
        references: {
            model: 'Users',
            key: 'user_id',
        },
        required: true,
    },
    type: {
        type: DataTypes.STRING,
        enum: [TOKEN_TYPES.REFRESH],
        required: true,
    },
    expires: {
        type: DataTypes.DATE,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
});

module.exports = Token;
