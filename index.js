const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { StatusCodes } = require('http-status-codes');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./database/db');
const syncModels = require('./database/sync');
const { jwtStrategy } = require('./config/passport');
const app = express();
const port = process.env.PORT ?? 9001;
const routes = require('./routes');
const InitializeCrons = require('./crons');
const { swaggerUi, specs } = require('./docs/swagger');


app.use(express.json())
app.use(cors())
app.use(morgan('dev'));
app.use(cookieParser());
// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Routes
app.get('/health', (req, res) => {
    res.status(StatusCodes.OK).json({ message: "server running fine" })
});

app.use(function (req, res, next) {
    res.setTimeout(60000, function () {
        console.log('Request has timed out.');
        res.sendStatus(StatusCodes.REQUEST_TIMEOUT);
    });

    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use('/api/v1', routes);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        // await syncModels();
        InitializeCrons();

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

    } catch (err) {
        console.error('Error:', err);
        await sequelize.close();
        console.log('Connection to the database has been closed.');
    }
}

startServer()