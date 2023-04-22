const express = require('express');
const router = express.Router();
const {
    get_tags,
    create_tag,
    get_tag,
    update_tag,
    delete_tag,
} = require('../controllers/tags_controllers');
const {get_tag_validator, create_tag_validator, update_tag_validator , delete_tag_validator} = require('../utils/validators/tag_validator');
router.route('/').get(get_tags).post(create_tag_validator, create_tag);
router
    .route('/:id')
    .get(get_tag_validator, get_tag)
    .put(update_tag_validator, update_tag)
    .delete(delete_tag_validator, delete_tag);

module.exports = router;
