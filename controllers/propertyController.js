const { StatusCodes } = require('http-status-codes');

const { ApiError, ApiSuccess } = require("./utils");
const { schemaValidator } = require('../validations/schemaValidator');
const { addPropertySchema, getAllPropertiesSchema } = require('../validations/propertyValidation');
const { propertyService } = require('../services');

const addProperty = async (req, res) => {
    try {
        // add data validations
        const validation = await schemaValidator(req?.body, addPropertySchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res)
        }
        req.body.seller_id = req?.user?.user_id;
        const data = await propertyService.addProperty(req?.body);
        ApiSuccess(StatusCodes.CREATED, { data }, res)
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res)
    }
}

const updateProperty = async (req, res) => {
    try {
        // add data validations
        const validation = await schemaValidator(req?.body, addPropertySchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res)
        }
        req.body.seller_id = req?.user?.user_id;
        const data = await propertyService.updateProperty(req?.body);
        ApiSuccess(StatusCodes.OK, { data }, res)
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res)
    }
}

const getAllProperties = async (req, res) => {
    try {
        // add data validations
        const validation = await schemaValidator(req?.body, getAllPropertiesSchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res)
        }
        const data = await propertyService.getAllProperties(req?.body);
        ApiSuccess(StatusCodes.OK, { data }, res)
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res)
    }
}

const getPropertyById = async (req, res) => {
    try {
        if (!req?.params?.id || req?.params?.id === '') {
            return ApiError(StatusCodes.BAD_REQUEST, 'Property id is required', res)
        }
        const data = await propertyService.getPropertyById(req?.params?.id, req?.user?.user_id);
        ApiSuccess(StatusCodes.OK, { data }, res)
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res)
    }
}

const deleteProperty = async (req, res) => {
    try {
        if (!req?.params?.id || req?.params?.id === '') {
            return ApiError(StatusCodes.BAD_REQUEST, 'Property id is required', res)
        }

        const data = await propertyService.deleteProperty(req?.params?.id, req?.user?.user_id);
        ApiSuccess(StatusCodes.OK, { data }, res)
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res)
    }
}

module.exports = {
    addProperty,
    getAllProperties,
    getPropertyById,
    deleteProperty,
    updateProperty,
}