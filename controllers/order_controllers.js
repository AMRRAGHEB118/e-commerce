const ApiError = require('../utils/api_errors')
const asyncHandler = require('express-async-handler')
const order_model = require('../models/order')
const cart_model = require('../models/cart')

exports.create_order = asyncHandler(async (req, res, next) => {
    const cart = await cart_model
        .findOne({ user: req.user._id })
        .populate('products.product')

    if (!cart) {
        return next(new ApiError(404, 'Cart not found'))
    }

    if (!req.body.shipping_address) {
        return next(new ApiError(400, 'Shipping address is required'))
    }

    const products = cart.products.map((product) => ({
        product: product.product._id,
        price: product.price,
        quantity: product.quantity,
    }))

    const total_price = cart.total_price
    const shipping_address = req.body.shipping_address

    const order = await order_model.create({
        user: req.user._id,
        products,
        total_price,
        shipping_address,
    })
    res.status(201).json({ data: order })
})

exports.get_orders = asyncHandler(async (req, res, next) => {
    const orders = await order_model
        .find({ user: req.user._id })
        .populate('products.product')
    if (orders.length === 0) {
        return next(new ApiError(404, 'Orders not found'))
    }
    res.status(200).json({
        data: orders,
    })
})

exports.get_order = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await order_model.findById(id).populate('products.product');
  
    if (!order || order.user.toString() !== req.user._id.toString()) {
      return next(new ApiError(404, 'Order not found'));
    }
  
    res.status(200).json({ data: order });
  });

exports.delete_order = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const order = await order_model.findByIdAndDelete(id)

    if (!order || order.user.toString() !== req.user._id.toString()) {
        return next(new ApiError(404, 'Order not found'))
    }

    res.status(204).send()
})
