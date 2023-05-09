const express = require('express')
const router = express.Router()

const {
    get_orders,
    create_order,
    get_order,
    delete_order,
    update_order,
} = require('../controllers/order_controllers')

router.route('/').get(get_orders).post(create_order)

router.route('/:id').get(get_order).delete(delete_order).put(update_order)

module.exports = router