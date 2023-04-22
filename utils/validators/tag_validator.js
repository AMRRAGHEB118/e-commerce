const { check } = require('express-validator');
const validator_middleware = require('../../middlewares/validator_middleware');

exports.create_tag_validator = [
    check('name')
        .notEmpty()
        .withMessage('tag required')
        .isLength({ min: 3 })
        .withMessage('Too short tag name')
        .isLength({ max: 30 })
        .withMessage('Too long tag name'),
    check('category')
        .isArray({ min: 1 })
        .withMessage('category required')
        .isMongoId()
        .withMessage('Id category is Invalid'),
    validator_middleware,
];

exports.get_tag_validator = [
    check('id').isMongoId().withMessage('Id tag is Invalid'),
    validator_middleware,
];

exports.update_tag_validator = [
    check('id').isMongoId().withMessage('Id tag is Invalid'),
    check('name')
        .notEmpty()
        .withMessage('tag required')
        .isLength({ min: 3 })
        .withMessage('Too short tag name')
        .isLength({ max: 30 })
        .withMessage('Too long tag name'),
    check('category')
        .isArray({ min: 1 })
        .withMessage('category required')
        .isMongoId()
        .withMessage('Id category is Invalid'),
    validator_middleware,
];

exports.delete_tag_validator = [
    check('id').isMongoId().withMessage('Id tag is Invalid'),
    validator_middleware,
];