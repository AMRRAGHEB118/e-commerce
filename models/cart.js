const { Schema, model } = require('mongoose')

const cart_schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'products',
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    total_price: Number,
})

const cart_model = model('cart', cart_schema)

module.exports = cart_model
