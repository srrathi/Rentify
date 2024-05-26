const { StatusCodes } = require('http-status-codes');

const { ApiError, ApiSuccess } = require("./utils");
const { schemaValidator } = require('../validations/schemaValidator');
const { addPropertySchema } = require('../validations/propertyValidation');
const { propertyService } = require('../services');

const addProperty = async (req, res) => {
    try {
        // add data validations
        const validation = await schemaValidator(req?.body, addPropertySchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res)
        }
        const data = await propertyService.addProperty(req?.body);
        ApiSuccess(StatusCodes.CREATED, { data }, res)
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res)
    }
}

module.exports = {
    addProperty,
}