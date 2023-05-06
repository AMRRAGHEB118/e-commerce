const { check } = require('express-validator')
const validator_middleware = require('../../middlewares/validator_middleware')
const category_model = require('../../models/categories')
const tag_model = require('../../models/tags')
const tag_type_model = require('../../models/tag_types')
const { Types } = require('mongoose')

const title_validator = check('title')
    .notEmpty()
    .withMessage('Product title required')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')

const description_validator = check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Description must be less than 2000 characters')

const quantity_validator = check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .isInt({ min: 0 })
    .withMessage('Quantity cannot be negative')

const sold_validator = check('sold')
    .optional()
    .isNumeric()
    .withMessage('Sold must be a number')
    .isInt({ min: 0 })
    .withMessage('Sold cannot be negative')

const price_validator = check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price cannot be negative')

const cover_image_validator = check('cover_image')
    .notEmpty()
    .withMessage('Product image Cover is required')
    .isString()
    .withMessage('Cover image must be a string')

const images_validator = check('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array')

const category_validator = check('category')
    .notEmpty()
    .withMessage('Product must be belong to a category')
    .isMongoId()
    .withMessage('Invalid category ID')
    .custom(async (category_id) => {
        const category = await category_model.findById(category_id)
        if (!category) {
            return Promise.reject(
                new Error(`No category for this Id : ${category}`)
            )
        }
        return Promise.resolve()
    })

const type_validator = check('tags.*.type')
    .isMongoId()
    .withMessage('Invalid tag type ID')
    .custom(async (type_id, { req }) => {
        const type = await tag_type_model.findById(type_id)
        if (!type) {
            return Promise.reject(`No category for this Id: ${type_id}`)
        }
        req.tag_type = type
        return Promise.resolve()
    })

const tag_validator = check('tags.*.tags')
    .optional()
    .isArray()
    .withMessage('Tag values must be an array')
    .custom((tags, { req }) => {
        const tag_ids = tags.filter((value) => Types.ObjectId.isValid(value))
        if (tag_ids.length !== tags.length) {
            return Promise.reject('Invalid tag ID')
        }
        return Promise.resolve()
    })
    .custom(async (tags, { req }) => {
        const tag_promises = tags.map(async (tag_id) => {
            const tag = await tag_model.findById(tag_id)
            if (!tag) {
                return Promise.reject(new Error(`No tag for this Id : ${tag}`))
            }
            if (tag.type.toString() !== req.tag_type._id.toString()) {
                return Promise.reject(
                    new Error(`Tag type must be equal to '${req.tag_type._id}'`)
                )
            }
            return await Promise.resolve()
        })
        await Promise.all(tag_promises)
        return Promise.resolve()
    })

exports.create_product_validator = [
    title_validator,
    description_validator,
    quantity_validator,
    sold_validator,
    price_validator,
    cover_image_validator,
    images_validator,
    category_validator,
    type_validator,
    tag_validator,
    validator_middleware,
]

exports.get_product_validator = [
    check('id').isMongoId().withMessage('Invalid Product ID'),
    validator_middleware,
]

exports.update_product_validator = [
    check('id').isMongoId().withMessage('Invalid Product ID'),
    validator_middleware,
]

exports.delete_product_validator = [
    check('id').isMongoId().withMessage('Invalid Product ID'),
    validator_middleware,
]
