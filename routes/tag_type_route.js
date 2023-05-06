const express = require('express')
const router = express.Router()
const tag_route = require('./tag_route')

const {
    get_types,
    create_type,
    get_type,
    update_type,
    delete_type,
} = require('../controllers/tag_types_controllers')

const {
    create_type_validator,
    get_type_validator,
    update_type_validator,
    delete_type_validator,
} = require('../utils/validators/tag_type_validator')

router.route('/').get(get_types).post(create_type_validator, create_type)
router
    .route('/:id')
    .get(get_type_validator, get_type)
    .put(update_type_validator, update_type)
    .delete(delete_type_validator, delete_type)

router.use('/:type_id/tags', tag_route)

module.exports = router

// create_tag_validator,
