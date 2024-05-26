const express = require('express');
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


app.use(express.json())
app.use(cors())
app.use(morgan('dev'));
// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Routes
app.get('/health', (req, res) => {
    res.status(StatusCodes.OK).json({ message: "server running fine" })
})
app.use('/api/v1', routes);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await syncModels();

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