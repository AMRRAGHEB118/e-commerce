const express = require("express");

const router = express.Router();

const {
  get_categories,
  get_category,
  create_category,
} = require("../controllers/category_controllers");

router.route("/").get(get_categories).post(create_category);
router.route("/:id").get(get_category);
module.exports = router;
