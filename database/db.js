// db.js
const { Sequelize } = require('sequelize');

// Create a singleton instance of Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data/database.sqlite', // Path to your SQLite database file
});

// Function to execute custom SQL queries
async function customQuery(sql, options = {}) {
    try {
        const result = await sequelize.query(sql, options);
        return result;
    } catch (err) {
        throw new Error(`Error executing query: ${err.message}`);
    }
}


module.exports = { sequelize, customQuery };
