const category_model = require("../models/categories");

exports.get_category = (req, res) => {
  const name = req.body.name;
  const new_category = new category_model({ name });
  new_category
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};
