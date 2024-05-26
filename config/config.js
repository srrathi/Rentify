require('dotenv').config();

const config = module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    }
};

module.exports = config;