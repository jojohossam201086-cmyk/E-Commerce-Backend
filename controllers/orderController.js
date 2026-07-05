const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("../utils/asyncHandler");

// Checkout
const checkout = asyncHandler(async (req, res) => {
  const { user } = req.body;

  // Get user's cart
  const cart = await Cart.findOne({ user }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      message: "Cart is empty",
    });
  }

  // Calculate total price
  let totalPrice = 0;

  cart.items.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
  });

  // Create order
  const order = await Order.create({
    user,
    items: cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    totalPrice,
    status: "pending",
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  res.status(201).json({
    message: "Order placed successfully",
    order,
  });
});

module.exports = {
  checkout,
};