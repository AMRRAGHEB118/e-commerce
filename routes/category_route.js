const express = require("express");

const router = express.Router();

const { get_category } = require("../controllers/category");

router.get("./", get_category);

module.exports = router
