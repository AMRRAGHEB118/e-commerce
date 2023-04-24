const { Schema, model } = require('mongoose');

const name_schema = new Schema({
    name: {
        type: String,
        required: [true, 'Type name required'],
        unique: [true, 'Type name must be unique'],
        minLength: [3, 'Too short type name'],
        maxLength: [30, 'Too long type name'],
    },
});

const slug_schema = new Schema({
    slug: {
        type: String,
        lowercase: true,
    },
});

const tag_type_schema = new Schema({});
tag_type_schema.add(name_schema);
tag_type_schema.add(slug_schema);
tag_type_schema.set('timestamps', true);

const tag_type_model = model('tag_type', tag_type_schema);

module.exports = tag_type_model;
