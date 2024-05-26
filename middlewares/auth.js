const passport = require('passport');
const { ApiError } = require('../controllers/utils');
const { StatusCodes } = require('http-status-codes')

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    if (err || info || !user) {
        return reject('Please authenticate');
    }
    if (req.params.user_id !== user.user_id) {
        return reject('Forbidden path');
    }
    req.user = user;
    resolve();
};

const authenticate = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next)
    }).then(() => next())
        .catch((err) => ApiError(StatusCodes.FORBIDDEN, err, res));
};

module.exports = authenticate;
