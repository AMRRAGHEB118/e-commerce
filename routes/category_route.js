const express = require("express");

const router = express.Router();

const { get_category, create_category } = require("../controllers/category_controllers");

router.route('/').get(get_category).post(create_category);
module.exports = router
