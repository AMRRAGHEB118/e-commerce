const { Schema, model, default: mongoose } = require('mongoose');

const sub_category_schema = Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'SubCategory required'],
			unique: [true, 'SubCategory must be unique'],
			minLength: [3, 'Too short category name'],
			maxLength: [30, 'Too long category name'],
		},
		slug: {
			type: String,
			lowercase: true,
		},
		category: {
			type: mongoose.Schema.ObjectId,
			required: [true, 'Category required'],
			ref: 'categories'
		}
	},
	{ timestamps: true }
);

const sub_category_model = model('sub_categories', sub_category_schema);

module.exports = sub_category_model;