const express = require('express')
const router = express.Router()

const { get_cart, add_product_to_cart, remove_product_from_cart } = require('../controllers/cart_controllers')

router.route('/').get(get_cart) 

router.route('/:product_id').post(add_product_to_cart).delete(remove_product_from_cart)

module.exports = router