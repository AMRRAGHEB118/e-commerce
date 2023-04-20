const { check } = require("express-validator");
const validator_middleware = require("../../middlewares/validator_middleware");

exports.get_category_validator = [
  check("id").isMongoId().withMessage("Id category is Invalid"),
  validator_middleware,
];
