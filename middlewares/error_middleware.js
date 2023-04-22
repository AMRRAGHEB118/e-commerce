const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const ENV = process.env.NODE_ENV;

const global_error = (err, req, res, next) => {
    err.status_code = err.status_code || 500;
    err.status = err.status || 'error';
    if (ENV === 'development') {
        send_error_for_dev(err, res);
    } else if (ENV === 'production') {
        send_error_for_prod(err, res);
    }
};

const send_error_for_dev = (err, res) => {
    return res.status(err.status_code).json({
        status: err.status_code,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const send_error_for_prod = (err, res) => {
    return res.status(err.status_code).json({
        status: err.status_code,
        message: err.message,
    });
};

module.exports = global_error;
