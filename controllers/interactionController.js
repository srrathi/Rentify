const { StatusCodes } = require("http-status-codes");
const { ApiError } = require("./utils");
const { likeDislikeSchema, showInterestSchema, removeInsterestSchema, getAllInterestedPropertiesSchema } = require("../validations/interactionsValidation");
const { interactionService } = require("../services");
const { schemaValidator } = require("../validations/schemaValidator");

const likeDislikeProperty = async (req, res) => {
    try {
        // add data validations
        const validation = await schemaValidator(req?.body, likeDislikeSchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res);
        }
        req.body.user_id = req?.user?.user_id;
        const data = await interactionService.likeDislikeProperty(req?.body);
        ApiSuccess(StatusCodes.OK, { data }, res);
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res);
    }
}

const showInterest = async (req, res) => {
    try {
        // add data validations
        const validation = await schemaValidator(req?.body, showInterestSchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res);
        }
        req.body.user_id = req?.user?.user_id;
        const data = await interactionService.showInterest(req?.body);
        ApiSuccess(StatusCodes.OK, { data }, res);
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res);
    }
};

const removeInterest = async (req, res) => {
    try {
        // add data validations
        const validation = await schemaValidator(req?.body, removeInsterestSchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res);
        }
        req.body.user_id = req?.user?.user_id;
        const data = await interactionService.removeInterest(req?.body);
        ApiSuccess(StatusCodes.OK, { data }, res);
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res);
    }
}

const getAllInterestedProperties = async (req, res) => {
    try {
        // add data validations
        const validation = await schemaValidator(req?.body, getAllInterestedPropertiesSchema);
        if (!validation.status) {
            return ApiError(StatusCodes.BAD_REQUEST, validation.error, res);
        }
        req.body.user_id = req?.user?.user_id;
        const data = await interactionService.getAllInterestedProperties(req.body);
        ApiSuccess(StatusCodes.OK, { data }, res);
    } catch (err) {
        ApiError(StatusCodes.BAD_REQUEST, err?.toString(), res);
    }
};

module.exports = {
    likeDislikeProperty,
    showInterest,
    removeInterest,
    getAllInterestedProperties,
};
