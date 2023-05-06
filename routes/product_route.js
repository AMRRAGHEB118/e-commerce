const express = require('express')
const router = express.Router({ mergeParams: true })

const {
    create_product_validator,
    get_product_validator,
    update_product_validator,
    delete_product_validator,
} = require('../utils/validators/product_validator')

const {
    get_products,
    get_product,
    create_product,
    update_product,
    delete_product,
    create_filter_object,
} = require('../controllers/product_controllers')

router
    .route('/')
    .get(create_filter_object, get_products)
    .post(create_product_validator, create_product)
router
    .route('/:id')
    .get(get_product_validator, get_product)
    .put(update_product_validator, update_product)
    .delete(delete_product_validator, delete_product)

module.exports = router
