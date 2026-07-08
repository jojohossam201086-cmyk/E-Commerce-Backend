const Category = require("../models/categoryModel");
const asyncHandler = require("../utils/asyncHandler");

const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: category,
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    data: categories,
  });
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      status: "fail",
      message: "Category not found",
      data: null,
    });
  }

  res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    data: category,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  if (!category) {
    return res.status(404).json({
      status: "fail",
      message: "Category not found",
      data: null,
    });
  }

  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(404).json({
      status: "fail",
      message: "Category not found",
      data: null,
    });
  }

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
    data: null,
  });
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};