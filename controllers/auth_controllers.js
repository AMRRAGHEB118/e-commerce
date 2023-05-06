const ApiError = require('../utils/api_errors')
const asyncHandler = require('express-async-handler')
const user_model = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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

    res.status(201).json({
        success: true,
        data: {
            user,
            token,
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

    res.status(201).json({
        success: true,
        data: {
            user,
            token,
        },
        message: 'User successfully created.',
    })
})

exports.auth = asyncHandler(async (req, res, next) => {
    let token
    const auth_header = req.headers.authorization
    if (auth_header && auth_header.startsWith('Bearer')) {
        token = auth_header.split(' ')[1]
    }
    if (!token) {
        return next(new ApiError(401, 'Missing authentication token.'))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await user_model.findById(decoded.user_id)
        if (!user) {
            return next(new ApiError(401, 'Invalid authentication token.'))
        }
        req.user = user
        next()
    } catch (err) {
        return next(new ApiError(401, 'Invalid authentication token.'))
    }
})
