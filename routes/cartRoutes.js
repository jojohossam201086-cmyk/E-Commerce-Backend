const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

router.post("/", addToCart);

router.get("/:user", getCart);

router.delete("/:user/:productId", removeItem);

router.delete("/:user", clearCart);

module.exports = router;