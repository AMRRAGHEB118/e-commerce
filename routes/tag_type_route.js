const express = require('express');
const router = express.Router();
const tag_route = require('./tag_route');

const {
    get_types,
    create_type,
    get_type,
    update_type,
    delete_type,
    set_type_for_create_tag,
} = require('../controllers/tag_types_controllers');

router
    .route('/')
    .get(get_types)
    .post(set_type_for_create_tag, create_tag_validator, create_type);
router
    .route('/:id')
    .get(get_type)
    .put(update_type)
    .delete(delete_type);

router.use('/:typeId/tags', tag_route);


module.exports = router;


