const yup = require('yup');
const { USER_TYPE_BUYER, USER_TYPE_SELLER } = require('../models/utils');

const createUserSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().optional(),
    email: yup.string().email().required(),
    password: yup.string().required().min(5),
    phone: yup.string().optional().length(10),
    user_type: yup.string().required().equals([USER_TYPE_BUYER, USER_TYPE_SELLER])
});

const loginUserSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(5),
})

module.exports = {
    createUserSchema,
    loginUserSchema
}