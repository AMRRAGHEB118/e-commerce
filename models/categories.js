const { Schema, model } = require('mongoose');

const category_schema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Category required'],
			unique: [true, 'Category must be unique'],
			minLength: [3, 'Too short category name'],
			maxLength: [30, 'Too long category name'],
		},
		slug: {
			type: String,
			lowercase: true,
		},
		image: String,
	},
	{
		timestamps: true,
	}
);

const category_model = model('categories', category_schema);

module.exports = category_model;
