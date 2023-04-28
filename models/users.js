const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const user_name_schema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique'],
    },
});

const slug_schema = new Schema({
    slug: {
        type: String,
        lowercase: true,
    },
});

const email_schema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
});

const password_schema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: [true, 'Password must be unique'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
});

const phone_schema = new Schema({
    phone_number: String,
});

const date_of_birth_schema = new Schema({
    date_of_birth: {
        type: Date,
        match: /^\d{4}-\d{2}-\d{2}$/,
    },
});

const gender_schema = new Schema({
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
});

const profile_image_schema = new Schema({
    image: String,
});

const role_schema = new Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

const user_schema = new Schema({});
user_schema.add(user_name_schema);
user_schema.add(slug_schema);
user_schema.add(email_schema);
user_schema.add(password_schema);
user_schema.add(phone_schema);
user_schema.add(date_of_birth_schema);
user_schema.add(gender_schema);
user_schema.add(profile_image_schema);
user_schema.add(role_schema);
user_schema.set('timestamps', true);

user_schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    console.log('amr');
    next();
});

const user_model = model('users', user_schema);

module.exports = user_model;
