const slugify = require('slugify');
const { check, body } = require('express-validator');
const validator_middleware = require('../../middlewares/validator_middleware');

exports.create_product_validator = [
    check('title')
        .notEmpty()
        .withMessage('Product title required')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    check('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ max: 2000 })
        .withMessage('Description must be less than 2000 characters'),
    check('quantity')
        .notEmpty()
        .withMessage('Product quantity is required')
        .isNumeric()
        .withMessage('Quantity must be a number')
        .isInt({ min: 0 })
        .withMessage('Quantity cannot be negative'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Sold must be a number')
        .isInt({ min: 0 })
        .withMessage('Sold cannot be negative'),
    check('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Price must be a number')
        .isFloat({ min: 0 })
        .withMessage('Price cannot be negative'),
    check('cover_image')
        .notEmpty()
        .withMessage('Product image Cover is required')
        .isString()
        .withMessage('Cover image must be a string'),
    check('images').optional().isArray().withMessage('Images must be an array'),
    check('category')
        .notEmpty()
        .withMessage('Product must be belong to a category')
        .isMongoId()
        .withMessage('Invalid category ID'),
    check('tags.*.type').isMongoId().withMessage('Invalid tag type ID'),
    check('tags.*.values')
        .optional()
        .isArray()
        .withMessage('Tag values must be an array')
        .custom((value) => {
            if (value.some((tag) => !Types.ObjectId.isValid(tag))) {
                return Promise.reject('Invalid tag ID');
            }
            return Promise.resolve();
        }),
    validator_middleware,
];

exports.get_product_validator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validator_middleware,
];

exports.update_product_validator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validator_middleware,
];

exports.delete_product_validator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validator_middleware,
];
