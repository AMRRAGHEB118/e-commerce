const { Schema, model } = require('mongoose');

const tag_type_schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const tag_type = model('tag_type', tag_type_schema);

module.exports = tag_type;
