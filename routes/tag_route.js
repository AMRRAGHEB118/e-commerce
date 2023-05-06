const express = require('express')
const router = express.Router({ mergeParams: true })
const {
    get_tags,
    create_tag,
    get_tag,
    update_tag,
    delete_tag,
    create_filter_object,
    set_type_for_create_tag,
} = require('../controllers/tags_controllers')
const {
    get_tag_validator,
    create_tag_validator,
    update_tag_validator,
    delete_tag_validator,
} = require('../utils/validators/tag_validator')
router
    .route('/')
    .get(create_filter_object, get_tags)
    .post(set_type_for_create_tag, create_tag_validator, create_tag)
router
    .route('/:id')
    .get(get_tag_validator, get_tag)
    .put(update_tag_validator, update_tag)
    .delete(delete_tag_validator, delete_tag)

module.exports = router
