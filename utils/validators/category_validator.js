const { check } = require('express-validator');
const validator_middleware = require('../../middlewares/validator_middleware');

exports.create_category_validator = [
	check('name')
		.notEmpty()
		.withMessage('Category required')
		.isLength({ min: 3 })
		.withMessage('Too short category name')
		.isLength({ max: 30 })
		.withMessage('Too long category name'),
	validator_middleware,
];

exports.get_category_validator = [
	check('id').isMongoId().withMessage('Id category is Invalid'),
	validator_middleware,
];

exports.update_category_validator = [
	check('id').isMongoId().withMessage('Id category is Invalid'),
	check('name')
		.notEmpty()
		.withMessage('Category required')
		.isLength({ min: 3 })
		.withMessage('Too short category name')
		.isLength({ max: 30 })
		.withMessage('Too long category name'),
	validator_middleware,
];

exports.delete_category_validator = [
	check('id').isMongoId().withMessage('Id category is Invalid'),
	validator_middleware,
];
