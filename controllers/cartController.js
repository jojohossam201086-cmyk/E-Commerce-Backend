const Cart = require("../models/cartModel");
const asyncHandler = require("../utils/asyncHandler");

// Add Product To Cart
const addToCart = asyncHandler(async (req, res) => {
  const { user, product, quantity } = req.body;

  let cart = await Cart.findOne({ user });

  if (!cart) {
    cart = await Cart.create({
      user,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === product
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product,
      quantity,
    });
  }

  await cart.save();

  res.status(200).json(cart);
});

// Get Cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.user,
  }).populate("items.product", "name price");

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  res.status(200).json(cart);
});

// Remove Item From Cart
const removeItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.user,
  });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  await cart.save();

  res.status(200).json(cart);
});

// Clear Cart
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.user,
  });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  cart.items = [];

  await cart.save();

  res.status(200).json({
    message: "Cart cleared successfully",
  });
});

module.exports = {
  addToCart,
  getCart,
  removeItem,
  clearCart,
};