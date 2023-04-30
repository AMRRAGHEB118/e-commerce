const { check } = require('express-validator');
const validator_middleware = require('../../middlewares/validator_middleware');
const user_model = require('../../models/users');
const slugify = require('slugify');

const username_validator = check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a string')
    .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    });

const email_validator = check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address');

const password_validator = check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters');

const password_confirm_validator = check('password_confirm')
    .notEmpty()
    .withMessage('Password Confirm is required');

exports.sign_up_validator = [
    username_validator,
    email_validator.custom(async (val) => {
        const user = await user_model.findOne({ email: val });
        if (user) {
            return new Error('This Email is already exists');
        }
        return true;
    }),
    password_confirm_validator,
    password_validator.custom(async (val, { req }) => {
        if (val !== req.body.password_confirm) {
            throw new Error('New password and confirmation do not match');
        }
        return true;
    }),
    validator_middleware,
];

exports.log_in_validator = [
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    validator_middleware,
];
