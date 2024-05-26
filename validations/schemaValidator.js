module.exports.schemaValidator = async (dataToValidate, resourceSchema) => {
    return new Promise(async (resolve, reject) => {
        try {
            await resourceSchema.validate(dataToValidate);
            resolve({ status: true });
        } catch (e) {
            resolve({ status: false, error: e.errors?.join(", ") });
        }
    });
};
