const express = require('express')
const router = express.Router()

const { get_cart, add_product_to_cart, remove_product_from_cart } = require('../controllers/cart_controllers')

const { auth } = require('../controllers/auth_controllers')

router.route('/').get(auth, get_cart) 

router.route('/:product_id').post(auth, add_product_to_cart).delete(auth, remove_product_from_cart)

module.exports = router