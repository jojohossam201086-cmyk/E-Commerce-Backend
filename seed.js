require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./db/connection");

const Category = require("./models/categoryModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");

const seedData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    const categories = await Category.insertMany([
      {
        name: "Electronics",
        description: "Electronic devices",
        slug: "electronics",
      },
      {
        name: "Gaming",
        description: "Gaming products",
        slug: "gaming",
      },
      {
        name: "Accessories",
        description: "Computer accessories",
        slug: "accessories",
      },
    ]);

    const products = [
      {
        name: "Lenovo Legion 5",
        description: "Gaming Laptop",
        price: 45000,
        stock: 10,
        category: categories[1]._id,
        images: [],
        inStock: true,
      },
      {
        name: "ASUS ROG Strix",
        description: "High Performance Gaming Laptop",
        price: 52000,
        stock: 8,
        category: categories[1]._id,
        images: [],
        inStock: true,
      },
      {
        name: "Dell XPS 13",
        description: "Ultrabook Laptop",
        price: 55000,
        stock: 6,
        category: categories[0]._id,
        images: [],
        inStock: true,
      },
      {
        name: "HP Victus",
        description: "Gaming Laptop",
        price: 39000,
        stock: 12,
        category: categories[0]._id,
        images: [],
        inStock: true,
      },
      {
        name: "Logitech G502 Mouse",
        description: "Gaming Mouse",
        price: 2500,
        stock: 25,
        category: categories[2]._id,
        images: [],
        inStock: true,
      },
      {
        name: "Redragon K552 Keyboard",
        description: "Mechanical Keyboard",
        price: 1800,
        stock: 20,
        category: categories[2]._id,
        images: [],
        inStock: true,
      },
    ];

    await Product.insertMany(products);

    console.log("Database seeded successfully!");
    console.log(`Categories Added: ${categories.length}`);
    console.log(`Products Added: ${products.length}`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected");
  }
};

seedData();