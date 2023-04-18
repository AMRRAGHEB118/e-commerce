const category_model = require("../models/categories");

const slugify = require("slugify");
const { Types } = require("mongoose");
const asyncHandler = require("express-async-handler");
const { ObjectId } = Types;

exports.get_categories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 3;
  const skip = (page - 1) * limit;
  const categories = await category_model.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
  res.send(categories);
});

exports.get_category = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid category ID" });
  }
  const category = await category_model.findById(id);
  if (!category) {
    res.status(404).json({ msg: "This category is Not Found" });
  } else {
    res.status(200).json({ data: category });
  }
});

exports.create_category = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await category_model.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

exports.update_category = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid category ID" });
  }
  const name = req.body.name;
  const category = await category_model.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    res.status(404).json({ msg: "This category is Not Found" });
  } else {
    res.status(200).json({ data: category });
  }
});

// TODO ADD Delete function
