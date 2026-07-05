const Product = require("../models/productModel");
const asyncHandler = require("../utils/asyncHandler");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json(product);
});

// Get All Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find(req.query);

  res.status(200).json(products);
});

// Get Product By ID
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name");

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json(product);
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    message: "Product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};