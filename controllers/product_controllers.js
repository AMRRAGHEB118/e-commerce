const ApiError = require('../utils/api_errors')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const product_model = require('../models/products')

exports.create_filter_object = (req, res, next) => {
    let { category_id, type_id } = req.params
    let filter = {}
    if (category_id) {
        filter = { category: category_id }
    } else if (type_id) {
        filter = { type: type_id }
    }
    req.body.filter = filter
    next()
}

exports.get_products = asyncHandler(async (req, res) => {
    const filter = req.body.filter
    const products = await product_model.find(filter)
    res.status(200).json({
        results: products.length,
        data: products,
    })
})

exports.get_product = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await product_model.findById(id)
    if (!product) {
        return next(new ApiError(404, 'This product is Not Found'))
    } else {
        res.status(200).json({ data: product })
    }
})

exports.create_product = asyncHandler(async (req, res) => {
    console.log(req.body)
    req.body.slug = slugify(req.body.title)
    const product = await product_model.create(req.body)
    res.status(201).json({ data: product })
})

exports.update_product = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    req.body.slug = slugify(req.body.title)
    const product = await product_model.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
    )
    if (!product) {
        return next(new ApiError(404, 'This product is Not Found'))
    } else {
        res.status(200).json({ data: product })
    }
})

exports.delete_product = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await product_model.findByIdAndDelete(id)
    if (!product) {
        return next(new ApiError(404, 'This product is Not Found'))
    } else {
        res.status(204).send()
    }
})
