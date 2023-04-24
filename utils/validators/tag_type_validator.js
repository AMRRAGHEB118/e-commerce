const { check } = require('express-validator');
const validator_middleware = require('../../middlewares/validator_middleware');

exports.create_type_validator = [
	check('name')
		.notEmpty()
		.withMessage('type required')
		.isLength({ min: 3 })
		.withMessage('Too short type name')
		.isLength({ max: 30 })
		.withMessage('Too long type name'),
	validator_middleware,
];

exports.get_type_validator = [
	check('id').isMongoId().withMessage('Id type is Invalid'),
	validator_middleware,
];

exports.update_type_validator = [
	check('id').isMongoId().withMessage('Id type is Invalid'),
	check('name')
		.notEmpty()
		.withMessage('type required')
		.isLength({ min: 3 })
		.withMessage('Too short type name')
		.isLength({ max: 30 })
		.withMessage('Too long type name'),
	validator_middleware,
];

exports.delete_type_validator = [
	check('id').isMongoId().withMessage('Id type is Invalid'),
	validator_middleware,
];