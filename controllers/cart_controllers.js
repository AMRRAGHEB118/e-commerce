const ApiError = require('../utils/api_errors')
const asyncHandler = require('express-async-handler')
const cart_model = require('../models/cart')

exports.create_cart = asyncHandler(async (user_id) => {
    const cart = await cart_model.create({
        user: user_id,
        items: [],
        total_price: 0,
    })
    return cart
})

exports.get_cart = asyncHandler(async (req, res, next) => {
    const cart = await cart_model.findOne({ user: req.user._id })
    if (!cart) {
        return next(new ApiError(404, 'Cart not found'))
    }

    res.status(200).json({
        data: cart,
    })
})

exports.delete_cart = asyncHandler(async (user_id, next) => {
    const cart = await cart_model.findOneAndDelete({ user: user_id })
    if (!cart) {
        return next(new ApiError(404, 'Cart not found'))
    }
})
