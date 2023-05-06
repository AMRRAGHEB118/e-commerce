const { Schema } = require('mongoose')

const cart_schema = new Schema({
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: Number,
        },
    ],
})

module.exports = mongoose.model('Cart', cart_schema)
