const express = require('express');
const router = express.Router();
const {
	get_category_validator,
	create_category_validator,
	update_category_validator,
	delete_category_validator,
} = require('../utils/validators/category_validator');
const {
	get_categories,
	get_category,
	create_category,
	update_category,
	delete_category,
} = require('../controllers/category_controllers');

router
	.route('/')
	.get(get_categories)
	.post(create_category_validator, create_category);
router
	.route('/:id')
	.get(get_category_validator, get_category)
	.put(update_category_validator, update_category)
	.delete(delete_category_validator, delete_category);
module.exports = router;
