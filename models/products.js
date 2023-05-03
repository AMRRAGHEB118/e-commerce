const { Schema, model } = require('mongoose');

const title_schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Product title is required'],
        unique: [true, 'Product title must be unique'],
        minlength: [3, 'Product title is too short'],
        maxlength: [100, 'Product title is too long'],
    },
});

const slug_schema = new Schema({
    slug: {
        type: String,
        lowercase: true,
    },
});

const description_schema = new Schema({
    description: {
        type: String,
        required: [true, 'Product description is required'],
        maxlength: [2000, 'Product description is too long'],
    },
});

const price_schema = new Schema({
    price: {
        type: Number,
        trim: true,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be non-negative'],
    },
});

const category_schema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: [true, 'Product category is required'],
        validate: {
            validator: async function (value) {
                const category_count = await model('categories').countDocuments(
                    { _id: value }
                );
                return category_count > 0;
            },
            message: 'Category does not exist',
        },
    },
});

const tags_schema = new Schema({
    tags_list: [
        {
            type: {
                type: Schema.Types.ObjectId,
                ref: 'tag_types',
                required: [true, 'Tag Type is required'],
            },
            tags : [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'tags',
                    required: [true, 'Tag is required'],
                },
            ],
        },
    ],
});

const quantity_schema = new Schema({
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Product quantity must be non-negative'],
        default: 0,
    },
});

const sold_schema = new Schema({
    sold: {
        type: Number,
        required: [true, 'Product sold is required'],
        min: [0, 'Product sold must be non-negative'],
        default: 0,
    },
});

const cover_image = new Schema({
    cover_image: {
        type: String,
        required: true,
    },
});

const images = new Schema({
    images: [String],
});

const product_schema = new Schema({});
product_schema.add(title_schema);
product_schema.add(slug_schema);
product_schema.add(description_schema);
product_schema.add(price_schema);
product_schema.add(category_schema);
product_schema.add(tags_schema);
product_schema.add(quantity_schema);
product_schema.add(sold_schema);
product_schema.add(cover_image);
product_schema.add(images);
product_schema.set('timestamps', true);

const product_model = model('products', product_schema);

module.exports = product_model;
