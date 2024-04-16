const ApiError = require('../utils/api_errors')
const asyncHandler = require('express-async-handler')
const user_model = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { create_cart } = require('../controllers/cart_controllers')
const { black_list, add_to_black_list } = require('./blacklist_contrllers')

const generate_token = (payload) => {
    return jwt.sign({ user_id: payload }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY_TIME,
    })
}

exports.sign_up = asyncHandler(async (req, res) => {
    const user = await user_model.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    const token = generate_token(user._id)

    req.session.user = {
        user_id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }

    const cart = await create_cart(user._id)

    res.status(201).json({
        success: true,
        data: {
            user,
            token,
            cart,
        },
        message: 'User successfully created.',
    })
})
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(
            new ApiError(400, 'Please provide both email and password.')
        )
    }

    const user = await user_model.findOne({ email }).select('+password')

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(
            new ApiError(401, 'The email or password you entered is incorrect.')
        )
    }

    const token = generate_token(user._id)

    req.session.user = {
        user_id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }

    res.status(201).json({
        success: true,
        data: {
            user,
            token,
        },
        message: 'User successfully created.',
    })
})

exports.log_out = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    await add_to_black_list(token);

    req.session.user = {
        user_id: 'guest',
        username: 'Guest',
        email: 'guest',
        role: 'guest',
    }
    res.status(200).json({ success: true, message: 'Logged out successfully.' });
});

exports.auth = asyncHandler(async (req, res, next) => {
    let token
    const auth_header = req.headers.authorization
    if (auth_header && auth_header.startsWith('Bearer')) {
        token = auth_header.split(' ')[1]
    }
    if (!token) {
        return next(new ApiError(401, 'Missing authentication token.'))
    }
    if (black_list.has(token)) {
        return next(new ApiError(401, 'Token has been blacklisted.'))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await user_model.findById(decoded.user_id)
    if (!user) {
        return next(new ApiError(401, 'Invalid authentication token.'))
    }
    req.user = user
    next()
});


