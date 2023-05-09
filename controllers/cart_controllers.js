const ApiError = require('../utils/api_errors')
const asyncHandler = require('express-async-handler')
const cart_model = require('../models/cart')

exports.create_cart = asyncHandler(async (user_id) => {
    const cart = await cart_model.create({
        user: user_id,
        items: [],
        total_price: 0,
      });
      return cart;
})
