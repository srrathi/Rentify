const { StatusCodes } = require('http-status-codes');

const { ApiError, ApiSuccess } = require("./utils");
const { schemaValidator } = require('../validations/schemaValidator');
const { createUserSchema, loginUserSchema } = require('../validations/userValidation');
const { userService, tokenService } = require('../services');

const createUser = async (req, res) => {
    try {
        // add data validations
        const validation = await schemaValidator(req?.body, createUserSchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res)
        }
        const user = await userService.createUser(req?.body);
        const tokens = await tokenService.generateAuthTokens(user);
        
        res.cookie('refreshToken', tokens.refresh, { httpOnly: true, secure: true });  
        const resp = {
            user,
            accessToken: tokens?.access
        }
        ApiSuccess(StatusCodes.CREATED, resp, res);
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res)
    }
}

const loginUser = async (req, res) => {
    try {
        const validation = await schemaValidator(req?.body, loginUserSchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res)
        }
        const user = await userService.loginUser(req?.body);
        const tokens = await tokenService.generateAuthTokens(user);

        res.cookie('refreshToken', tokens.refresh, { httpOnly: true, secure: true });  
        const resp = {
            user,
            accessToken: tokens?.access
        }
        ApiSuccess(StatusCodes.OK, resp, res);
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res)
    }
}

const getUserById = async (req, res) => {
    try {
        if (!req?.params?.id || req?.params?.id === '') {
            return ApiError(StatusCodes.BAD_REQUEST, 'User id is required', res)
        }
        const user = await userService.getUserById(req?.params?.id);
        ApiSuccess(StatusCodes.OK, { user }, res);
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res);
    }
}

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate', res);
        }
        const data = await userService.refreshToken(refreshToken);

        res.cookie('refreshToken', data.tokens.refresh, { httpOnly: true, secure: true });
        const resp = {
            user: data?.user,
            accessToken: data?.tokens?.access
        }
        ApiSuccess(StatusCodes.OK, resp, res);
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res);
    }
};

module.exports = {
    createUser,
    loginUser,
    getUserById,
    refreshToken,
}