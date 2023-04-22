const express = require('express');
const router = express.Router();
const { get_tags, create_tag } = require('../controllers/tags_controllers');
const { create_tag_validator } = require('../utils/validators/tag_validator');
router.route('/').post(create_tag_validator, create_tag).get(get_tags);

module.exports = router;
