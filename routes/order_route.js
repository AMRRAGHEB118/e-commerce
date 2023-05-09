const express = require('express')
const router = express.Router()

const { get_orders, create_order } = require('../controllers/order_controllers')

router.route('/').get(get_orders).post(create_order)