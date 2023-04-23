const apiError = require('../utils/api_errors');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const tag_type_model = require('../models/tag_types');

exports.get_types = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 3;
    const skip = (page - 1) * limit;
    const types = await tag_type_model.find({}).skip(skip).limit(limit);
    res.status(200).json({
        results: types.length,
        page,
        data: types,
    });
});

exports.get_type = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const type = await tag_type_model.findById(id);
    if (!type) {
        return next(new apiError(404, 'This type is Not Found'));
    } else {
        res.status(200).json({ data: type });
    }
});

exports.create_type = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const type = await tag_type_model.create({ name, slug: slugify(name) });
    res.status(201).json({ data: type });
});

exports.update_type = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const type = await tag_type_model.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
    );
    if (!type) {
        return next(new apiError(404, 'This type is Not Found'));
    } else {
        res.status(200).json({ data: type });
    }
});

exports.delete_type = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const type = await tag_type_model.findByIdAndDelete(id);
    if (!type) {
        return next(new apiError(404, 'This type is Not Found'));
    } else {
        res.status(204).send();
    }
});