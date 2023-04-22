const apiError = require('../utils/api_errors');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const tags_model = require('../models/tags');

exports.get_tags = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 3;
    const skip = (page - 1) * limit;
    const tags = await tags_model.find().skip(skip).limit(limit);
    res.status(200).json({
        results: tags.length,
        page: page,
        data: tags,
    });
    res.send(tags);
});

exports.get_tag = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const tag = await tags_model.findById(id);
    if (!tag) {
        return next(new apiError(404, 'This tag is Not Found'));
    } else {
        res.status(200).json({ data: tag });
    }
});

exports.create_tag = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { type } = req.body;
    const { category } = req.body;
    const tag = await tags_model.create({
        name,
        slug: slugify(name),
        type,
        category,
    });
    res.status(201).json({ data: tag });
});

exports.update_tag = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const { type } = req.body;
    const { category } = req.body;
    const tag = await tags_model.findByIdAndUpdate(
        { _id: id },
        { name, slug: slugify(name), type, category },
        { new: true }
    );
    if (!tag) {
        return next(new apiError(404, 'This tag is Not Found'));
    }
    res.status(200).json({ data: tag });
});

exports.delete_tag = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const tag = await tags_model.findByIdAndDelete(id);
    if (!tag) {
        return next(new apiError(404, 'This tag is Not Found'));
    } else {
        res.status(204).send();
    }
});
