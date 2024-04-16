const ApiError = require('../utils/api_errors')
const asyncHandler = require('express-async-handler')
const cart_model = require('../models/cart')
const product_model = require('../models/products')

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

exports.add_product_to_cart = asyncHandler(async (req, res, next) => {
    const id = req.user._id
    const { product_id } = req.params
    const cart = await cart_model
        .findOne({ user: id })
        .populate('products.product')
    const product = await product_model.findById(product_id)
    if (!product) {
        return next(new ApiError(404, 'Product not found'))
    }
    if (!cart) {
        const new_cart = await cart_model.create({
            user: id,
            products: [
                {
                    product: product_id,
                    price: product.price,
                    quantity: 1,
                },
            ],
            total_price: product.price,
        })
        res.status(201).json({
            cart: new_cart,
        })
    } else {
        const product_index = cart.products.findIndex((index) =>
            index.product.equals(product_id)
        )
        if (product_index === -1) {
            cart.products.push({
                product: product_id,
                price: product.price,
                quantity: 1,
            })
            cart.total_price += product.price
            await cart.save()
            res.status(200).json({
                cart,
            })
        } else {
            cart.products[product_index].quantity++
            const product_price = cart.products[product_index].price
            cart.total_price += product_price
            await cart.save()
            res.status(200).json({
                data: cart,
            })
        }
    }
})

exports.remove_product_from_cart = asyncHandler(async (req, res, next) => {
    const user_id = req.user._id
    const { product_id } = req.params

    const cart = await cart_model
        .findOne({ user: user_id })
        .populate('products.product')

    if (!cart) {
        return next(new ApiError(404, 'Cart not found'))
    }

    const product = await product_model.findById(product_id)

    if (!product) {
        return next(new ApiError(404, 'Product not found'))
    }

    const product_index = cart.products.findIndex((index) =>
    index.product.equals(product_id)
    )

    if (product_index === -1) {
        return next(new ApiError(404, 'Product not found in cart'))
    }

    const cart_product = cart.products[product_index]
    if (cart_product.quantity === 1) {
        cart.products.splice(product_index, 1)
        cart.total_price -= product.price
    } else {
        cart_product.quantity--
        cart.total_price -= product.price
    }

    res.status(204).json({ cart })
})
