const category_model = require("../models/categories");

const slugify = require("slugify");

const asyncHandler = require("express-async-handler");

exports.get_category = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1
  const limit = req.query.limit * 1 || 3
  const skip = (page - 1) * limit 
  const categories = await category_model.find({}).skip(skip).limit(limit);
  res.status(201).json({results: categories.length, page, data: categories})
  res.send(categories);
});

exports.create_category = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await category_model.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
