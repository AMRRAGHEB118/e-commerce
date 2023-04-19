const express = require("express");
const { param, validationResult } = require("express-validator");
const router = express.Router();
const validator_middleware = require('../middlewares/error_middleware')
const {
  get_categories,
  get_category,
  create_category,
  update_category,
  delete_category,
} = require("../controllers/category_controllers");

router.route("/").get(get_categories).post(create_category);
router
  .route("/:id")
  .get(
    param("id").isMongoId().withMessage("Id category is Invalid"),
    // validator_middleware(err, req, res, next),
    get_category
  )
  .put(update_category)
  .delete(delete_category);
module.exports = router;
