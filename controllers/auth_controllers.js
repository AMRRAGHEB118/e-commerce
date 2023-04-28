const apiError = require('../utils/api_errors');
const asyncHandler = require('express-async-handler');
const user_model = require('../models/users');
const jwt = require('jsonwebtoken');

exports.sign_up = asyncHandler(async (req, res) => {
    const user = await user_model.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    const token = jwt.sign(
        { user_id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRY_TIME }
    );

    res.status(201).json({
        data: user,
        token
    })
});
