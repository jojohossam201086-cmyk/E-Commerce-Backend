require("dotenv").config();

const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
// app.use(mongoSanitize());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;