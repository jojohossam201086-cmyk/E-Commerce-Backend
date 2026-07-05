const Category = require("../models/categoryModel");
const asyncHandler = require("../utils/asyncHandler");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json(category);
});

// Get All Categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});

// Get Category By ID
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json(category);
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json(category);
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json({
    message: "Category deleted successfully",
  });
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};