const apiError = require('../utils/api_errors');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const tag_model = require('../models/tags');

exports.create_filter_object = (req, res, next) => {
    let { categoryId, typeId } = req.params;
    let filter = {};
    if (categoryId) {
        filter = { category: categoryId };
    }
    else if (typeId) {
        filter = { type: typeId };
    }
    req.filter = filter
    next();
};

exports.get_tags = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 3;
    const skip = (page - 1) * limit;
    const filter = req.filter
    const tags = await tag_model
        .find(filter)
        .skip(skip)
        .limit(limit)
    res.status(200).json({
        results: tags.length,
        page: page,
        data: tags,
    });
});

exports.get_tag = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const tag = await tag_model.findById(id);
    if (!tag) {
        return next(new apiError(404, 'This tag is Not Found'));
    } else {
        res.status(200).json({ data: tag });
    }
});

exports.set_type_for_create_tag = (req, res, next) => {
    if (!req.body.type) req.body.type = req.params.typeId;
    next();
};

exports.create_tag = asyncHandler(async (req, res) => {
    const { name, type, category } = req.body;
    const tag = await tag_model.create({
        name,
        slug: slugify(name),
        type,
        category,
    });
    res.status(201).json({ data: tag });
});

exports.update_tag = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, type, category } = req.body;
    const tag = await tag_model.findByIdAndUpdate(
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
    const tag = await tag_model.findByIdAndDelete(id);
    if (!tag) {
        return next(new apiError(404, 'This tag is Not Found'));
    } else {
        res.status(204).send();
    }
});
