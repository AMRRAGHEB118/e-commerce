const { Schema, model } = require('mongoose');

const name_schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'tag required'],
        unique: [true, 'tag must be unique'],
        minLength: [3, 'Too short tag name'],
        maxLength: [30, 'Too long tag name'],
    },
});

const slug_schema = new Schema({
    slug: {
        type: String,
        lowercase: true,
    },
});

const type_schema = new Schema({
    type: {
        type: Object,
        required: [true, 'type required'],
    },
});

const category_schema = new Schema({
    category: [
        {
            type: Schema.Types.ObjectId,
            required: [true, 'Category required'],
            ref: 'categories',
        },
    ],
});

const tag_schema = new Schema({});
tag_schema.add(name_schema);
tag_schema.add(slug_schema);
tag_schema.add(type_schema);
tag_schema.add(category_schema);
tag_schema.set('timestamps', true);

const tag_model = model('tag', tag_schema);

module.exports = tag_model;