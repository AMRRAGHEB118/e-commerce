const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })

const ENV = process.env.NODE_ENV
const ApiError = require('../utils/api_errors')

const send_error_for_dev = (err, req, res) => {
    return res.status(err.status_code).json({
        status: err.status_code,
        error: err,
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString(),
    })
}

const send_error_for_prod = (err, res) => {
    return res.status(err.status_code).json({
        status: err.status_code,
        message: err.message,
        timestamp: new Date().toISOString(),
    })
}

const handle_special_error = (
    err_name,
    status_code = 400,
    err_msg = 'Error'
) => {
    if (err.name === err_name) {
        err = new ApiError(status_code, err_msg)
    }
}

const global_error = (err, req, res, next) => {
    err.status_code = err.status_code || 500
    err.status = err.status || 'error'

    if (ENV === 'development') {
        send_error_for_dev(err, req, res)
    } else if (ENV === 'production') {
        handle_special_error(
            'JsonWebTokenError',
            401,
            'Invalid authentication token.'
        )
        handle_special_error(
            'TokenExpiredError',
            401,
            'Authentication token has expired.'
        )
        return send_error_for_prod(err, res)
    }
}

module.exports = global_error
