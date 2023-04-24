const apiError = require('../utils/api_errors');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const product_model = require('../models/products');

exports.get_products = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 3;
    const skip = (page - 1) * limit;
    const products = await product_model.find({}).skip(skip).limit(limit);
    res.status(200).json({
        results: products.length,
        page,
        data: products,
    });
});

exports.get_product = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await product_model.findById(id);
    if (!product) {
        return next(new apiError(404, 'This product is Not Found'));
    } else {
        res.status(200).json({ data: product });
    }
});

exports.create_product = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    const product = await product_model.create(body);
    res.status(201).json({ data: product });
});

exports.update_product = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    req.body.slug = slugify(req.body.title);
    const product = await product_model.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
    );
    if (!product) {
        return next(new apiError(404, 'This product is Not Found'));
    } else {
        res.status(200).json({ data: product });
    }
});

exports.delete_product = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await product_model.findByIdAndDelete(id);
    if (!product) {
        return next(new apiError(404, 'This product is Not Found'));
    } else {
        res.status(204).send();
    }
});
