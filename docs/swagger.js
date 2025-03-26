// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Property Renting API',
            version: '1.0.0',
            description: 'API documentation for the Property Renting Platform',
        },
        servers: [
            {
                url: 'http://localhost:9001/api/v1',
                description: 'Local Server',
            },
            {
                url: "https://rentify-9h9k.onrender.com/api/v1",
                description: 'Production Server',
            },
        ],
    },
    apis: ['./routes/**/*.js'], // Path to API docs
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
