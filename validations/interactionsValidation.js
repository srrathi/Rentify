const yup = require('yup');

const likeDislikeSchema = yup.object({
    value: yup.boolean().required(),
    property_id: yup.string().required(),
});

const showInterestSchema = yup.object({
    property_id: yup.string().required(),
    value: yup.string().required(),
    property_user_id: yup.string().required(),
});

const removeInsterestSchema = yup.object({
    property_id: yup.string().required(),
    property_user_id: yup.string().required(),
});

const getAllInterestedPropertiesSchema = yup.object({
    page: yup.number().optional(),
    limit: yup.number().optional(),
});

module.exports = {
    likeDislikeSchema,
    showInterestSchema,
    removeInsterestSchema,
    getAllInterestedPropertiesSchema,
};
