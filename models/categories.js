const mongoose = require("mongoose");
const joi = require('joi');

const category_schema = new mongoose.Schema({
  name: joi.string().required().min(3).max(30),
});

const category_model = mongoose.model("categories", category_schema);

module.exports = category_model;
