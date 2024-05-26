const ApiError = (statusCode, err, res) => {
    console.log(err);
    res.status(statusCode).json({ status: statusCode, message: err })
}

const ApiSuccess = (statusCode, data, res) => {
    res.status(statusCode).json(data)
}

module.exports = { ApiError, ApiSuccess };