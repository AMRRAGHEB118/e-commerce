const category_model = require("../models/categories");
const apiError = require("../utils/api_errors");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

exports.get_categories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 3;
  const skip = (page - 1) * limit;
  const categories = await category_model.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
  res.send(categories);
});

exports.get_category = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await category_model.findById(id);
  if (!category) {
    return next(new apiError(404, "This category is Not Found"));
  } else {
    res.status(200).json({ data: category });
  }
});

exports.create_category = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await category_model.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

exports.update_category = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const category = await category_model.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new apiError(404, "This category is Not Found"));
  } else {
    res.status(200).json({ data: category });
  }
});

exports.delete_category = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await category_model.findByIdAndDelete(id);
  if (!category) {
    return next(new apiError(404, "This category is Not Found"));
  } else {
    res.status(204).send();
  }
});
