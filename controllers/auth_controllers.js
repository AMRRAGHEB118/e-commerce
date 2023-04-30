const apiError = require('../utils/api_errors');
const asyncHandler = require('express-async-handler');
const user_model = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generate_token = (payload) => {
    jwt.sign({ user_id: payload }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY_TIME,
    });
};

exports.sign_up = asyncHandler(async (req, res) => {
    const user = await user_model.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    const token = generate_token(user._id);

    res.status(201).json({
        data: user,
        token,
    });
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new apiError('Please provide email and password', 400));
    }

    const user = await user_model.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new apiError('Invalid credentials', 401));
    }

    const token = generate_token(user._id);

    res.status(200).json({
        data: user,
        token,
    });
});
