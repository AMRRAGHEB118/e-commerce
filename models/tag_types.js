const { Schema, model } = require('mongoose');

const tag_type_schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true,
    }
});

const tag_type_model = model('tag_type', tag_type_schema);

module.exports = tag_type_model;
