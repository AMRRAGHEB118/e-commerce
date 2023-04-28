const apiError = require('../utils/api_errors');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const user_model = require('../models/users');
const bcrypt = require('bcryptjs');

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
    const user = await user_model.findByIdAndUpdate(
        { _id: id },
        {
            username: req.body.username,
            slug: req.body.slug,
            email: req.body.email,
            phone_number: req.body.phone_number,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            image: req.body.image,
            role: req.body.role,
        },
        {
            new: true,
        }
    );
    if (!user) {
        return next(new apiError(404, 'This user is Not Found'));
    }
    res.status(200).json({ data: user });
});

exports.change_user_password = asyncHandler(async (req, res, next) => {
    const salt = await bcrypt.genSalt(12);
    const user = await user_model.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.password, salt),
        },
        {
            new: true,
        }
    );
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
