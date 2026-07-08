const Cart = require("../models/cartModel");
const asyncHandler = require("../utils/asyncHandler");

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

  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    data: cart,
  });
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.user,
  }).populate("items.product", "name price");

  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "Cart not found",
      data: null,
    });
  }

  res.status(200).json({
    status: "success",
    message: "Cart fetched successfully",
    data: cart,
  });
});

const removeItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.user,
  });

  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "Cart not found",
      data: null,
    });
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Item removed successfully",
    data: cart,
  });
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.user,
  });

  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "Cart not found",
      data: null,
    });
  }

  cart.items = [];

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Cart cleared successfully",
    data: null,
  });
});

module.exports = {
  addToCart,
  getCart,
  removeItem,
  clearCart,
};