// sync.js
const { sequelize } = require('./db');

async function syncModels() {
    try {
        await sequelize.sync({ alter: true }); // This will automatically create the table if it doesn't exist or alter it if necessary
        console.log('Models synchronized with database');
    } catch (err) {
        console.error('Error synchronizing models:', err);
    }
}

module.exports = syncModels;
