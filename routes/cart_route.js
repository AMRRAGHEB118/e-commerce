const express = require('express')
const router = express.Router()

const { get_cart } = require('../controllers/cart_controllers')

router.route('./').get(get_cart)

module.exports = router