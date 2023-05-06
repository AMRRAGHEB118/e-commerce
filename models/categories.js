const { Schema, model } = require('mongoose')

const name_schema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name required'],
        unique: [true, 'Category name must be unique'],
        minLength: [3, 'Too short category name'],
        maxLength: [30, 'Too long category name'],
    },
})

const slug_schema = new Schema({
    slug: {
        type: String,
        lowercase: true,
    },
})

const image_schema = new Schema({
    image: String,
})

const category_schema = new Schema({})
category_schema.add(name_schema)
category_schema.add(slug_schema)
category_schema.add(image_schema)
category_schema.set('timestamps', true)

const category_model = model('categories', category_schema)

module.exports = category_model
