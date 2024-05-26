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
        ApiSuccess(StatusCodes.CREATED, { user, tokens }, res)
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
        ApiSuccess(StatusCodes.OK, { user, tokens }, res);
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

module.exports = {
    createUser,
    loginUser,
    getUserById,
}