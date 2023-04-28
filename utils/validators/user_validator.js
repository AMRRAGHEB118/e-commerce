const { check, body } = require('express-validator');
const validator_middleware = require('../../middlewares/validator_middleware');
const user_model = require('../../models/users');
const bcrypt = require('bcryptjs');

const username_validator = check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a string');

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

const phone_number_validator = check('phone_number')
    .optional()
    .isMobilePhone('ar-EG')
    .withMessage('Please provide a valid Egyptian phone number');

const date_of_birth_validator = check('date_of_birth')
    .optional()
    .isDate()
    .withMessage('Please provide a valid date of birth');

const role_validator = check('role')
    .optional()
    .isString()
    .withMessage('Role must be a string');

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
    phone_number_validator,
    date_of_birth_validator,
    role_validator,
    validator_middleware,
];

exports.change_user_password_validator = [
    check('id').isMongoId().withMessage('Invalid User ID'),
    body('current_password').notEmpty().withMessage('Current Password is required'),
    body('password_confirm').notEmpty().withMessage('Password Confirm is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .custom(async (value, { req }) => {
            const user = await user_model.findById(req.params.id);
            if (!user) {
                throw new Error('User not found');
            }
            const isEqual = await bcrypt.compare(
                req.body.current_password,
                user.password
            );
            if (!isEqual) {
                throw new Error('Current password is incorrect');
            }
            if (value !== req.body.password_confirm) {
                throw new Error('New password and confirmation do not match');
            }
            return true;
        }),
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
