const apiError = require('../utils/api_errors');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const user_model = require('../models/users');

// exports.create_filter_object = (req, res, next) => {
//     let { categoryId, typeId } = req.params;
//     let filter = {};
//     if (categoryId) {
//         filter = { category: categoryId };
//     }
//     else if (typeId) {
//         filter = { type: typeId };
//     }
//     req.filter = filter
//     next();
// };

exports.get_users = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 3;
    const skip = (page - 1) * limit;
    // const filter = req.filter
    const users = await user_model.find({}).skip(skip).limit(limit);
    res.status(200).json({
        results: users.length,
        page: page,
        data: users,
    });
});

exports.get_user = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await user_model.findById(id);
    if (!user) {
        return next(new apiError(404, 'This user is Not Found'));
    } else {
        res.status(200).json({ data: user });
    }
});

exports.create_user = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.username);
    const user = await user_model.create(req.body);
    res.status(201).json({ data: user });
});

exports.update_user = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    req.body.slug = slugify(req.body.username);
    const user = await user_model.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
    });
    if (!user) {
        return next(new apiError(404, 'This user is Not Found'));
    }
    res.status(200).json({ data: user });
});

exports.delete_user = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await user_model.findByIdAndDelete(id);
    if (!user) {
        return next(new apiError(404, 'This user is Not Found'));
    } else {
        res.status(204).send();
    }
});
