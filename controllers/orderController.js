const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("../utils/asyncHandler");

const checkout = asyncHandler(async (req, res) => {
  const { user } = req.body;

  const cart = await Cart.findOne({ user }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Cart is empty",
      data: null,
    });
  }

  let totalPrice = 0;

  cart.items.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
  });

  const order = await Order.create({
    user,
    items: cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    totalPrice,
    status: "pending",
  });

  cart.items = [];
  await cart.save();

  res.status(201).json({
    status: "success",
    message: "Order placed successfully",
    data: order,
  });
});

module.exports = {
  checkout,
};