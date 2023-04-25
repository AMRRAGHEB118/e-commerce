const { check } = require('express-validator');
const validator_middleware = require('../../middlewares/validator_middleware');
const user_model = require('../../models/users');

const username_validator = check('username')
    .isEmpty()
    .withMessage('username is required')
    .isString()
    .withMessage();

const email_validator = check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .custom(async (val) => {
        const email = await user_model.find({ email: val });
        if (!email) {
            return Promise.reject('This Email is not Unique');
        }
        return Promise.resolve();
    });

const password_validator = check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom(async (val) => {
        const password = await user_model.find({ password: val });
        if (!password) {
            return Promise.reject('This Password is not Unique');
        }
        return Promise.resolve();
    });

const phone_number_validator = check('phone_number').optional()
    .isMobilePhone('ar-EG')
    .withMessage()
    .custom(async (val) => {
        const phone_number = await user_model.find({ phone_number: val });
        if (!phone_number) {
            return Promise.reject('This Phone Number is not Unique');
        }
        return Promise.resolve();
    });
const date_of_birth_validator = check('date_of_birth').optional().isDate().withMessage();
const role_validator = check('role').optional().isString().withMessage();

exports.create_user_validator = [
    username_validator,
    email_validator,
    password_validator,
    phone_number_validator,
    date_of_birth_validator,
    role_validator,
    validator_middleware,
];

exports.update_user_validator = [
    check('id').isMongoId().withMessage('Invalid User ID'),
    username_validator,
    email_validator,
    password_validator,
    phone_number_validator,
    date_of_birth_validator,
    role_validator,
    validator_middleware,
];

exports.get_user_validator = [
    check('id').isMongoId().withMessage('Invalid User ID'),
    validator_middleware,
];

exports.delete_user_validator = [
    check('id').isMongoId().withMessage('Invalid User ID'),
    validator_middleware,
];
