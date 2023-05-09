const { Schema, model } = require('mongoose')

const user_schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User is required'],
    },
})

const product_schema = new Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
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
})

const total_price_schema = new Schema({
    total_price: {
        type: Number,
        required: true,
    },
})

const status_schema = new Schema({
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending',
    },
})

const shipping_address_schema = new Schema({
    shipping_address: {
        type: String,
        required: true,
    },
})

const order_schema = new Schema({})
order_schema.add(user_schema)
order_schema.add(product_schema)
order_schema.add(total_price_schema)
order_schema.add(status_schema)
order_schema.add(shipping_address_schema)
order_schema.set('timestamps', true)

const order_model = model('orders', order_schema)

module.exports = order_model
